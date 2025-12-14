'use client';

import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/libs/cn';

import { TABLE_DATA, TABLE_HEADERS, TableData } from './table.config';

const tableData = [
  {
    id: 1,
    label: '幅指定のみ',
    clamp: '',
    width: 'w-[400px]',
  },
  {
    id: 2,
    label: '幅指定 + 1行まで',
    clamp: 'line-clamp-1',
    width: 'w-[700px]',
  },
  {
    id: 3,
    label: '幅指定 + 2行まで',
    clamp: 'line-clamp-2',
    width: 'w-[800px]',
  },
] as const;

const arr = [...new Array(10)].map((_, index) => {
  return [
    {
      id: 1,
      text: index % 2 === 0 ? '内容は折り返す'.repeat(10) : '内容は折り返す',
    },
    {
      id: 2,
      text: '幅指定 + 1行まで'.repeat(20),
    },
    {
      id: 3,
      text: '幅指定 + 2行まで'.repeat(20),
    },
  ];
});

export const SampleTable = () => {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData(TABLE_DATA());
    }, 1000);
  }, []);

  return (
    <table className='relative overflow-y-auto'>
      <thead className=''>
        <tr className='sticky top-0 z-1'>
          {tableData.map((item) => (
            <th key={item.id} className={cn('bg-gray-100 p-2', item.width)}>
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {arr.map((row, x) => (
          <tr key={x}>
            {row.map((item, y) => (
              <td key={item.id}>
                <div className={tableData[y].width}>
                  <div className='p-2'>
                    <div className={cn(tableData[y].clamp)}>{item.text}</div>
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
