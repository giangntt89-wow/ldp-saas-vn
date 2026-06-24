import { type ReactNode } from 'react';

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function SectionWrapper({ id, className = '', children }: Props) {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
