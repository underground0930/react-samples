'use client';

import Link from 'next/link';

export const PageContent = () => {
  return (
    <div className='p-3'>
      <h1>Samples</h1>
      <ul>
        <li>
          <Link href='/samples/table-sample'>Table Sample</Link>
        </li>
      </ul>
    </div>
  );
};
