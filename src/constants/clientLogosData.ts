export type ClientLogo = {
  id: number;
  name: string;
  abbr: string;
  logoPath: string;
};

export const clientLogos: ClientLogo[] = [
  { id: 1, name: 'Vinamilk', abbr: 'VNM', logoPath: '/logos/2.png' },
  { id: 2, name: 'Masan Group', abbr: 'MSN', logoPath: '/logos/3.png' },
  { id: 3, name: 'Sabeco', abbr: 'SAB', logoPath: '/logos/4.png' },
  { id: 4, name: 'Unilever Vietnam', abbr: 'ULV', logoPath: '/logos/5.png' },
  { id: 5, name: 'Johnson & Johnson', abbr: 'JNJ', logoPath: '/logos/johnson.png' },
  { id: 6, name: 'Kao Vietnam', abbr: 'KAO', logoPath: '/logos/kao.png' },
  { id: 7, name: 'Vedan Vietnam', abbr: 'VDN', logoPath: '/logos/vedan.png' },
  { id: 8, name: 'Habeco', abbr: 'HAB', logoPath: '/logos/7.png' },
  { id: 9, name: 'Coca-Cola VN', abbr: 'CCL', logoPath: '/logos/8.png' },
  { id: 10, name: 'Abbott Vietnam', abbr: 'ABT', logoPath: '/logos/9.png' },
  { id: 11, name: 'Acecook VN', abbr: 'ACE', logoPath: '/logos/10.png' },
  { id: 12, name: 'Friesland Campina', abbr: 'FLC', logoPath: '/logos/12.png' },
  { id: 13, name: 'Nestlé Vietnam', abbr: 'NES', logoPath: '/logos/13.png' },
];
