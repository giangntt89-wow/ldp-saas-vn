# **KỊCH BẢN & LOGIC: TRÌNH TẠO BUSINESS CASE TỰ ĐỘNG (SMART FORM)**

**Mục tiêu:** Thu thập thông tin Lead đa giải pháp (DMS, 1CX, nRetail, PG, Data Warehouse) bằng một form duy nhất. Sử dụng "Dynamic Logic" để điều hướng thông số cần nhập và cá nhân hóa Báo cáo Chi phí chìm.

## **BƯỚC 1: GIAO DIỆN FORM ĐIỀU PHỐI TỰ ĐỘNG (DYNAMIC UI)**

*Hệ thống sẽ ẩn/hiện các trường nhập liệu dựa trên thao tác chọn của khách hàng. Đây là điểm chạm (Touchpoint) duy nhất để thu thập Lead cho toàn trang.*

**Tiêu đề Form:** Chẩn Đoán Sức Khỏe Vận Hành & Dự Toán Tối Ưu

**Dòng mô tả (Subtitle):** Trả lời nhanh 2 câu hỏi để nhận ngay bản phân tích "Chi phí chìm" và giải pháp số hóa toàn diện cho doanh nghiệp của bạn.

**\[Trường 1\] \- Chọn Vấn đề nhức nhối nhất của bạn (Chỉ chọn 1):**

* 🔘 **\[Option A\]** Thất thoát viếng thăm, khó kiểm soát đội Sales & Điểm bán truyền thống.  
* 🔘 **\[Option B\]** Tốn ngân sách cho đội ngũ PG/PB nhưng khó đo lường hiệu quả thực tế.  
* 🔘 **\[Option C\]** Khó giữ chân khách hàng, đứt gãy trải nghiệm mua sắm bán lẻ (Retail/Omnichannel).  
* 🔘 **\[Option D\]** Phân mảnh dữ liệu, mất hàng tuần để làm báo cáo thủ công.

**\[Trường 2\] \- Thông số cá nhân hóa (Hiển thị động theo Lựa chọn ở Trường 1):**

* *Nếu chọn \[A\]:* \[ Số lượng nhân viên Sales? \] và \[ Số lượng Điểm bán? \]  
* *Nếu chọn \[B\]:* \[ Số lượng nhân viên PG/PB? \] và \[ Lương TB của 1 PG/tháng? \]  
* *Nếu chọn \[C\]:* \[ Số lượng Cửa hàng bán lẻ? \] và \[ Lượng Khách hàng thành viên? \]  
* *Nếu chọn \[D\]:* \[ Số lượng nhân sự liên quan việc làm Báo cáo? \]

**\[Trường 3\] \- Thông tin Liên hệ & Nhận Báo cáo (Gom thành 1 cụm):**

* \[ Họ và tên (Vd: Nguyễn Văn A) \] *(Bắt buộc)*  
* \[ Tên Công ty / Tổ chức \] *(Bắt buộc \- Giúp Sales phân loại quy mô)*  
* \[ Số điện thoại \] *(Bắt buộc)*  
* \[ Email công việc \] *(Bắt buộc)*

**Nút Call-to-Action (CTA):** \[ 📊 TẠO YÊU CẦU BÁO CÁO \]

## **BƯỚC 2: LOGIC TÍNH TOÁN THEO NHÓM GIẢI PHÁP (BACK-END)**

*(Hệ thống tự động tính toán tức thì dựa trên dữ liệu đầu vào. Các công thức chi tiết sẽ được mapping cùng team Data)*

* **Nhóm 1 (eSales DMS):** Tính doanh thu thất thoát do viếng thăm ảo.  
* **Nhóm 2 (ePG):** Tính quỹ lương lãng phí & ngân sách trả sai.  
* **Nhóm 3 (1CX/nRetail):** Tính doanh thu hụt do rò rỉ khách hàng trung thành.  
* **Nhóm 4 (Data/BI):** Tính chi phí nhân sự lãng phí cho việc làm data thủ công.

*(💡 **Lưu ý Logic Cứu hộ:** Trong trường hợp khách hàng điền thiếu một số tham số ở Trường 2, hệ thống sẽ tự động gán các chỉ số "Industry Benchmark" (Trung bình ngành) để đảm bảo vẫn xuất ra được kết quả. Trên báo cáo sẽ hiện chú thích rõ ràng về việc sử dụng giả định này).*

