/**
 * Pagination component
 *
 * React 19 compatible pagination component.
 * Simple and clean design with Tailwind standard colors.
 */

'use client';

import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { tv } from 'tailwind-variants';

// 1ページあたりの表示件数のオプション
export const PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;

const paginationVariants = tv({
  slots: {
    container: [
      'flex items-center justify-center gap-2 p-4',
      'data-[loading=true]:pointer-events-none data-[loading=true]:opacity-50',
    ],
    navButton: [
      'flex items-center justify-center',
      'min-h-8 min-w-8 px-2 py-1',
      'text-gray-600',
      'rounded-md',
      'hover:bg-gray-100 hover:text-gray-900',
      'disabled:cursor-not-allowed disabled:text-gray-300',
      'disabled:hover:bg-transparent disabled:hover:text-gray-300',
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
      'transition-colors',
    ],
    pageButton: [
      'flex items-center justify-center',
      'min-h-8 min-w-8 px-2 py-1',
      'text-sm font-medium',
      'text-gray-600',
      'rounded-md',
      'hover:bg-gray-100 hover:text-gray-900',
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
      'transition-colors',
    ],
    pageButtonActive: ['bg-blue-50 text-blue-600', 'hover:bg-blue-100 hover:text-blue-700'],
    ellipsis: [
      'flex items-center justify-center',
      'min-w-8 px-2 py-1',
      'text-sm font-medium',
      'text-gray-400',
    ],
  },
});

const indicatorVariants = tv({
  slots: {
    container: ['flex items-center gap-2'],
    perPageSelect: [
      'relative flex items-center justify-center gap-1',
      'border border-gray-300 bg-white',
      'rounded-md px-2 py-1',
      'text-sm font-medium',
      'text-gray-700',
      'hover:bg-gray-50',
      'transition-colors',
    ],
    rangeText: ['text-sm whitespace-nowrap text-gray-700'],
  },
});

type PaginationProps = {
  /** 現在のページ番号（1ベース） */
  currentPage: number;
  /** 総ページ数 */
  totalPages: number;
  /** ページ変更時のコールバック */
  onPageChange: (page: number) => void;
  /** ローディング状態 */
  loading?: boolean;
  /** 最初と最後の近くに表示するページ数 */
  marginPagesDisplayed?: number;
  /** 現在のページ周辺に表示するページ数 */
  pageRangeDisplayed?: number;
  /** 先頭・最後ページへのナビゲーションを表示するか */
  showFirstLast?: boolean;
} & Omit<ComponentPropsWithRef<'div'>, 'className'>;

