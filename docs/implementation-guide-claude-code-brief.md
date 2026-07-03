# **TÀI LIỆU HƯỚNG DẪN TRIỂN KHAI LANDING PAGE HQSOFT**

*Sử dụng tài liệu này để copy-paste trực tiếp cho AI (Claude) và gửi cho team/công cụ thiết kế (Antigravity).*

## **PHẦN 1: BỘ PROMPT DÀNH CHO CLAUDE (DỰNG CORE CODE & LOGIC)**

*Lưu ý: Bạn hãy copy từng khối Prompt dưới đây, đợi Claude làm xong và phản hồi tốt rồi mới gửi Prompt tiếp theo. Nguyên tắc là nạp Technical Specs trước, ráp nội dung sau.*

### **Prompt 1: Nạp System Prompt, Technical Specs & Blueprint (Cấu trúc tổng thể)**

**\[Copy đoạn dưới đây dán vào Claude\]**

"Chào Claude. Tôi đang cần xây dựng một Landing Page B2B Enterprise cho công ty phần mềm HQSOFT.

**Ngữ cảnh & Mục tiêu:** Trang web này đóng vai trò là một phễu thu thập Lead (Lead Generation) nhắm đến đối tượng C-level và Quản lý vận hành/IT. Mục tiêu tối thượng là tỷ lệ chuyển đổi cao, tốc độ tải trang nhanh (Performance), và code cực kỳ dễ để team Design (Antigravity) vào tinh chỉnh CSS/Animation sau này.

**Vai trò của bạn:** Hãy đóng vai trò là một **Tech Lead Front-end kiêm Kiến trúc sư React (Senior React Architect)**. Bạn đam mê Clean Code, các nguyên tắc SOLID trong React và hiểu sâu sắc về Component-Driven Architecture.

**Tech stack yêu cầu:** React (Next.js) kết hợp với Tailwind CSS.

**ĐẶC TẢ KỸ THUẬT (TECHNICAL SPECS) BẮT BUỘC CỦA BẠN:**

1. **Tách biệt Dữ liệu và UI (Data Separation):** Tuyệt đối KHÔNG hard-code text dài hoặc các danh sách (như tính năng, logo, testimonials) trực tiếp vào JSX. Hãy tạo các mảng dữ liệu (Config Arrays/Objects) ở trên cùng hoặc file riêng, sau đó dùng map() để render. Điều này giúp team Content dễ sửa chữ sau này.  
2. **Component Hóa (Modularity):** Chia nhỏ các UI elements thành các Reusable Components (ví dụ: \<SectionWrapper\>, \<BentoCard\>, \<FlatIcon\>, \<PrimaryButton\>).  
3. **Quản lý State Thông minh:** Với các Form động phức tạp, hãy sử dụng useState hoặc custom hook xử lý gọn gàng. Đảm bảo form kiểm thử (validation) chuẩn xác, không render lại (re-render) dư thừa.  
4. **Tailwind Class Chuẩn mực:** Tổ chức class Tailwind theo thứ tự logic (Layout \-\> Spacing \-\> Typography \-\> Colors \-\> Effects). Để sẵn các khoảng trống class hoặc comment để team Antigravity dễ dàng thêm hiệu ứng.  
5. **Chuẩn Semantic & Accessibility:** Dùng đúng thẻ \<section\>, \<article\>, \<nav\>, \<form\>. Bắt buộc dùng Flat Icon đơn sắc, tuyệt đối KHÔNG dùng emoji.

Dưới đây là Blueprint tổng thể của trang. Hãy đọc kỹ, xác nhận bạn đã thấu hiểu toàn bộ Technical Specs và Blueprint, sau đó nói 'Specs Confirmed' để tôi gửi nội dung chi tiết Section 1 và 2 cho bạn code."

*(Sau đó, bạn copy toàn bộ nội dung trong file hqsoft\_landing\_page\_blueprint.md dán vào đây)*

### **Prompt 2: Code Section 1 & Section 2 (Logic quan trọng)**

**\[Copy đoạn dưới đây dán vào Claude sau khi Claude báo sẵn sàng\]**

