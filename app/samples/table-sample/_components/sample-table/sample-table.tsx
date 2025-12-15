'use client';

import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/libs/cn';

const tableHeadData: TableHeadType[] = [
  {
    id: 1,
    label: '幅指定のみ',
    clamp: '',
    width: 'w-[500px]',
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
];

type TableHeadType = {
  id: number;
  label: string;
  clamp: string;
  width: string;
};

const arrayData = [...new Array(20)].map((_, index) => {
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

type TableDataType = {
  id: number;
  text: string;
};

export const SampleTable = () => {
  const [data, setData] = useState<TableDataType[][]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData(arrayData);
    }, 500);
  }, []);

  return (
    <div className='h-[500px] overflow-y-auto'>
      <table className='relative'>
        <thead className=''>
          <tr className='sticky top-0 z-1'>
            {tableHeadData.map((item) => (
              <th key={item.id}>
                <div className={cn('px-2', item.width)}>
                  <div className='bg-gray-100 py-2'>{item.label}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, x) => (
            <tr key={x}>
              {row.map((item, y) => (
                <td key={item.id}>
                  <div className={tableHeadData[y].width}>
                    <div className='p-2'>
                      <div className={cn(tableHeadData[y].clamp)}>{item.text}</div>
                    </div>
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
