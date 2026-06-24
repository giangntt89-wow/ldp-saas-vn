# **TÀI LIỆU HƯỚNG DẪN TRIỂN KHAI CHO CLAUDE CODE (CLI) & BRIEF ANTIGRAVITY**

## **PHẦN 1: BẢN CHỈ THỊ HỆ THỐNG DÀNH CHO CLAUDE CODE (CLI)**

*(System Instructions for Autonomous AI Agent)*

**Ngữ cảnh & Mục tiêu:**

Bạn đang đóng vai trò là **Tech Lead Front-end kiêm Kiến trúc sư React (Senior React Architect)**. Mục tiêu là xây dựng bộ source code Landing Page B2B Enterprise cho nền tảng HQSOFT.

Trọng tâm: Lead Generation (tối ưu chuyển đổi), code dễ bảo trì, cấu trúc Component khoa học, chuẩn hóa giao diện để bàn giao cho team UX/UI (Antigravity).

**Tech Stack (Đã được setup sẵn):**

* Next.js (App Router), TypeScript, Tailwind CSS.  
* Icons: lucide-react (Flat icons đơn sắc, TUYỆT ĐỐI KHÔNG DÙNG EMOJI).

### **🚨 QUY TẮC TỐI ƯU TOKEN (NO YAPPING \- CRITICAL RULES)**

Để tiết kiệm token và thời gian thực thi, BẮT BUỘC tuân thủ:

1. **Không giải thích:** Tuyệt đối không sinh ra các đoạn text giải thích bạn đang làm gì, tại sao lại dùng hàm này.  
2. **Thao tác trực tiếp (Write/Edit Files):** Nhận lệnh \-\> Tự động đọc file Docs \-\> Trực tiếp tạo file .tsx/.ts và viết code vào thư mục src/.  
3. **Chỉ phản hồi khi xong:** Khi hoàn thành toàn bộ 8 Section, chỉ in ra Terminal một chữ "DONE" và kết thúc lệnh.

### **🛠 CÁC BƯỚC THỰC THI & TECHNICAL SPECS:**

**1\. Tách biệt Dữ liệu (Data Separation):**

Tuyệt đối KHÔNG hard-code các nội dung dài (tính năng, logo, testimonials, quy mô hệ sinh thái) vào JSX. Bắt buộc tạo thư mục src/constants/ và tạo các file data (vd: ecosystemData.ts, testimonialsData.ts), sau đó import và dùng map() để render.

**2\. Component Hóa (Modularity):**

Tạo thư mục src/components/. Viết các Reusable Components như \<BentoCard\>, \<SectionWrapper\>, \<StepForm\>.

**3\. Đọc Blueprint và Xây dựng 8 Section:**

Lần lượt đọc hqsoft\_landing\_page\_blueprint.md và các file hqsoft\_copywriting\_... trong thư mục /docs để code UI.

* **Section 1:** Code thanh trượt Before/After dạng 2 cột cơ bản (Dùng 1 state để switch nội dung).  
* **Section 2 (Logic Form \- QUAN TRỌNG):** Sử dụng useState để code luồng Form động. Lựa chọn ở Câu 1 (mảng ID) sẽ quyết định các trường input hiển thị ở Câu 2\.  
* **Section 3 & 4 (Ecosystem):** Dựng layout CSS Grid (Bento) cho Hệ sinh thái 8 nhánh sản phẩm.  
* **Section 5 & 6 (AI):** Dựng UI Dark mode.  
* **Section 7 & 8:** Tạo layout Testimonials Card và Form Liên Hệ có validation cơ bản.

**4\. Dấu mốc Handoff:** Để lại comment chuẩn /\* Antigravity: \[Yêu cầu animation/hiệu ứng\] \*/ tại các vị trí cần nhúng scroll animation, parallax hoặc hover states.

## **PHẦN 2: BRIEF BÀN GIAO CHO ANTIGRAVITY (HOÀN THIỆN UX/UI & ANIMATION)**

*Gửi tài liệu này kèm theo Source Code (React/Tailwind) mà Claude vừa tạo ra cho team/công cụ Antigravity.*

**MỤC TIÊU DỰ ÁN:**

Biến bản Core Code thành một Landing Page B2B Enterprise chuẩn mực, sang trọng, tạo độ tin cậy tuyệt đối.

**TÀI LIỆU THAM KHẢO (REFERENCES \- CRITICAL):**

Vui lòng tham khảo các link dưới đây để sao chép chính xác nhịp điệu animation, spacing và cảm giác (feel) của UI:

1. [**Najaf**](https://onepagelove.com/najaf)**:** Tham khảo về Spacing (khoảng cách cực kỳ thoáng), hệ thống typography chuẩn B2B, cách làm Card Testimonials, và dải logo (Section 3).  
2. [**Neurapen**](https://onepagelove.com/neurapen)**:** Tham khảo hiệu ứng kéo thanh trượt (Before/After Slider) áp dụng cho Section 1, và cấu trúc Bento Grid bo góc mượt mà.  
3. [**Willie**](https://onepagelove.com/willie)**:** Tham khảo hiệu ứng Text/Số liệu biến đổi khi cuộn trang (Scroll-triggered animation) cho Section 2, và hiệu ứng Parallax trượt nhẹ trên các ảnh Mockup ở Section 5\.

**1\. HỆ THỐNG THỊ GIÁC (VISUAL SYSTEM):**

* **Iconography:** Code đã sử dụng Lucide React Icon. Hãy tinh chỉnh độ dày nét (stroke-width) và màu sắc đơn sắc (monochrome) để match với thương hiệu. Tuyệt đối KHÔNG thêm emoji.  
* **Typography & Spacing:** Căn chỉnh lại padding/margin theo chuẩn của Najaf. Các khối nội dung phải có không gian "thở".

**2\. YÊU CẦU UX/UI & ANIMATION CHI TIẾT THEO SECTION:**

* **Section 1 (Hero \- The Hook):** Hoàn thiện hiệu ứng kéo thanh trượt (Slider) Before/After của Neurapen. Đảm bảo thao tác kéo mượt mà, có vệt sáng hoặc handle rõ ràng ở giữa.  
* **Section 2 (Logic Form):**  
  * Áp dụng hiệu ứng cuộn trang (Scroll-triggered) của Willie cho phần text bên trái.  
  * Làm mượt hiệu ứng Transition (Fade-in / Slide-down) giữa 3 bước của Form Dự toán. Hover state nổi viền cho các thẻ ở Câu 1\.  
* **Section 3 (Trực quan hóa Độ phủ):** Xử lý hiệu ứng **Infinite Marquee** (dải Logo chạy ngang vô tận) mượt mà. Logo KHÁCH HÀNG MÀU GỐC đặt trong card nền sáng, trên background tối.  
* **Section 4 (Hệ sinh thái HQSOFT 360):** Hoàn thiện UI dạng Node/Nhánh lan tỏa (Option 2 trong spec). Vẽ các đường line (SVG) kết nối từ Hub trung tâm ra 8 module sản phẩm.  
* **Section 5 (Mockup):** Thêm hiệu ứng **Parallax nhẹ** (Trượt theo con trỏ chuột hoặc khi scroll trang) giống template Willie cho 3 thiết bị.  
* **Section 6 (AI \- The Future):** Hoàn thiện giao diện Dark Mode / Gradient mờ ảo.  
* **Micro-interactions (Toàn trang):** Các nút CTA hover đổi màu mượt. Popup Form (từ Header) bật lên với hiệu ứng Blur backdrop và scale lớn dần.