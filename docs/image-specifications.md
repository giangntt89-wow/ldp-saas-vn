# Thông số Kỹ thuật & Danh sách Hình ảnh Landing Page HQSOFT 360

Dưới đây là danh sách toàn bộ các hình ảnh đang được sử dụng trên trang Landing Page, kèm theo vị trí, kích thước hiển thị trên code và kích thước thiết kế đề xuất để bạn có thể chuẩn bị assets cho phù hợp.

## 1. Nhóm Logo Thương Hiệu (Branding)

| Vị trí / File | Ngữ cảnh sử dụng | Kích thước Code | Kích thước Thiết kế Đề xuất (Px) | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **Header Logo**<br/>`/[HQSOFT]-Logo-tagline.png` | Hiển thị ở thanh điều hướng trên cùng (nền sáng/trong suốt). | `width: 140, height: 40`<br/>(Auto width, fixed height) | **560 x 160**<br/>(Tỷ lệ ~3.5:1) | Thiết kế dạng ngang (Horizontal). Nên có nền trong suốt (PNG/SVG). |
| **Footer Logo**<br/>`/[HQSOFT]-Logo-tagline-white.png` | Hiển thị ở chân trang (nền tối). | `width: 180, height: 56`<br/>(Auto width, fixed height) | **720 x 224**<br/>(Tỷ lệ ~3.2:1) | Logo phiên bản màu trắng (Âm bản) dùng cho nền tối. |
| **Icon Zalo**<br/>`/zalo-icon.png` | Nút liên hệ mạng xã hội ở Footer. | `width: 24, height: 24` | **96 x 96**<br/>(Tỷ lệ 1:1 - Vuông) | Icon Zalo chuẩn, nền trong suốt. |

---

## 2. Nhóm Mockup / Hình ảnh Sản phẩm (Product Visuals)

Đây là các hình ảnh quan trọng nhất thể hiện giao diện phần mềm, dashboard, hoặc kiến trúc hệ thống. Các hình ảnh này sử dụng thuộc tính `object-cover` nên có thể tự động cắt cúp để lấp đầy khung hình, tuy nhiên bạn nên thiết kế theo đúng tỷ lệ dưới đây để tránh bị mất góc quan trọng.

### 2.1. Khu vực Logic Section (Giới thiệu Giải pháp)
Các hình ảnh minh họa cho từng Tab giải pháp (eCS, eSales, v.v.).
- **Vị trí Code:** `src/components/sections/LogicSection.tsx`
- **Kích thước Code:** `width: 600, height: 400`
- **Tỷ lệ hiển thị:** **3:2** (Ngang)

| Tên File | Chức năng | Kích thước Thiết kế Đề xuất |
| :--- | :--- | :--- |
| `/mockups/executive_dashboard_new.png` | Hình minh họa cho Tab Giải pháp 1 | **1200 x 800** hoặc **1920 x 1080** |
| `/mockups/bo_sales_mockup_new.png` | Hình minh họa cho Tab Giải pháp 2 | **1200 x 800** hoặc **1920 x 1080** |
| `/mockups/it_architecture_mockup_new.png` | Hình minh họa cho Tab Giải pháp 3 | **1200 x 800** hoặc **1920 x 1080** |

### 2.2. Khu vực Mockup Section (Giao diện Nền tảng)
Các card hình ảnh giới thiệu giao diện Backoffice, C-Level, Field App.
- **Vị trí Code:** `src/components/sections/MockupSection.tsx`
- **Kích thước Code:** `width: 600, height: 450`
- **Tỷ lệ hiển thị:** **4:3** (Ngang)

| Tên File | Chức năng | Kích thước Thiết kế Đề xuất | Ghi chú |
| :--- | :--- | :--- | :--- |
| `/mockups/backoffice_dashboard.png` | Giao diện Back Office | **1200 x 900** | Mockup màn hình Laptop/Desktop |
| `/mockups/clevel_dashboard.png` | Giao diện C-Level / Tablet | **1200 x 900** | Mockup Tablet hoặc Desktop |
| `/mockups/salesman_field_app.png` | Giao diện Mobile App cho Sale | **1200 x 900** | Vì app trên mobile (9:16) thiết kế dọc, bạn nên **đặt 2-3 mockup điện thoại đứng cạnh nhau trên một nền nghệ thuật 4:3** để lấp đầy khung hình chữ nhật ngang này. |

### 2.3. Khu vực C-Level Section (Dashboard Quản trị)
- **Vị trí Code:** `src/components/sections/CLevelSection.tsx`
- **Kích thước Code:** `width: 600, height: 800` (Hiển thị dọc)
- **Tỷ lệ hiển thị:** **3:4** (Dọc / Portrait)
- **File sử dụng:** Lấy lại file `/mockups/executive_dashboard_new.png`
- **Ghi chú Thiết kế:** Khung hiển thị ở section này là dạng dọc (Portrait). Khi ảnh ngang (3:2) được nhúng vào khung dọc (3:4) bằng thuộc tính `object-cover`, hai bên trái/phải của ảnh sẽ bị cắt đi và chỉ lấy phần trung tâm. Do đó, hãy **thiết kế trọng tâm thông tin nằm ở chính giữa bức ảnh** để khi bị crop trên bản desktop/mobile ở section này vẫn hiển thị tốt.

---

## 3. Nhóm Logo Khách hàng / Đối tác (Trust Section)

- **Vị trí Code:** `src/components/sections/TrustSection.tsx`
- **Đường dẫn thư mục:** `public/logos/` (VD: `vedan.png`, `johnson.png`, `kao.png`, v.v.)
- **Kích thước Code:** `width: 140, height: 50` (Tự động thu phóng để vừa khung - `object-contain`)
- **Thiết kế Đề xuất:** 
  - **Kích thước hộp giới hạn (Bounding Box):** ~ **280 x 100** pixel.
  - Bạn không cần phải fix cứng tỷ lệ cho mọi logo, vì hệ thống sẽ tự động scale giữ nguyên tỷ lệ thật của logo. Chỉ cần đảm bảo các logo được xuất ra sát viền (không thừa khoảng trống trong suốt quá nhiều) và ưu tiên định dạng PNG nền trong suốt hoặc SVG để nhìn đồng bộ.