/**
 * Paginationコンポーネント
 * ページネーション機能を提供するコンポーネント
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
  marginPagesDisplayed = 1,
  pageRangeDisplayed = 1,
  showFirstLast = true,
  ...rest
}: PaginationProps) => {
  const styles = paginationVariants();

  // ページ番号の配列を生成（メモ化）
  const pageNumbers = useMemo((): (number | 'ellipsis')[] => {
    // ページ数が0以下の場合は空配列を返す
    if (totalPages <= 0) {
      return [];
    }
    const pages: (number | 'ellipsis')[] = [];
    const totalDisplayed = marginPagesDisplayed * 2 + pageRangeDisplayed * 2 + 1;

    if (totalPages <= totalDisplayed) {
      // 全ページを表示できる場合
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 省略が必要な場合
      const leftSiblingIndex = Math.max(currentPage - pageRangeDisplayed, 1);
      const rightSiblingIndex = Math.min(currentPage + pageRangeDisplayed, totalPages);

      const shouldShowLeftEllipsis = leftSiblingIndex > marginPagesDisplayed + 1;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - marginPagesDisplayed;

      // 最初のページ
      for (let i = 1; i <= marginPagesDisplayed; i++) {
        pages.push(i);
      }

      // 左側の省略記号
      if (shouldShowLeftEllipsis) {
        pages.push('ellipsis');
      }

      // 現在のページ周辺
      const startPage = shouldShowLeftEllipsis ? leftSiblingIndex : marginPagesDisplayed + 1;
      const endPage = shouldShowRightEllipsis
        ? rightSiblingIndex
        : totalPages - marginPagesDisplayed;

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // 右側の省略記号
      if (shouldShowRightEllipsis) {
        pages.push('ellipsis');
      }

      // 最後のページ
      for (let i = totalPages - marginPagesDisplayed + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [currentPage, totalPages, marginPagesDisplayed, pageRangeDisplayed]);

  // ページ数が0以下の場合は非表示
  const showPagination = totalPages >= 1;
  if (!showPagination) {
    return null;
  }

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div {...rest} className={styles.container()} data-loading={loading}>
      {/* 先頭ページボタン */}
      {showFirstLast && (
        <button
          type='button'
          className={styles.navButton()}
          onClick={handleFirstPage}
          disabled={currentPage === 1 || loading}
          aria-label='最初のページへ'
        >
          <ChevronsLeft className='size-4' />
        </button>
      )}

      {/* 前へボタン */}
      <button
        type='button'
        className={styles.navButton()}
        onClick={handlePreviousPage}
        disabled={currentPage === 1 || loading}
        aria-label='前のページへ'
      >
        <ChevronLeft className='size-4' />
      </button>

      {/* ページ番号 */}
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <div key={`ellipsis-${index}`} className={styles.ellipsis()}>
              ...
            </div>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type='button'
            className={styles.pageButton({
              className: isActive ? styles.pageButtonActive() : '',
            })}
            onClick={() => handlePageClick(page)}
            disabled={loading}
            aria-label={isActive ? `現在のページ: ${page}` : `${page}ページに移動`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* 次へボタン */}
      <button
        type='button'
        className={styles.navButton()}
        onClick={handleNextPage}
        disabled={currentPage === totalPages || loading}
        aria-label='次のページへ'
      >
        <ChevronRight className='size-4' />
      </button>

      {/* 最後ページボタン */}
      {showFirstLast && (
        <button
          type='button'
          className={styles.navButton()}
          onClick={handleLastPage}
          disabled={currentPage === totalPages || loading}
          aria-label='最後のページへ'
        >
          <ChevronsRight className='size-4' />
        </button>
      )}
    </div>
  );
};

// ========================================
// PaginationIndicator
// ========================================

type PaginationIndicatorProps = {
  /** 現在のページ番号（1ベース） */
  currentPage: number;
  /** 総アイテム数 */
  totalItems: number;
  /** 1ページあたりの表示件数 */
  perPage: number;
  /** 表示件数変更時のコールバック */
  onPerPageChange?: (perPage: number) => void;
  /** ローディング状態 */
  loading?: boolean;
} & Omit<ComponentPropsWithRef<'div'>, 'className'>;

/**
 * PaginationIndicatorコンポーネント
 * ページネーションの件数情報と表示件数選択を提供するコンポーネント
 */
export const PaginationIndicator = ({
  currentPage,
  totalItems,
  perPage,
  onPerPageChange,
  loading = false,
  ...rest
}: PaginationIndicatorProps) => {
  const styles = indicatorVariants();

  // 表示範囲を計算
  const itemsInfo = useMemo(() => {
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);
    return {
      start: startItem.toLocaleString(),
      end: endItem.toLocaleString(),
      total: totalItems.toLocaleString(),
    };
  }, [currentPage, perPage, totalItems]);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    onPerPageChange?.(newPerPage);
  };

  return (
    <div {...rest} className={styles.container()} data-loading={loading}>
      <div className={styles.perPageSelect()}>
        <span className='pointer-events-none'>{perPage}件</span>
        <ChevronDown className='pointer-events-none size-4' />
        <select
          value={perPage}
          onChange={handlePerPageChange}
          disabled={loading}
          className='absolute inset-0 opacity-0'
          aria-label='表示件数を選択'
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}件
            </option>
          ))}
        </select>
      </div>
      <span className={styles.rangeText()}>
        {itemsInfo.start} - {itemsInfo.end} / 全{itemsInfo.total}
      </span>
    </div>
  );
};