## **BƯỚC 3: QUY TRÌNH "CONCIERGE" \- XÉT DUYỆT & TRẢ KẾT QUẢ**

*Nhằm đảm bảo tính chuyên nghiệp tuyệt đối với khách hàng B2B, quy trình gửi báo cáo sẽ qua luồng "Human-in-the-loop" (Có sự kiểm duyệt của con người).*

### **3.1. Email Tự Động Xác Nhận (Gửi ngay lập tức \- Giây thứ 01\)**

* **Định dạng:** Plain/Rich-text (Trông như email cá nhân, chống vào hòm Spam).  
* **Nội dung:** \> "Chào anh/chị \[Tên\], hệ thống HQSOFT đã nhận được dữ liệu đầu vào từ \[Tên công ty\]. Chuyên gia giải pháp của chúng tôi đang rà soát lại các chỉ số tính toán để đảm bảo sát nhất với đặc thù ngành hàng của anh/chị. Báo cáo phân tích (định dạng 1-Page PDF) sẽ được gửi đến email này trong vòng 2-4 giờ làm việc tiếp theo. Trân trọng\!"

### **3.2. Bước Kiểm Duyệt Nội Bộ (Double-Check của Admin/MKT)**

* Dữ liệu form và kết quả AI tính toán sẽ đẩy về hệ thống nội bộ (CRM / Slack / Email Admin).  
* Nhân viên HQSOFT xem qua các con số: Nếu logic hợp lý \-\> Bấm **\[Duyệt & Gửi Báo Cáo\]**. Nếu khách nhập số sai lệch \-\> Admin có thể tinh chỉnh lại số liệu cho thuyết phục trước khi gửi.

### **3.3. Email Trả Báo Cáo Chính Thức (Sau khi duyệt)**

* **Định dạng:** Rich-text an toàn, bypass tường lửa MNCs.  
* **Nội dung:** Chào anh/chị \[Tên\], đính kèm là báo cáo chi tiết được chuyên gia HQSOFT phân tích dành riêng cho \[Tên công ty\]. Nó chỉ ra điểm rò rỉ ngân sách ước tính **\[Kết quả VNĐ\]** mỗi tháng. Đặt lịch Demo tại \[Link Calendly\].  
* **Cơ chế đính kèm:** KHÔNG đính kèm file vật lý. Dùng nút bấm an toàn dẫn link: \[ 📄 Xem Bản Phân Tích (PDF) \] trỏ về domain nội bộ dms.hqsoft.vn/reports/...  
* **Footer / Disclaimer (MỚI THÊM):***(*) Lưu ý: Báo cáo mang tính tham khảo chiến lược, dựa trên dữ liệu đầu vào và benchmark ngành. Để nhận phân tích tài chính chính xác nhất với thực tế doanh nghiệp, vui lòng đặt lịch tư vấn trực tiếp cùng chuyên gia.\*

## **BƯỚC 4: FORMAT FILE PDF (1-PAGE EXECUTIVE DASHBOARD)**

*File PDF duy nhất 1 trang, thiết kế theo hướng Infographic / Dashboard tài chính cao cấp.*

**Bố cục 1 Trang:**

* **\[Header\]:** Logo HQSOFT x Logo Công ty Khách hàng (Cá nhân hóa tối đa). Tiêu đề: *Báo Cáo Dự Toán Tối Ưu Vận Hành*.  
* **\[Khối 1 \- Vấn đề\]:** Hiển thị lại số liệu khách nhập (Số Sales, Điểm bán...)  
* **\[Khối 2 \- Nỗi đau (Màu đỏ)\]:** Biểu đồ tròn/cột (Chart) hiển thị con số **Chi phí chìm bị lãng phí**. Kèm 3 gạch đầu dòng giải thích nguyên nhân.  
* **\[Khối 3 \- Giải pháp HQSOFT (Màu xanh)\]:** Giới thiệu module giải pháp tương ứng (DMS/ePG/1CX/BI) giúp thu hồi khoản lãng phí này. Kèm 1 câu Social Proof (Vd: "Giúp KAO tăng 25% độ phủ").  
* **\[Footer\]:** \* Thông tin liên hệ tư vấn chuyên gia & QR Code đặt lịch Demo.  
  * *Dòng in nghiêng nhỏ (Disclaimer): "Số liệu dự toán mang giá trị tham khảo chiến lược dựa trên dữ liệu đầu vào và bộ tiêu chuẩn ngành. Vui lòng liên hệ HQSOFT để được tư vấn và phân tích chi tiết."*