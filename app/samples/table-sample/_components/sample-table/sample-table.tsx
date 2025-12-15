'use client';

import { useEffect, useState } from 'react';

import {
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from '@/components/ui/table';

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
    <TableWrapper height='h-[500px]'>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadData.map((item) => (
              <TableHeadCell key={item.id} width={item.width}>
                {item.label}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, x) => (
            <TableRow key={x}>
              {row.map((item, y) => (
                <TableCell
                  key={item.id}
                  width={tableHeadData[y].width}
                  clamp={tableHeadData[y].clamp}
                >
                  {item.text}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};
