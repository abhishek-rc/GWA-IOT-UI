import { TableHeadProps } from './types';

export default function TableHead({ children, className = '', ...props }: TableHeadProps) {
  return (
    <thead className={`bg-gray-50 dark:bg-gray-800 ${className}`} {...props}>     
        {children}
    </thead>
  );
}
