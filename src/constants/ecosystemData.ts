import { Activity, Store, Users, Link2, ChartColumn, Briefcase, Truck, UserCheck, Network, type LucideIcon } from 'lucide-react';

export type EcosystemModule = {
  id: number;
  name: string;
  description: string;
  benefit: string;   // cụm từ lợi ích ngắn gọn
  icon: LucideIcon;
};

export const ecosystemModules: EcosystemModule[] = [
  {
    id: 1,
    name: 'eSales Cloud DMS',
    description: 'Quản lý toàn diện hệ thống phân phối & bán hàng trên nền tảng đám mây.',
    benefit: 'Kiểm soát kênh phân phối 360°',
    icon: Network,
  },
  {
    id: 2,
    name: 'eSales SFA',
    description: 'Tự động hóa lực lượng bán hàng ngoài thị trường, theo dõi tuyến bán & đơn hàng theo thời gian thực.',
    benefit: 'Tăng năng suất nhân viên bán hàng',
    icon: Briefcase,
  },
  {
    id: 3,
    name: 'nRetail',
    description: 'Ứng dụng B2B kết nối nhà sản xuất và nhà bán lẻ, đặt hàng trực tuyến mọi lúc mọi nơi.',
    benefit: 'Mở rộng kênh bán không giới hạn',
    icon: Store,
  },
  {
    id: 4,
    name: '1CX',
    description: 'Nâng cao trải nghiệm khách hàng qua đa kênh tiếp xúc, chăm sóc và phản hồi nhanh.',
    benefit: 'Giữ chân khách hàng hiệu quả hơn',
    icon: Users,
  },
  {
    id: 5,
    name: 'Xspire',
    description: 'Nền tảng tích hợp mở, kết nối liền mạch mọi hệ thống trong và ngoài doanh nghiệp.',
    benefit: 'Dữ liệu thông suốt toàn hệ thống',
    icon: Link2,
  },
  {
    id: 6,
    name: 'Executive 360',
    description: 'Dashboard chiến lược cho lãnh đạo — tổng hợp KPI, dự báo và ra quyết định dựa trên dữ liệu.',
    benefit: 'Ra quyết định nhanh & chính xác',
    icon: ChartColumn,
  },
  {
    id: 7,
    name: 'eSales Manager',
    description: 'Công cụ quản lý đội ngũ kinh doanh — theo dõi hiệu suất, phân công tuyến và phê duyệt linh hoạt.',
    benefit: 'Quản lý đội nhóm mọi lúc, mọi nơi',
    icon: UserCheck,
  },
  {
    id: 8,
    name: 'eSales Delivery',
    description: 'Tối ưu lộ trình giao hàng, theo dõi tài xế và xác nhận giao nhận trực tiếp trên ứng dụng.',
    benefit: 'Giao hàng đúng hẹn, giảm chi phí vận chuyển',
    icon: Truck,
  },
  {
    id: 9,
    name: 'eSales PG',
    description: 'Quản lý hoạt động đội ngũ tiếp thị tại điểm bán — checkin, báo cáo và đánh giá trưng bày.',
    benefit: 'Nâng cao hiệu quả trưng bày tại quầy',
    icon: Activity,
  },
];
