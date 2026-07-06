# Lead Capture — Kiến trúc hiện tại & Roadmap

## Hiện tại (2026-07-06)

2 loại form dùng chung 1 Google Apps Script Web App (phân biệt qua `formType`), mỗi loại ghi vào 1 tab riêng trong cùng Google Sheet:

```
Client (LogicSection)              → POST /api/roi-lead     (Next.js) → formType: 'roi'
Client (ContactSection/PopupForm)  → POST /api/contact-lead (Next.js) → formType: 'contact'
                                        ↓
                              POST tới cùng Google Apps Script Web App
                                        ↓
                    append 1 dòng vào tab tương ứng (Leads / Contacts)
                                        ↓
                    gửi email thông báo (MailApp) tới hộp mail nhận lead
```

- API routes: `app/api/roi-lead/route.ts`, `app/api/contact-lead/route.ts` — dùng chung logic forward qua `src/lib/leadWebhook.ts`.
- Apps Script tham khảo: `docs/integrations/google-apps-script-roi-lead.gs` (tên file giữ nguyên vì lịch sử, nhưng nay xử lý cả 2 loại lead).
- Env vars: `GAS_ROI_LEAD_WEBHOOK_URL`, `GAS_ROI_LEAD_SECRET` (dùng chung cho cả 2 loại lead — tên biến giữ nguyên để tránh phải cấu hình lại; xem `.env.example`).
- Sheet cần có 2 tab: `Leads` (ROI) và `Contacts` (đăng ký tư vấn).
- Apps Script gửi email tới địa chỉ bất kỳ, kể cả `@hqsoft.com.vn` — không phụ thuộc domain nhận dùng Google hay Microsoft 365.

## Việc cần làm sau (chưa làm)

HQSOFT thực tế lưu dữ liệu vận hành trong **Excel trên SharePoint** (Microsoft 365). Apps Script không có kết nối gốc tới SharePoint — muốn ghi trực tiếp vào Excel SharePoint cần gọi **Microsoft Graph API**, đòi hỏi:

- Đăng ký app trên **Azure AD** (tenant Microsoft 365 của HQSOFT) → lấy client ID/secret.
- Cấp quyền `Files.ReadWrite` hoặc `Sites.ReadWrite.All`.
- Quản lý OAuth token refresh (Apps Script gọi qua `UrlFetchApp`, hoặc chuyển hẳn sang **Power Automate** — tự nhiên hơn vì cùng hệ sinh thái Microsoft).

→ **Khi có quyền admin Azure AD/Power Automate**, cân nhắc 1 trong 2 hướng:
1. Thay thế toàn bộ luồng Google bằng Power Automate (nhận webhook → ghi Excel SharePoint → gửi mail Outlook).
2. Giữ Google Sheet làm chính, thêm bước mirror sang SharePoint Excel qua Graph API trong Apps Script.

Quyết định này đang **hoãn lại** — chưa có quyền/tài khoản Microsoft 365 admin để triển khai.
