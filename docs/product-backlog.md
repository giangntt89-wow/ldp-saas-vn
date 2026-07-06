# 📋 PB.md - PRODUCT BACKLOG & PROJECT BRIEF (LANDING PAGE HQSOFT)

Tài liệu này đóng vai trò là Product Backlog và tài liệu mô tả tính năng chi tiết theo từng Section (Epic) của Landing Page HQSOFT. Giúp người tiếp theo hiểu rõ những phần đã hoàn thành và những phần cần làm tiếp theo.

---

## 🎯 Tổng Quan Dự Án
Xây dựng Landing Page B2B Enterprise cao cấp cho HQSOFT nhằm giới thiệu hệ sinh thái giải pháp quản trị phân phối & bán lẻ (DMS, SFA, nRetail, v.v.). Landing page tập trung vào trải nghiệm thị giác ấn tượng (Visual-heavy), hiệu ứng mượt mà và tương tác động để tăng tỷ lệ chuyển đổi.

---

## 🛠️ Tech Stack Chi Tiết Theo Từng Phần

| Thành phần / Section | Công nghệ chủ đạo | Thư viện & Tài nguyên |
|---|---|---|
| **Toàn bộ trang (Layout & Scroll)** | React (Next.js App Router), Lenis | `lenis`, `@tailwindcss/postcss` |
| **Intro Cover (Trang mở đầu)** | HTML5 Canvas, Framer Motion | Canvas API, `framer-motion` |
| **Hero Section (Before/After Slider)** | CSS Clip-path, Framer Motion | Mouse Drag, `lucide-react` |
| **Logic Section (Form Wizard)** | Multi-step State, Framer Motion | Dynamic validation |
| **Trust Section (Marquee)** | CSS Infinite Scroll Animation | `next/image` |
| **Ecosystem Section (Orbit Diagram)** | SVG, Inline SMIL Animations | SVG Paths, `animateMotion` |
| **Mockup Section (Parallax)** | DOM scroll event listener | Viewport calculation |
| **AI Section (Simulated Agent)** | Custom Hook Typing Effect | IntersectionObserver |
| **Testimonials (Carousel)** | AnimatePresence, Auto-timer | Framer Motion Slide |

---

## 📌 Danh Sách Epics & Chi Tiết Trạng Thái

### 🎬 EPIC 1: Trang Cover & Hiệu ứng Khởi đầu (IntroReveal)
- **Mô tả:** Màn hình chào chiếm toàn màn hình, khóa scroll chuột. Background tối với hiệu ứng glow sâu và sóng hạt chuyển động tự do.
- **Trạng thái:** ✅ **Đã hoàn thành**
- **Chi tiết kỹ thuật:**
  - File: `src/components/IntroReveal.tsx` & `src/components/InteractiveParticles.tsx`
  - Đã loại bỏ grid pattern cũ để tăng độ sâu trường ảnh.
  - Tích hợp 4 lớp hạt (Far, Mid, Near, Accent) chuyển động dạng sóng sin kép (`Math.sin`), phản xạ đẩy hạt khi rê chuột và tạo gợn sóng (ripples) khi click.

---

### 🚀 EPIC 2: Section Hero & Before/After Slider
- **Mô tả:** Section đầu tiên của Landing page sau khi mở khóa. Hiển thị thông điệp chính và thanh trượt so sánh trực quan vấn đề vận hành cũ (Before) và giải pháp HQSOFT (After).
- **Trạng thái:** ✅ **Đã hoàn thành UI & Tương tác kéo**
- **Ghi chú:** CTA "Xem Thêm" trỏ `/details` chỉ còn tồn tại ở bản backup (`src/components/sections/backup/HeroSection_backup.tsx`), không được dùng trong bản live. Trang `/details` không cần thiết nữa — đã bỏ khỏi backlog (2026-07-06).

---

### 📊 EPIC 3: Section Logic & Dự Toán ROI (LogicSection)
- **Mô tả:** Thống kê 3 nhóm đối tượng (C-Level, BackOffice, IT) kèm tab chuyển mockup. Bên dưới là Form Dự toán 3 bước động giúp khách hàng tự đánh giá vấn đề doanh nghiệp đang gặp phải.
- **Trạng thái:** ✅ **Đã hoàn thành luồng Form Wizard + kết nối lưu trữ/thông báo**
- **Chi tiết kỹ thuật:** Submit form gọi `app/api/roi-lead/route.ts`, forward sang Google Apps Script Web App để ghi vào Google Sheet và gửi email thông báo. Xem `docs/integrations/lead-capture-roadmap.md`.
- **Backlog/Cần làm thêm:**
  - [ ] Mirror/di chuyển dữ liệu sang Excel trên SharePoint khi có quyền admin Microsoft 365 (xem roadmap trong `docs/integrations/lead-capture-roadmap.md`).

