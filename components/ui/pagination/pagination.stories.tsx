import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Pagination, PaginationIndicator } from './pagination';

// Paginationラッパーコンポーネント
const PaginationWrapper = (args: Omit<Parameters<typeof Pagination>[0], 'onPageChange'>) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex justify-center p-8'>
      <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

// PaginationIndicatorラッパーコンポーネント
const PaginationIndicatorWrapper = (
  args: Omit<Parameters<typeof PaginationIndicator>[0], 'onPerPageChange'>,
) => {
  const [perPage, setPerPage] = useState(args.perPage || 100);
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className='flex justify-center p-8'>
      <PaginationIndicator
        {...args}
        currentPage={currentPage}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

// 統合例のラッパー
const CombinedWrapper = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [perPage, setPerPage] = useState(100);
  const totalItems = 2253;
  const totalPages = 23;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className='space-y-4 p-8'>
      <div className='flex justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className='flex justify-end'>
        <PaginationIndicator
          currentPage={currentPage}
          totalItems={totalItems}
          perPage={perPage}
          onPerPageChange={handlePerPageChange}
        />
      </div>
    </div>
  );
};

const paginationMeta = {
  title: 'UI/Pagination',
  component: PaginationWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ページネーション機能を提供するコンポーネント。サーバーサイドページネーションに対応し、1ベースのページ番号を使用します。',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '現在のページ番号（1ベース）',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '総ページ数',
    },
    loading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
    showFirstLast: {
      control: 'boolean',
      description: '先頭・最後ページへのナビゲーションを表示するか',
    },
  },
} satisfies Meta<typeof PaginationWrapper>;

export default paginationMeta;
type PaginationStory = StoryObj<typeof paginationMeta>;

// 基本
export const Default: PaginationStory = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

// 多くのページ（省略表示）
export const ManyPages: PaginationStory = {
  args: {
    currentPage: 10,
    totalPages: 50,
  },
};

// 先頭・最後ボタンなし
export const WithoutFirstLast: PaginationStory = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: false,
  },
};

// ローディング状態
export const Loading: PaginationStory = {
  args: {
    currentPage: 2,
    totalPages: 23,
    loading: true,
  },
};

// PaginationIndicatorのストーリー
const indicatorMeta = {
  title: 'UI/Pagination/PaginationIndicator',
  component: PaginationIndicatorWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ページネーションの件数情報と表示件数選択を提供するコンポーネント。Paginationコンポーネントとは独立して配置できます。',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '現在のページ番号（1ベース）',
    },
    totalItems: {
      control: { type: 'number', min: 0 },
      description: '総アイテム数',
    },
    perPage: {
      control: { type: 'number', min: 1 },
      description: '1ページあたりの表示件数',
    },
    loading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
  },
} satisfies Meta<typeof PaginationIndicatorWrapper>;

export const IndicatorDefault: StoryObj<typeof indicatorMeta> = {
  args: {
    currentPage: 2,
    totalItems: 2253,
    perPage: 100,
  },
  render: (args) => <PaginationIndicatorWrapper {...args} />,
};

export const IndicatorLoading: StoryObj<typeof indicatorMeta> = {
  args: {
    currentPage: 2,
    totalItems: 2000,
    perPage: 100,
    loading: true,
  },
};

// 統合例
const combinedMeta = {
  title: 'UI/Pagination/Combined',
  component: CombinedWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'PaginationとPaginationIndicatorを別々の場所に配置した例',
      },
    },
  },
} satisfies Meta<typeof CombinedWrapper>;

export const Combined: StoryObj<typeof combinedMeta> = {
  render: () => <CombinedWrapper />,
};
