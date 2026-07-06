/**
 * Google Apps Script — webhook dùng chung cho 2 loại lead của Landing Page HQSOFT:
 *   - 'roi'     : form "Dự Toán Tối Ưu Vận Hành" (LogicSection)
 *   - 'contact' : form "Đăng ký tư vấn" (ContactSection + PopupForm)
 *
 * ĐÂY LÀ SETUP LÀM MỚI HOÀN TOÀN (project + deployment mới), xem hướng dẫn từng bước
 * trong tin nhắn đi kèm file này. Không paste đè vào project cũ để tránh lặp lại lỗi
 * "deploy version mới nhưng webhook URL vẫn chạy code cũ".
 */

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1ivcmfLlWnRF29r9AKOS1M-SbuUf3s1zXyf5EK0u37BA/edit';
const SHEET_MAP = { roi: 'Leads', contact: 'Contacts' };
// Phần tử đầu tiên = To; các phần tử còn lại = BCC.
const NOTIFY_EMAILS = ['marketinghqsoft@gmail.com', 'info@hqsoft.com.vn'];
// File ID logo HQSOFT trên Google Drive (lấy từ URL chia sẻ dạng .../file/d/<ID>/view).
const LOGO_FILE_ID = '1Uv4sCOxLM-uhjDkU5PsFe4ukKQvlWsN3';

/**
 * CHẠY HÀM NÀY TRƯỚC KHI DEPLOY (chọn "testConnection" ở dropdown cạnh nút Chạy > bấm Chạy).
 * Mục đích: xin quyền truy cập Sheets/Drive/Gmail ngay trong lúc chạy thủ công (hộp thoại "Ủy quyền"
 * sẽ hiện ra ở đây — bấm Allow), và xác nhận SHEET_URL/LOGO_FILE_ID đúng trước khi có webhook thật
 * gọi vào. Nếu hàm này chạy xong không báo lỗi trong "Nhật ký thực thi" thì phần còn lại chắc chắn chạy được.
 */
function testConnection() {
  const ss = SpreadsheetApp.openByUrl(SHEET_URL);
  Logger.log('Mở Sheet OK: ' + ss.getName());

  Object.keys(SHEET_MAP).forEach((formType) => {
    const tabName = SHEET_MAP[formType];
    const sheet = ss.getSheetByName(tabName);
    Logger.log(
      sheet
        ? `Tab "${tabName}" (${formType}) OK`
        : `❌ Tab "${tabName}" (${formType}) KHÔNG TỒN TẠI — vào Sheet tạo tab này trước khi deploy.`
    );
  });

  const logoBlob = getLogoBlob();
  Logger.log(logoBlob ? 'Logo Drive OK' : '⚠️ Không lấy được logo (email vẫn gửi được, chỉ thiếu ảnh logo).');

  const secret = PropertiesService.getScriptProperties().getProperty('ROI_LEAD_SECRET');
  Logger.log(secret ? 'ROI_LEAD_SECRET đã có trong Script Properties' : '❌ CHƯA set ROI_LEAD_SECRET trong Script Properties.');

  Logger.log('=> Nếu tất cả các dòng trên đều OK (không có ❌), có thể Deploy an toàn.');
}