---

### 🤝 EPIC 4: Section Trust & Social Proof (TrustSection)
- **Mô tả:** Hiển thị các chỉ số ấn tượng của HQSOFT và dải logo đối tác chạy ngang vô tận (marquee).
- **Trạng thái:** ✅ **Đã hoàn thành**
- **Chi tiết kỹ thuật:** Sử dụng marquee vô tận chạy bằng CSS keyframes hiệu năng cao trên GPU.

---

### 🌐 EPIC 5: Hệ Sinh Thái Lan Tỏa (EcosystemSection)
- **Mô tả:** Diagram trực quan hóa hệ sinh thái HQSOFT 360 với Hub trung tâm kết nối 9 module. Khi hover vào từng module hoặc Hub, các đường liên kết (SVG) sẽ phát sáng và chạy điểm sáng pulse.
- **Trạng thái:** ✅ **Đã hoàn thành**

---

### 💻 EPIC 6: Trải Nghiệm Đa Nền Tảng (MockupSection)
- **Mô tả:** Giới thiệu giao diện phần mềm trên các thiết bị (Web, Mobile, Tablet) kèm hiệu ứng Parallax trượt nhẹ theo tốc độ scroll khác nhau.
- **Trạng thái:** ✅ **Đã hoàn thành**

---

### 🧠 EPIC 7: Công Nghệ Tương Lai (AISection)
- **Mô tả:** Trình diễn tính năng AI dự báo tồn kho, gợi ý đơn hàng. Bên phải giả lập giao diện chat AI đang gõ phản hồi tự động theo kịch bản.
- **Trạng thái:** ✅ **Đã hoàn thành**
- **Chi tiết kỹ thuật:** Tự động xoay vòng (auto-cycle) kịch bản mỗi 8 giây khi scroll đến vùng hiển thị.

---

### 💬 EPIC 8: Đánh Giá Khách Hàng (TestimonialsSection)
- **Mô tả:** Đánh giá từ khách hàng dạng Carousel tự động lướt.
- **Trạng thái:** ✅ **Đã hoàn thành**

---

### 📞 EPIC 9: Đăng Ký Tư Vấn & Popup (ContactSection / PopupForm)
- **Mô tả:** Form điền thông tin liên hệ được tối ưu hóa giao diện và popup bật lên khi click các nút CTA trên Header/Hero.
- **Trạng thái:** ✅ **Đã hoàn thành validation phía client + kết nối lưu trữ/thông báo**
- **Chi tiết kỹ thuật:** Cả 2 form gọi chung `app/api/contact-lead/route.ts`, forward sang cùng Google Apps Script Web App dùng cho ROI lead (phân biệt qua `formType: 'contact'`), ghi vào tab `Contacts` riêng + gửi email thông báo. Xem `docs/integrations/lead-capture-roadmap.md`.
- **Backlog/Cần làm thêm:**
  - [ ] Mirror/di chuyển dữ liệu sang Excel trên SharePoint khi có quyền admin Microsoft 365 (xem roadmap trong `docs/integrations/lead-capture-roadmap.md`).

---

## 🎯 Kế Hoạch Bàn Giao Cho Lập Trình Viên Tiếp Theo

Để dự án sẵn sàng đi vào vận hành thực tế, lập trình viên tiếp theo cần thực hiện các công việc sau:

1. **Tích hợp API gửi dữ liệu Form:**
   - Cần viết API endpoint hoặc tích hợp các dịch vụ bên thứ ba (như HubSpot, Salesforce, hoặc Google Sheet API) vào `ContactSection.tsx`, `PopupForm.tsx` và `LogicSection.tsx` (Form dự toán).
2. **Thay thế hình ảnh mockup thực tế:**
   - Các hình ảnh trong `/public/mockups/` và logo đối tác trong `/public/logos/` có thể được cập nhật lại chuẩn chỉ theo guideline mới nhất của HQSOFT.
