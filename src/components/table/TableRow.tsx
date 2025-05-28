import { TableRowProps } from './types';

export default function TableRow({ children, className = '', ...props }: TableRowProps) {
  return (
    <tr className={` even:bg-[#D6EEEE] ${className}`} {...props}>
      {children}
    </tr>
  );
}
