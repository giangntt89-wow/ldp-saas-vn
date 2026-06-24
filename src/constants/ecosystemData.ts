import { Activity, Store, Users, Link2, ChartColumn, Building2, Truck, UserCheck, Network, type LucideIcon } from 'lucide-react';

export type EcosystemModule = {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const ecosystemModules: EcosystemModule[] = [
  { id: 1, name: 'eSales Cloud DMS', description: 'Quản lý toàn diện hệ thống phân phối & bán hàng', icon: Network },
  { id: 2, name: 'eSales SFA', description: 'Tự động hóa đội ngũ bán hàng', icon: Activity },
  { id: 3, name: 'nRetail', description: 'Ứng dụng B2B kết nối nhà sản xuất và nhà bán lẻ', icon: Store },
  { id: 4, name: '1CX', description: 'Tăng trải nghiệm khách hàng', icon: Users },
  { id: 5, name: 'Xspire', description: 'Nền tảng tích hợp, kết nối mọi hệ thống trong doanh nghiệp', icon: Link2 },
  { id: 6, name: 'Executive 360', description: 'Quản trị chiến lược tối ưu với dữ liệu', icon: ChartColumn },
  { id: 7, name: 'eSales Manager', description: 'Nâng tầm quản lý đội ngũ kinh doanh', icon: Building2 },
  { id: 8, name: 'eSales Delivery', description: 'Tối ưu lộ trình giao hàng', icon: Truck },
  { id: 9, name: 'eSales PG', description: 'Quản lý hiệu quả đội ngũ tiếp thị', icon: UserCheck },
];
