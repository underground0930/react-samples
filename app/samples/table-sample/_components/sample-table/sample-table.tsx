'use client';

import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';

import { TABLE_DATA, TABLE_HEADERS, TableData } from './table.config';

const tableThVariants = tv({
  base: 'bg-gray-100 p-2',
});

const tableTdVariants = tv({
  slots: {
    root: 'p-2',
    inner: '',
  },
  variants: {
    clamp: {
      none: {
        inner: '',
      },
      one: {
        inner: 'line-clamp-1',
      },
      two: {
        inner: 'line-clamp-2',
      },
    },
  },
  defaultVariants: {
    clamp: 'none',
  },
});

const tableData = [
  {
    id: 1,
    label: '幅指定のみ',
    text: '内容は折り返す'.repeat(10),
    clamp: 'none',
    width: 'w-[400px]',
  },
  {
    id: 2,
    label: '幅指定 + 1行まで',
    text: '内容は省略される'.repeat(10),
    clamp: 'one',
    width: 'w-[700px]',
  },
  {
    id: 3,
    label: '幅指定 + 2行まで',
    text: '内容は省略される'.repeat(20),
    clamp: 'two',
    width: 'w-[800px]',
  },
] as const;

const arr = [...new Array(10)];

export const SampleTable = () => {
  const [data, setData] = useState<TableData[]>([]);

  const { root: tableTdRootVariants, inner: tableTdInnerVariants } = tableTdVariants();

  useEffect(() => {
    setTimeout(() => {
      setData(TABLE_DATA());
    }, 1000);
  }, []);

  return (
    <div className='relative w-full overflow-y-auto'>
      <table className='relative min-w-full table-fixed'>
        <thead className=''>
          <tr className='sticky top-0 z-1'>
            {tableData.map((item) => (
              <th key={item.id} className={tableThVariants({ className: item.width })}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arr.map((_, index) => (
            <tr key={index}>
              {tableData.map((item) => (
                <td key={item.id} className={tableTdRootVariants({ className: item.width })}>
                  <div
                    className={tableTdInnerVariants({ clamp: item.clamp, className: item.width })}
                  >
                    <div>{item.text}</div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
