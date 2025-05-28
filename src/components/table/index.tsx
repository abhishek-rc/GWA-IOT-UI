import { TableProps } from './types';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';

export default function Table({
  children,
  className = '',
  headCells,
  bodyRows,
  ...props
}: TableProps) {
  return (
    <div className={`${className}`}>
      <table className="w-full" {...props}>
        <TableHead className='border-b' >
          <TableRow>
            {headCells?.map((cell: string, index: number) => (
              <TableCell key={index} isHeader={true}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows?.map((row: (string | React.ReactNode)[], rowIndex: number) => (
            <TableRow key={rowIndex}>
              {row.map((cell: string | React.ReactNode, cellIndex: number) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
}

// Export all components
export { TableHead, TableBody, TableRow, TableCell };


