export const TableWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export const Table = ({ children }: { children: React.ReactNode }) => {
  return <table className='relative'>{children}</table>;
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <thead className='sticky top-0 z-1'>{children}</thead>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};

export const TableHeadCell = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width: string;
}) => {
  return (
    <th className='px-1'>
      <div className={width}>
        <div className='bg-gray-100 p-2'>{children}</div>
      </div>
    </th>
  );
};

export const TableCell = ({
  children,
  width,
  clamp,
}: {
  children: React.ReactNode;
  width: string;
  clamp?: string;
}) => {
  return (
    <td className='px-1'>
      <div className={width}>
        <div className='p-2'>
          <div className={clamp}>{children}</div>
        </div>
      </div>
    </td>
  );
};
