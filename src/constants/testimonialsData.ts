export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Từ khi áp dụng hệ sinh thái của HQSOFT, chúng tôi đã giảm thiểu 30% thời gian xử lý đơn hàng và kiểm soát chặt chẽ 100% ngân sách khuyến mãi Trade MKT.',
    name: 'Nguyễn Văn Minh',
    title: 'Giám Đốc Điều Hành',
    company: 'Công ty FMCG Hàng Đầu',
    initials: 'NVM',
  },
  {
    id: 2,
    quote:
      'Điều khiến khối IT chúng tôi an tâm nhất là hệ thống vận hành cực kỳ ổn định, bảo mật cao và khả năng tích hợp API mượt mà với hệ thống ERP hiện tại của tập đoàn.',
    name: 'Trần Thị Lan',
    title: 'CIO / IT Manager',
    company: 'Tập đoàn Phân Phối Quốc Tế',
    initials: 'TTL',
  },
  {
    id: 3,
    quote:
      'HQSOFT giúp đội Sales của chúng tôi tăng năng suất viếng thăm điểm bán lên 45%. Dữ liệu Real-time từ eSales SFA cho phép chúng tôi ra quyết định nhanh hơn bao giờ hết.',
    name: 'Lê Hồng Phúc',
    title: 'Giám Đốc Kinh Doanh',
    company: 'Chuỗi Bán Lẻ Toàn Quốc',
    initials: 'LHP',
  },
];