"Tuyệt vời. Bây giờ hãy code cho tôi Section 1 và Section 2\.

**Yêu cầu kỹ thuật riêng:**

1. **Thanh menu (Sticky Header):** Có nút 'Liên hệ', khi click sẽ trigger state mở Component \<PopupForm\>.  
2. **Section 1 (Hero):** Dựng layout chia 2 cột cho phần Before/After. Dùng HTML input range (slider) kết hợp state để người dùng kéo đổi hiển thị giữa trạng thái Trái (Xám/Báo lỗi) và Phải (Xanh/Giao diện Dashboard).  
3. **Section 2 (Logic Form Động):** Xây dựng hệ thống form động 3 bước. Luồng logic: Câu 1 (Multi-select) \-\> trigger Câu 2 (Render input tương ứng) \-\> Câu 3 (Submit thông tin) \-\> Component thông báo thành công. Sử dụng custom hook để tách logic form ra khỏi UI nếu cần.

Dưới đây là nội dung chi tiết. Nhớ nguyên tắc: Tách text thành các hằng số (constants) hoặc mảng dữ liệu để map vào Component."

*(Sau đó, bạn copy toàn bộ nội dung trong file hqsoft\_copywriting\_section1.md và hqsoft\_copywriting\_section2.md dán vào)*

### **Prompt 3: Code Section 3 & 4 (Ecosystem & Bento Grid)**

**\[Copy đoạn dưới đây dán vào Claude\]**

"Hoàn hảo. Tiếp tục với Section 3 và Section 4\.

**Yêu cầu kỹ thuật riêng:**

1. **Section 3 (Logo):** Dựng layout flex row có overflow-hidden. Sử dụng cấu trúc mảng cho danh sách Logo. Để sẵn comment /\* Antigravity: Add infinite marquee animation here \*/.  
2. **Section 4 (Hệ sinh thái HQSOFT 360):** Dựng UI bằng CSS Grid / Flexbox mô phỏng Hub trung tâm tỏa ra các module sản phẩm. Setup cấu trúc DOM thật gọn gàng, sử dụng relative/absolute positioning hợp lý để team Design tiện vẽ SVG lines nối các Hub sau này.

Dưới đây là nội dung chi tiết (Copywriting)."

*(Copy nội dung file hqsoft\_copywriting\_section3\_4.md dán vào)*

### **Prompt 4: Code Section 5 đến 8 (Hoàn thiện)**

**\[Copy đoạn dưới đây dán vào Claude\]**

"Tốt lắm. Bây giờ hãy hoàn thiện nốt từ Section 5 đến Section 8\.

**Yêu cầu kỹ thuật riêng:**

1. **Section 5:** Layout 3 ảnh Mockup xếp chồng/lồng nhau (dùng z-index và absolute positioning).  
2. **Section 6 (AI):** Giao diện Dark mode. Dựng 3 thẻ Bento cho tính năng AI.  
3. **Section 7 (Testimonials):** UI Card theo mảng dữ liệu.  
4. **Section 8 (Form đóng phễu):** Code Form chuẩn. select Chức vụ là bắt buộc. Validate Regex cho field Email.

Nhớ bỏ toàn bộ emoji nếu có trong nội dung gốc, thay bằng các component \<Icon /\> giữ chỗ. Dưới đây là nội dung chi tiết."

*(Copy nội dung file hqsoft\_copywriting\_section5\_8.md dán vào)*

## **PHẦN 2: BRIEF BÀN GIAO CHO ANTIGRAVITY (HOÀN THIỆN UX/UI & ANIMATION)**

*Gửi tài liệu này kèm theo Source Code (React/Tailwind) mà Claude vừa tạo ra cho team/công cụ Antigravity.*

**MỤC TIÊU DỰ ÁN:**

Biến bản Core Code thành một Landing Page B2B Enterprise chuẩn mực, sang trọng, tạo độ tin cậy tuyệt đối. Nguồn cảm hứng chính là sự pha trộn giữa khung sườn chuẩn mực của Najaf, tính tương tác trực quan của Neurapen và hiệu ứng dữ liệu động của Willie.

