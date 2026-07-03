# Hướng Dẫn Điều Chỉnh SVG Value Chain Diagram (Hero Section)

Tài liệu này ghi lại các bước và chi tiết code để điều chỉnh sơ đồ Chuỗi giá trị (Value Chain Diagram) nằm trong trang Hero (`src/components/IntroReveal.tsx`), đảm bảo vị trí các sản phẩm và đường nét nối (line) hiển thị chính xác theo yêu cầu.

## File cần chỉnh sửa
- `src/components/IntroReveal.tsx` (Phần component `SupplyChainDiagram`)

## Các yêu cầu đã thay đổi
1. **Loại bỏ tên sản phẩm** trong các card đại diện (chỉ giữ lại label của chính node đó như Nhà Sản Xuất, Nhà Phân Phối...).
2. **Quy hoạch lại vị trí các sản phẩm**:
   - `eSales Cloud DMS` và `Executive 360`: Nằm ngay dưới node Manufacture.
   - `eSales SFA`: Nằm giữa đoạn Distributor và Retail Store.
   - `nRetail`: Nằm giữa đoạn đường từ Retail Store trả về Manufacture.
   - `1CX`: Nằm giữa đoạn đường từ Consumer trả về Manufacture.
3. **Chỉnh sửa nét vẽ cho nRetail và 1CX**:
   - Sử dụng **nét đứt** (`strokeDasharray`).
   - Đường đi phải là **đường thẳng/vuông góc** (sử dụng lệnh `H` và `V` trong SVG path), tuyệt đối không dùng đường vòng cung (lệnh `A` - Arc).

---

## Chi tiết cách sửa Code SVG

### 1. Cập nhật Base Lines (Các đường nối nền)
Tìm đến phần chú thích `{/* ════════ BASE LINES ════════ */}`. Thay đổi các path cho nhánh vòng về của nRetail (Base 3) và 1CX (Base 4) thành đường gấp khúc vuông góc:

```jsx
{/* Base 3: Retail Store → Manufacture (nRetail feedback) */}
{/* Sử dụng V (Vertical) và H (Horizontal) thay vì vòng cung A */}
<path d="M480,250 V160 H156 A16,16 0 0,0 140,176 V190"
      stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none"
      strokeDasharray="5 5" />

{/* Base 4: Consumer → Manufacture (1CX feedback) */}
<path d="M700,250 V80 H156 A16,16 0 0,0 140,96 V90"
      stroke="#0066FF" strokeOpacity=".12" strokeWidth="1.5" fill="none"
      strokeDasharray="5 5" />
```

### 2. Cập nhật Animated Flow Paths (Đường chạy hiệu ứng)
Tương tự, ở phần `{/* ════════ ANIMATED FLOW PATHS ════════ */}`, cập nhật lại `d` path và thay đổi style nét đứt cho đường số 3 và số 4:

```jsx
{/* Path 3: Retail → Manufacture (dashed feedback) */}
<path d="M480,250 V160 H156 A16,16 0 0,0 140,176 V190"
      stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none"
      strokeOpacity=".4"
      style={{ animation: 'hero-flow-path 3s linear infinite 0.7s' }} />

{/* Path 4: Consumer → Manufacture (dashed feedback) */}
<path d="M700,250 V80 H156 A16,16 0 0,0 140,96 V90"
      stroke="url(#pg)" strokeDasharray="6 10" strokeWidth="1.5" fill="none"
      strokeOpacity=".4"
      style={{ animation: 'hero-flow-path 3.5s linear infinite 0.2s' }} />
```

### 3. Điều chỉnh tọa độ các Badge Sản phẩm (Product Pills)
Tại khu vực `{/* ════════ PRODUCT BADGES ════════ */}`, điều chỉnh lại `x`, `y` của từng thẻ `<g>` (Group) chứa `rect` và `text` để đưa chúng về đúng tọa độ yêu cầu.

**A. eSales Cloud DMS & Executive 360 (Dưới Manufacture)**
```jsx
{/* eSales Cloud DMS (y=208) */}
<g filter="url(#glow)">
  <rect x="52" y="208" width="176" height="24" rx="12" fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
  {/* ... (phần icon mini) ... */}
  <text x="138" y="224" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="700">eSales Cloud DMS</text>
</g>

{/* Executive 360 (y=238) - Xếp ngay bên dưới DMS */}
<g filter="url(#glow)">
  <rect x="70" y="238" width="140" height="24" rx="12" fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
  {/* ... (phần icon mini) ... */}
  <text x="149" y="254" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="700">Executive 360</text>
</g>
```

**B. eSales SFA (Giữa Distributor và Retail)**
Đoạn đường đi từ `x=190` sang `x=430`, ta đặt SFA ở giữa `x=264`.
```jsx
<g filter="url(#glow)">
  <rect x="264" y="447" width="100" height="24" rx="12" fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.5)" strokeWidth="1" />
  {/* ... (phần icon mini) ... */}
  <text x="323" y="463" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="700">eSales SFA</text>
</g>
```

**C. nRetail (Giữa đường về của Retail Store)**
Căn giữa đoạn nét đứt ngang (khoảng `y=149`). Ta thêm thuộc tính `strokeDasharray="3 2"` cho viền của badge để tạo sự đồng bộ với đường nét đứt.
```jsx
<g filter="url(#glow)">
  <rect x="274" y="149" width="88" height="24" rx="12" fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.35)" strokeWidth="1" strokeDasharray="3 2" />
  {/* ... (phần icon mini) ... */}
  <text x="340" y="165" textAnchor="middle" fill="#00E5FF" fontSize="9.5" fontWeight="700">nRetail</text>
</g>
```

**D. 1CX (Giữa đường về của Consumer)**
Tương tự như nRetail, căn giữa trên đoạn nét đứt dài trên cùng (`y=69`).
```jsx
<g filter="url(#glow)">
  <rect x="396" y="69" width="64" height="24" rx="12" fill="rgba(4,18,48,.92)" stroke="rgba(0,180,216,.35)" strokeWidth="1" strokeDasharray="3 2" />
  {/* ... (phần icon mini) ... */}
  <text x="443" y="85" textAnchor="middle" fill="#00E5FF" fontSize="10" fontWeight="700">1CX</text>
</g>
```

---

## Mẹo (Tips) khi team Design/Dev cần chỉnh thêm tọa độ:
- Để thay đổi vị trí một Badge bất kỳ, nhóm (group) thẻ `<g>` lại, chỉ cần dịch chuyển các thuộc tính `x`, `y` của thẻ `<rect>`, thẻ chứa `<svg>` mini icon và `<text>` tương ứng với một khoảng delta giống nhau.
- Các đường thẳng được cấu tạo từ các điểm `M` (Move to), đi ngang dùng lệnh `H` (Horizontal Line To + tọa độ X), đi dọc dùng `V` (Vertical Line To + tọa độ Y). Không cần tính toán handle đường cong phức tạp.