function doPost(e) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty('ROI_LEAD_SECRET');
    const data = JSON.parse(e.postData.contents);

    if (!secret || data.secret !== secret) {
      return jsonResponse({ ok: false, error: 'Unauthorized' });
    }

    const formType = data.formType === 'contact' ? 'contact' : 'roi';
    const timestamp = data.submittedAt ? new Date(data.submittedAt) : new Date();

    const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_MAP[formType]);
    if (!sheet) {
      return jsonResponse({ ok: false, error: `Sheet "${SHEET_MAP[formType]}" not found` });
    }

    if (formType === 'contact') {
      handleContactLead(sheet, data, timestamp);
    } else {
      handleRoiLead(sheet, data, timestamp);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

// ════════════════════════════════════════════════════════════════════
//  ROI LEAD — "Dự Toán Tối Ưu Vận Hành"
// ════════════════════════════════════════════════════════════════════

const PROBLEM_LABELS = {
  visit: 'Thất thoát viếng thăm',
  pg: 'Hiệu quả PG/PB',
  stock: 'Khủng hoảng Tồn kho',
  retail: 'Đứt gãy Khách lẻ',
  data: 'Phân mảnh Dữ liệu',
};

function handleRoiLead(sheet, data, timestamp) {
  const contact = data.contact || {};
  const selectedProblems = data.selectedProblems || [];
  const dynValues = data.dynValues || {};
  const problemLabels = selectedProblems.map((id) => PROBLEM_LABELS[id] || id);

  sheet.appendRow([
    timestamp,
    contact.name || '',
    contact.company || '',
    contact.phone || '',
    contact.email || '',
    problemLabels.join(', '),
    JSON.stringify(dynValues),
  ]);

  const fields = [
    { label: 'Họ và Tên', value: contact.name || '-' },
    { label: 'Công ty', value: contact.company || '-' },
    { label: 'Điện thoại', value: contact.phone || '-' },
    { label: 'Email', value: contact.email || '-' },
    { label: 'Vấn đề quan tâm', value: problemLabels.join(', ') || '-' },
  ];
  Object.keys(dynValues).forEach((key) => {
    if (dynValues[key]) fields.push({ label: formatDynValueLabel(key), value: dynValues[key] });
  });

  sendNotificationEmail({
    subject: `[LEAD] Dự Toán ROI — ${contact.company || contact.name || 'Unknown'}`,
    title: 'Lead Mới — Dự Toán ROI',
    badge: 'DỰ TOÁN TỐI ƯU VẬN HÀNH',
    intro: 'Có yêu cầu dự toán mới được gửi từ <strong>Landing Page HQSOFT</strong>.',
    fields,
    timestamp,
    plainTitle: 'HQSOFT — Lead Mới: Dự Toán Tối Ưu Vận Hành',
  });
}

/** Tách "visit-Số lượng NV Sales ước tính:" -> nhãn dễ đọc + giữ nguyên giá trị. */
function formatDynValueLabel(key) {
  const idx = key.indexOf('-');
  return idx === -1 ? key : key.slice(idx + 1).replace(/:$/, '');
}

// ════════════════════════════════════════════════════════════════════
//  CONTACT LEAD — "Đăng ký tư vấn" (ContactSection + PopupForm)
// ════════════════════════════════════════════════════════════════════

const SOURCE_LABELS = {
  contact_section: 'Trang chủ — Form Đăng ký tư vấn',
  popup_form: 'Popup — Đặt Lịch Tư Vấn',
};

function handleContactLead(sheet, data, timestamp) {
  const contact = data.contact || {};
  const sourceLabel = SOURCE_LABELS[contact.source] || contact.source || '-';

  sheet.appendRow([
    timestamp,
    contact.name || '',
    contact.email || '',
    contact.phone || '',
    contact.role || '',
    contact.scale || '',
    contact.request || '',
    sourceLabel,
  ]);

  const fields = [
    { label: 'Họ và Tên', value: contact.name || '-' },
    { label: 'Email', value: contact.email || '-' },
    { label: 'Điện thoại', value: contact.phone || '-' },
  ];
  if (contact.role) fields.push({ label: 'Chức vụ', value: contact.role });
  if (contact.scale) fields.push({ label: 'Quy mô User dự kiến', value: contact.scale });
  if (contact.request) fields.push({ label: 'Nội dung yêu cầu', value: contact.request });
  fields.push({ label: 'Nguồn', value: sourceLabel });

  sendNotificationEmail({
    subject: `[LEAD] Yêu Cầu Tư Vấn — ${contact.name || 'Unknown'}`,
    title: 'Lead Mới — Tư Vấn',
    badge: 'ĐĂNG KÝ TƯ VẤN',
    intro: 'Có yêu cầu tư vấn mới được gửi từ <strong>Landing Page HQSOFT</strong>.',
    fields,
    timestamp,
    plainTitle: 'HQSOFT — Lead Mới: Yêu Cầu Tư Vấn',
  });
}

// ════════════════════════════════════════════════════════════════════
//  EMAIL NOTIFICATION — HTML card branded theo HQSOFT (dùng chung 2 loại lead)
// ════════════════════════════════════════════════════════════════════

/** Lấy logo trực tiếp từ Google Drive để nhúng inline vào email (cid). Trả về null nếu không truy cập được. */
function getLogoBlob() {
  try {
    return DriveApp.getFileById(LOGO_FILE_ID).getBlob().setName('logo');
  } catch (err) {
    return null;
  }
}

function sendNotificationEmail({ subject, title, badge, intro, fields, timestamp, plainTitle }) {
  const logoBlob = getLogoBlob();
  const htmlBody = buildHtmlEmail({ title, badge, intro, fields, timestamp, hasLogo: !!logoBlob });
  const plainBody = buildPlainEmail({ plainTitle, fields, timestamp });

  const mailOptions = {
    to: NOTIFY_EMAILS[0],
    bcc: NOTIFY_EMAILS.slice(1).join(','),
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
  };
  if (logoBlob) {
    mailOptions.inlineImages = { logo: logoBlob };
  }
  MailApp.sendEmail(mailOptions);
}

/**
 * Ép toàn bộ output HTML về thuần ASCII (chuyển ký tự có dấu thành HTML entity dạng &#NNN;).
 * Lý do: MailApp gửi email dạng quoted-printable, xuống dòng cứng mỗi 76 ký tự. Chuỗi tiếng Việt
 * là UTF-8 nhiều byte — nếu điểm xuống dòng rơi ngay giữa 1 chuỗi byte đó, một số client (đặc biệt
 * Gmail Android) decode sai và tự chèn dòng mới lạc chỗ ngay giữa từ. Vị trí lỗi phụ thuộc ký tự có
 * dấu rơi đúng chỗ ranh giới 76-ký-tự hay không — thuần may rủi theo nội dung, không liên quan gì
 * đến layout/CSS (test lại bằng trình duyệt thường không tái hiện được lỗi này).
 * Chuyển hết sang HTML entity (thuần ASCII) thì không còn byte đa-byte nào để bị cắt lỗi nữa.
 */
function encodeNonAsciiEntities(str) {
  return String(str).replace(/[^\x00-\x7F]/g, (ch) => '&#' + ch.charCodeAt(0) + ';');
}

function buildHtmlEmail({ title, badge, intro, fields, timestamp, hasLogo }) {
  const fieldsHtml = fields
    .map(
      (f) =>
        '<tr>' +
        '<td style="padding:8px 12px;color:#64748b;font-size:13px;width:180px;vertical-align:top;">' +
        f.label +
        '</td>' +
        '<td style="padding:8px 12px;color:#1e293b;font-size:14px;font-weight:500;">' +
        escapeHtml(f.value) +
        '</td>' +
        '</tr>'
    )
    .join('');

  const html =
    '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;"><tr><td align="center">' +
    '<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">' +
    // Header — chữ bên trái, logo bên phải (căn giữa theo chiều dọc)
    // Dùng width cố định bằng số (px) cho từng cột thay vì "100%"/để trống —
    // tránh 1 số client mail (Gmail Android) auto-layout sai làm cột chữ bị bóp hẹp.
    '<tr><td style="background:linear-gradient(135deg,#0d1b3e 0%,#2563eb 100%);padding:28px 32px;">' +
    '<table width="536" cellpadding="0" cellspacing="0"><tr>' +
    '<td width="' + (hasLogo ? '366' : '536') + '" valign="middle" align="left">' +
    (hasLogo ? '' : '<p style="margin:0 0 8px;color:#93c5fd;font-size:11px;letter-spacing:2px;text-transform:uppercase;">HQSOFT TECHNOLOGY JSC</p>') +
    '<h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">' + title + '</h1>' +
    '<span style="display:inline-block;margin-top:10px;background:#2563eb;color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;padding:3px 10px;border-radius:20px;">' + badge + '</span>' +
    '</td>' +
    (hasLogo
      ? '<td width="170" valign="middle" align="right" style="padding-left:20px;"><img src="cid:logo" alt="HQSOFT" style="height:72px;width:auto;max-width:150px;display:block;" /></td>'
      : '') +
    '</tr></table>' +
    '</td></tr>' +
    // Body
    '<tr><td style="padding:28px 32px;">' +
    '<p style="margin:0 0 20px;color:#475569;font-size:14px;">' + intro + '</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">' +
    fieldsHtml +
    '</table>' +
    '</td></tr>' +
    // Metadata
    '<tr><td style="padding:0 32px 20px;">' +
    '<p style="margin:0;color:#94a3b8;font-size:12px;">' +
    'Thời gian gửi: <strong>' +
    timestamp.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) +
    ' (GMT+7)</strong>' +
    '</p></td></tr>' +
    // Action hint
    '<tr><td style="padding:0 32px 32px;">' +
    '<p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">' +
    'Vui lòng liên hệ khách hàng sớm nhất có thể. Dữ liệu đã được lưu trong Google Sheet.' +
    '</p></td></tr>' +
    // Footer
    '<tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center;">' +
    '<p style="margin:0;color:#94a3b8;font-size:12px;">HQSOFT TECHNOLOGY JSC &middot; <a href="https://hqsoft.com.vn" style="color:#2563eb;">hqsoft.com.vn</a> &middot; Automated notification. Do not reply.</p>' +
    '</td></tr>' +
    '</table></td></tr></table></body></html>';

  // Ép về ASCII thuần để tránh lỗi decode quoted-printable ở 1 số client mail (xem comment ở
  // encodeNonAsciiEntities phía trên) — đây là fix cho lỗi vỡ dòng tiêu đề/badge chỉ xảy ra
  // trên Gmail Android, không tái hiện được khi test bằng trình duyệt thường.
  return encodeNonAsciiEntities(html);
}

function buildPlainEmail({ plainTitle, fields, timestamp }) {
  const lines = [
    '===================================================',
    plainTitle,
    '===================================================',
    '',
  ];
  fields.forEach((f) => lines.push(f.label + ': ' + f.value));
  lines.push('', 'Thời gian gửi: ' + timestamp.toString(), '', '===================================================');
  return lines.join('\n');
}

function jsonResponse(obj) {
  // Apps Script Web Apps luôn trả HTTP 200 cho ContentService output —
  // không có cách set status code khác, nên phía client phải đọc field `ok`/`error` trong body.
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
