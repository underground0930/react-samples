import type { Meta } from '@storybook/nextjs-vite';
import type React from 'react';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './dialog';

const positionOptions: SelectOption[] = [
  { label: 'エンジニア', value: 'engineer' },
  { label: 'デザイナー', value: 'designer' },
  { label: 'プロダクトマネージャー', value: 'pm' },
];

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-hidden-focus',
            enabled: false, // Storybookのルート要素のaria-hiddenを無視
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

// Uncontrolled（内部でstate管理、DialogTrigger使用）
export const Uncontrolled = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant='primary'>ダイアログを開く</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Uncontrolledダイアログ</DialogTitle>
        <DialogBody>
          <p>このダイアログは内部でstate管理しています。</p>
          <p>DialogTriggerを使って開閉できます。</p>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

// Controlled（外部でstate管理）
export const Controlled = {
  render: () => {
    const [open, setOpen] = useState(false);
    const handleOpenClick = fn();

    return (
      <>
        <Button
          variant='primary'
          onClick={() => {
            handleOpenClick();
            setOpen(true);
          }}
        >
          ダイアログを開く
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>Controlledダイアログ</DialogTitle>
            <DialogBody>
              <p>このダイアログは外部でstate管理しています。</p>
              <p>open/onOpenChangeプロップを使用します。</p>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

// 長いコンテンツ（スクロール）
export const LongContent = {
  render: () => {
    const [open, setOpen] = useState(false);
    const handleOpenClick = fn();
    const handleCloseClick = fn();
    const handlePreventCloseClick = fn();

    return (
      <>
        <Button
          variant='primary'
          onClick={() => {
            handleOpenClick();
            setOpen(true);
          }}
        >
          長いコンテンツを開く
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size='md'>
            <DialogTitle>長いコンテンツ</DialogTitle>
            <DialogBody>
              <div className='space-y-4'>
                <DialogClose>
                  <div className='grid gap-2'>
                    <Button
                      onClick={() => {
                        handleCloseClick();
                      }}
                    >
                      閉じる
                    </Button>
                    <Button
                      onClick={(e) => {
                        handlePreventCloseClick();
                        e.preventDefault();
                      }}
                    >
                      preventDefaultで閉じるの止める
                    </Button>
                  </div>
                </DialogClose>
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className='text-gray-700'>
                    これは長いコンテンツのテストです。セクション {i + 1}。
                    ダイアログ内のコンテンツが長い場合、自動的にスクロール可能になります。
                    画面の高さを超えた場合でも、適切に表示されることを確認しています。
                  </p>
                ))}
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

// フォームを含むダイアログ
export const WithForm = {
  render: () => {
    const [open, setOpen] = useState(false);
    const handleOpenClick = fn();
    const handleSubmit = fn();

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit();
      setOpen(false);
    };

    return (
      <>
        <Button
          variant='primary'
          onClick={() => {
            handleOpenClick();
            setOpen(true);
          }}
        >
          フォームダイアログを開く
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>候補者を追加</DialogTitle>
            <DialogBody>
              <form onSubmit={onSubmit}>
                <div className='space-y-4'>
                  <div>
                    <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-700'>
                      名前
                    </label>
                    <Input type='text' id='name' placeholder='山田 太郎' required />
                  </div>

                  <div>
                    <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-700'>
                      メールアドレス
                    </label>
                    <Input type='email' id='email' placeholder='example@example.com' required />
                  </div>

                  <div>
                    <label
                      htmlFor='position'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      応募ポジション
                    </label>
                    <Select
                      id='position'
                      options={positionOptions}
                      placeholder='選択してください'
                      required
                    />
                  </div>

                  <div className='flex justify-end gap-3 pt-4'>
                    <DialogClose>
                      <Button variant='ghost' type='button'>
                        キャンセル
                      </Button>
                    </DialogClose>
                    <Button variant='primary' type='submit'>
                      追加
                    </Button>
                  </div>
                </div>
              </form>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

// リッチコンテンツ
export const RichContent = {
  render: () => {
    const [open, setOpen] = useState(false);
    const handleOpenClick = fn();
    const handleInterviewClick = fn();

    return (
      <>
        <Button
          variant='primary'
          onClick={() => {
            handleOpenClick();
            setOpen(true);
          }}
        >
          リッチコンテンツを開く
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size='lg'>
            <DialogTitle>候補者情報</DialogTitle>
            <DialogBody>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='size-20 shrink-0 rounded-full bg-gray-200' />
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-gray-900'>山田 太郎</h3>
                    <p className='text-gray-600'>エンジニア・5年の経験</p>
                  </div>
                </div>

                <div>
                  <h4 className='mb-2 font-semibold text-gray-900'>経歴</h4>
                  <p className='text-gray-700'>
                    大手IT企業でバックエンドエンジニアとして5年間勤務。マイクロサービスアーキテクチャの設計・実装経験があり、
                    チームリーダーとして3名のメンバーをマネジメント。
                  </p>
                </div>

                <div>
                  <h4 className='mb-2 font-semibold text-gray-900'>スキル</h4>
                  <div className='flex flex-wrap gap-2'>
                    {['TypeScript', 'React', 'Next.js', 'Node.js', 'Docker', 'AWS'].map((skill) => (
                      <span
                        key={skill}
                        className='rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className='flex justify-end gap-3 border-t pt-4'>
                  <DialogClose>
                    <Button variant='ghost' type='button'>
                      閉じる
                    </Button>
                  </DialogClose>
                  <Button
                    variant='primary'
                    type='button'
                    onClick={() => {
                      handleInterviewClick();
                    }}
                  >
                    面接を設定
                  </Button>
                </div>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

// サイズバリエーション
export const Sizes = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'full' | 'xl'>('md');
    const [open, setOpen] = useState(false);
    const handleSizeClick = fn();
    const handleProcessClick = fn();

    return (
      <>
        <div className='flex gap-2'>
          {(['sm', 'md', 'lg', 'full', 'xl'] as const).map((s) => (
            <Button
              key={s}
              variant='primary'
              onClick={() => {
                handleSizeClick(s);
                setSize(s);
                setOpen(true);
              }}
            >
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size={size}>
            <DialogTitle>サイズ: {size.toUpperCase()}</DialogTitle>
            <DialogBody>
              <p className='mt-2 text-sm text-gray-500'>
                利用可能なサイズ: sm (420px), md (500px), lg (600px), full (700px), xl (1200px)
              </p>
              <p>このダイアログのサイズは {size} です。</p>
              <Button
                onClick={() => {
                  handleProcessClick();
                  setOpen(false);
                }}
              >
                処理の後に閉じる
              </Button>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
