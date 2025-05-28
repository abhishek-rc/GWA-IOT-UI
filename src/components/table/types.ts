export interface TableProps {
  children?: React.ReactNode;
  className?: string;
  headCells?: string[];
  bodyRows?: (string | React.ReactNode)[][];
  [key: string]: any;
}

export interface TableHeadProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export interface TableBodyProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export interface TableRowProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  [key: string]: any;
}
