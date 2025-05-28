import { TableBodyProps } from './types';

export default function TableBody({ children, className = '', ...props }: TableBodyProps) {
  return (
    <tbody className={`${className}`} {...props}>
      {children}
    </tbody>
  );
}
