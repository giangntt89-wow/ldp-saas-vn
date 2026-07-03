# Implementation Plan: Form Submission → SQL Server → Notification

**Dự án:** Landing Page – Thu thập thông tin khách hàng  
**Người soạn:** Giang  
**Ngày:** 29/06/2026

---

## Tổng quan luồng hệ thống

```
[Landing Page]
     │
     │ HTTP POST (form data)
     ▼
[API Server – Node.js/ASP.NET]   ← Deploy trên server công ty
     │
     ├──► [SQL Server]            ← Lưu trữ data khách hàng
     │
     └──► [Notification]
              ├── Email (SMTP nội bộ)
              └── Zalo OA (nếu triển khai)
```

---

## Phase 1 – Chuẩn bị hạ tầng (IT thực hiện)

**Mục tiêu:** Có đủ môi trường trước khi viết code

### 1.1 SQL Server
- [ ] Tạo database mới (ví dụ: `ldp_crm` hoặc theo quy chuẩn đặt tên công ty)
- [ ] Tạo table `leads` với schema:

```sql
CREATE TABLE leads (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    full_name     NVARCHAR(255)    NOT NULL,
    phone         VARCHAR(20)      NOT NULL,
    email         VARCHAR(255)     NULL,
    company       NVARCHAR(255)    NULL,
    message       NVARCHAR(MAX)    NULL,
    source        VARCHAR(100)     NULL,   -- tên landing page / campaign
    submitted_at  DATETIME         DEFAULT GETDATE(),
    status        VARCHAR(50)      DEFAULT 'new'  -- new / contacted / closed
);
```

> ⚠️ Schema trên là đề xuất — cần confirm với team để thêm/bớt field cho phù hợp.

- [ ] Tạo SQL account riêng cho API (chỉ cấp quyền INSERT + SELECT vào table `leads`, không cấp quyền DROP/ALTER)
- [ ] Cung cấp connection string theo format:
  ```
  Server=<IP_hoặc_hostname>;Database=ldp_crm;User Id=<user>;Password=<pass>;
  ```

### 1.2 Server để deploy API
- [ ] Xác định server deploy API (cùng server SQL Server, hoặc server riêng)
- [ ] Cài Node.js (v18+) hoặc .NET Runtime tùy stack chọn
- [ ] Mở port cho API (thường port 3000 hoặc 8080) – chỉ nhận traffic từ domain landing page
- [ ] Cung cấp IP/domain của server để cấu hình API endpoint

### 1.3 Email Notification
- [ ] Cung cấp SMTP config nội bộ:
  ```
  Host: <smtp.congty.com>
  Port: 587 (hoặc 465)
  User: <email gửi đi>
  Password: <password>
  ```
- [ ] Xác nhận email nhận notification (người phụ trách)

---

## Phase 2 – Phát triển API (Dev/Vibe code thực hiện)

**Điều kiện:** Hoàn thành Phase 1 trước

### 2.1 Viết API endpoint
- Nhận POST request từ form landing page
- Validate dữ liệu đầu vào (phone không rỗng, email đúng format...)
- Insert vào SQL Server
- Trả về response thành công/thất bại cho landing page

### 2.2 Viết Notification module
- **Email:** Sau khi insert thành công → gửi email tóm tắt thông tin lead đến người phụ trách
- **Zalo OA (optional):** Tích hợp Zalo OA API để gửi tin nhắn tự động (xem Phase 4)

### 2.3 Kết nối Landing Page → API
- Form submit → gọi API endpoint
- Hiển thị thông báo thành công cho khách hàng sau khi submit

---

## Phase 3 – Test & Deploy

- [ ] Test API trên môi trường staging (dữ liệu giả)
- [ ] Test insert vào SQL Server thành công
- [ ] Test email notification gửi đến đúng người
- [ ] Deploy lên production
- [ ] Test end-to-end: điền form → data vào SQL → email đến

---

## Phase 4 – Zalo Notification (Optional, triển khai sau)

> Zalo **không có API cho tài khoản cá nhân**. Để tự động hóa, cần dùng **Zalo Official Account (OA)**.

### Yêu cầu:
- [ ] Đăng ký Zalo OA cho công ty tại: https://oa.zalo.me
- [ ] Lấy Access Token từ Zalo Developer Portal
- [ ] Số điện thoại phụ trách **follow** Zalo OA của công ty để nhận tin nhắn

### Khi có OA:
- Mỗi lần có lead mới → API gửi tin nhắn tự động vào Zalo OA
- Người phụ trách mở app Zalo → thấy notification từ OA

### Workaround nếu chưa có OA:
- Email notification là đủ cho giai đoạn đầu
- Người phụ trách bật notification email trên điện thoại để không bỏ sót

---

## Thông tin cần IT cung cấp (Checklist tổng hợp)

| # | Thông tin | Người cung cấp | Trạng thái |
|---|-----------|----------------|-----------|
| 1 | Connection string SQL Server | IT | ⬜ Chờ |
| 2 | Tên database + confirm schema table | IT + Giang | ⬜ Chờ |
| 3 | SQL account (user/pass) chỉ quyền INSERT/SELECT | IT | ⬜ Chờ |
| 4 | Server deploy API (IP, OS, port) | IT | ⬜ Chờ |
| 5 | SMTP config email nội bộ | IT | ⬜ Chờ |
| 6 | Email người nhận notification | Giang xác nhận | ⬜ Chờ |

---

## Timeline đề xuất

| Phase | Nội dung | Thời gian ước tính |
|-------|----------|-------------------|
| Phase 1 | IT setup SQL Server + Server + SMTP | 2–3 ngày làm việc |
| Phase 2 | Dev viết API + Notification | 2–3 ngày |
| Phase 3 | Test + Deploy | 1–2 ngày |
| Phase 4 | Zalo OA (nếu triển khai) | 1 tuần (bao gồm đăng ký OA) |

**Tổng Phase 1–3:** ~1 tuần nếu IT và Dev phối hợp song song

---

*Tài liệu này dùng để trao đổi nội bộ giữa team Marketing, Dev và IT.*
