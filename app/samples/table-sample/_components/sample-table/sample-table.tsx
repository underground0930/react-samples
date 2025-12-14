'use client';

import { useEffect, useState } from 'react';

import { TABLE_DATA, TABLE_HEADERS, TableData } from './table.config';

export const SampleTable = () => {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    setData(TABLE_DATA());
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {TABLE_HEADERS.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data.id}>
            {TABLE_HEADERS.map((header) => (
              <td key={header.key}>{data[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
