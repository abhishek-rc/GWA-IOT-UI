import { TableCellProps } from './types';

export default function TableCell({ children, className = '', isHeader = false, ...props }: TableCellProps & { isHeader?: boolean }) {
  const baseClasses = `px-6 py-4 ${className}`;
  const headerClasses = isHeader ? 'font-sans text-sm font-medium text-gray-700 dark:text-gray-300' : '';
  const alignmentClasses = isHeader ? 'text-left' : 'text-left'; // Align all cells to left
  const widthClasses = ''; // Minimum width for better alignment
  
  return (
    <td className={`${baseClasses} ${headerClasses} ${alignmentClasses} ${widthClasses}`} {...props}>
      {children}
    </td>
  );
}