**TÀI LIỆU THAM KHẢO (REFERENCES \- CRITICAL):**

Vui lòng tham khảo các link dưới đây để sao chép chính xác nhịp điệu animation, spacing và cảm giác (feel) của UI:

1. [**Najaf**](https://onepagelove.com/najaf)**:** Tham khảo về Spacing (khoảng cách cực kỳ thoáng), hệ thống typography chuẩn B2B, cách làm Card Testimonials, và đặc biệt là dải logo khách hàng (Section 3).  
2. [**Neurapen**](https://onepagelove.com/neurapen)**:** Tham khảo hiệu ứng kéo thanh trượt (Before/After Slider) áp dụng cho Section 1, và cấu trúc Bento Grid bo góc mượt mà áp dụng cho Section 4\.  
3. [**Willie**](https://onepagelove.com/willie)**:** Tham khảo hiệu ứng Text/Số liệu biến đổi khi cuộn trang (Scroll-triggered animation) cho Section 2, và hiệu ứng Parallax trượt nhẹ trên các ảnh Mockup ở Section 5\.

**1\. HỆ THỐNG THỊ GIÁC (VISUAL SYSTEM):**

* **Iconography (Bắt buộc):** Tuyệt đối KHÔNG sử dụng emoji. Thay thế các placeholder bằng 100% Flat Icon đơn sắc (monochrome). Sử dụng tone màu xanh thương hiệu HQSOFT hoặc xám tinh tế để match với nền.  
* **Typography & Spacing:** Căn chỉnh lại padding/margin theo chuẩn của Najaf. Các khối nội dung phải có không gian "thở". Sử dụng font chữ hiện đại, sans-serif.

**2\. YÊU CẦU UX/UI & ANIMATION CHI TIẾT THEO SECTION:**

* **Section 1 (Hero \- The Hook):**  
  * Hoàn thiện hiệu ứng kéo thanh trượt (Slider) Before/After của Neurapen. Đảm bảo thao tác kéo mượt mà, có vệt sáng hoặc handle rõ ràng ở giữa.  
* **Section 2 (Logic Form):**  
  * Áp dụng hiệu ứng cuộn trang (Scroll-triggered) của Willie cho phần text bên trái.  
  * Làm mượt hiệu ứng Transition khi người dùng tương tác với Form Dự toán (Fade-in / Slide-down trơn tru khi các câu hỏi xuất hiện).  
  * Hover state: Các thẻ chọn vấn đề ở Câu 1 khi hover vào sẽ nổi viền (Border highlight) hoặc đổ bóng nhẹ.  
* **Section 3 (Trực quan hóa Độ phủ):**  
  * Xử lý hiệu ứng **Infinite Marquee** (dải Logo chạy ngang vô tận) mượt mà, không bị giật khung hình khi lặp lại. Logo MÀU GỐC đặt trong card nền sáng, trên background xanh đen/tối.  
* **Section 4 (Hệ sinh thái HQSOFT 360):**  
  * Hoàn thiện UI dạng Node/Nhánh lan tỏa (Hub). Vẽ các đường line (SVG) kết nối từ Hub trung tâm ra 8 module sản phẩm.  
  * *Nice-to-have:* Thêm hiệu ứng ánh sáng (glowing dot) chạy dọc theo các đường line kết nối để thể hiện luồng dữ liệu (Data flow).  
* **Section 5 (Mockup):**  
  * Thêm hiệu ứng **Parallax nhẹ** (Trượt theo con trỏ chuột hoặc khi scroll trang) giống template Willie để tạo chiều sâu không gian cho 3 thiết bị.  
* **Section 6 (AI \- The Future):**  
  * Hoàn thiện giao diện Dark Mode / Gradient mờ ảo cho khối này để bật lên vẻ "Công nghệ tương lai".  
* **Micro-interactions (Áp dụng toàn trang):**  
  * Các nút CTA chính: Hiệu ứng hover đổi màu mượt, nút có cảm giác "nhấn" được.  
  * Popup Form (từ thanh Menu): Bật lên với hiệu ứng mờ nền (Blur backdrop) và scale popup (nhỏ \-\> lớn).