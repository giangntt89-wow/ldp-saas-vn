# **BRIEF BÀN GIAO GIAO DIỆN & HIỆU ỨNG (UI/UX) \- LANDING PAGE HQSOFT**

**Kính gửi Team Design / Đơn vị triển khai Antigravity,**

Kèm theo tài liệu này là bộ Source Code Core (React/Tailwind) đã được xây dựng chuẩn logic và chức năng. Mục tiêu của giai đoạn này là biến bản Core Code thành một Landing Page B2B Enterprise chuẩn mực, sang trọng, tạo độ tin cậy tuyệt đối.

### **📌 TÀI LIỆU THAM KHẢO (REFERENCES \- CRITICAL)**

Vui lòng tham khảo các link dưới đây để sao chép chính xác nhịp điệu animation, spacing và cảm giác (feel) của UI:

1. [**Najaf**](https://onepagelove.com/najaf)**:** Tham khảo về Spacing (khoảng cách cực kỳ thoáng), hệ thống typography chuẩn B2B, cách làm Card Testimonials, và dải logo (Section 3).  
2. [**Neurapen**](https://onepagelove.com/neurapen)**:** Tham khảo hiệu ứng kéo thanh trượt (Before/After Slider) áp dụng cho Section 1, và cấu trúc Bento Grid bo góc mượt mà.  
3. [**Willie**](https://onepagelove.com/willie)**:** Tham khảo hiệu ứng Text/Số liệu biến đổi khi cuộn trang (Scroll-triggered animation) cho Section 2, và hiệu ứng Parallax trượt nhẹ trên các ảnh Mockup ở Section 5\.

### **🎨 1\. HỆ THỐNG THỊ GIÁC (VISUAL SYSTEM)**

* **Iconography:** Code hiện đang sử dụng lucide-react. Hãy tinh chỉnh độ dày nét (stroke-width) và sử dụng màu đơn sắc (monochrome) trùng với tone màu nhận diện thương hiệu. Tuyệt đối KHÔNG sử dụng emoji.  
* **Typography & Spacing:** Căn chỉnh lại padding/margin theo chuẩn của template Najaf. Các khối nội dung phải có không gian "thở", tạo cảm giác Enterprise.  
* **Logo Khách hàng:** BẮT BUỘC dùng logo full-color (màu gốc) của khách hàng để tôn trọng Brand Guidelines của họ. Đặt logo vào các thẻ Card (nền xám sáng/trắng, bo góc, có shadow nhẹ) trên nền background tối để nổi khối (3D).

### **🚀 2\. YÊU CẦU UX/UI & ANIMATION CHI TIẾT THEO SECTION**

*(Chú ý: Trong Source code đã có sẵn các comment đánh dấu /\* Antigravity: ... \*/ tại các vị trí cần gắn hiệu ứng)*

* **Section 1 (Hero \- The Hook):** Hoàn thiện hiệu ứng kéo thanh trượt (Slider) Before/After của template Neurapen. Đảm bảo thao tác kéo mượt mà, có vệt sáng hoặc handle cầm nắm rõ ràng ở giữa.  
* **Section 2 (Logic Form & ROI):**  
  * Áp dụng hiệu ứng cuộn trang (Scroll-triggered) của Willie cho phần text bên trái.  
  * Làm mượt hiệu ứng Transition (Fade-in / Slide-down) giữa 3 bước của Form Dự toán động. Hover state nổi viền cho các thẻ ở Câu 1\.  
* **Section 3 (Trực quan hóa Độ phủ):** Xử lý hiệu ứng **Infinite Marquee** (dải Logo chạy ngang vô tận) thật mượt mà, không bị giật lag khi lặp vòng.  
* **Section 4 (Hệ sinh thái HQSOFT 360):** Hoàn thiện UI dạng Node/Nhánh lan tỏa. Vẽ các đường line (SVG) kết nối mượt mà từ Hub trung tâm ra 8 module sản phẩm. Có thể cân nhắc thêm hiệu ứng điểm sáng chạy dọc theo các đường line.  
* **Section 5 (Mockup):** Thêm hiệu ứng **Parallax nhẹ** (Trượt theo con trỏ chuột hoặc di chuyển tốc độ khác nhau khi scroll trang) giống template Willie cho 3 thiết bị.  
* **Section 6 (AI \- The Future):** Hoàn thiện giao diện Dark Mode / Gradient mờ ảo để tạo cảm giác công nghệ AI.  
* **Micro-interactions (Toàn trang):** Các nút CTA hover đổi màu mượt. Popup Form (từ Header) bật lên với hiệu ứng Blur backdrop và scale lớn dần.