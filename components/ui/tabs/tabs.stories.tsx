import type { Meta } from '@storybook/nextjs-vite';
import { Home, Activity, Mail, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

// 基本的な使用例
export const Default = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>タブ1</TabsTrigger>
        <TabsTrigger value='tab2'>タブ2</TabsTrigger>
        <TabsTrigger value='tab3'>タブ3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='p-4'>タブ1のコンテンツ</div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='p-4'>タブ2のコンテンツ</div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='p-4'>タブ3のコンテンツ</div>
      </TabsContent>
    </Tabs>
  ),
};

// アイコン付き
export const WithIcons = {
  render: () => (
    <Tabs defaultValue='basic' className='w-[500px]'>
      <TabsList>
        <TabsTrigger value='basic' icon={<Home className='size-4' />}>
          基本
        </TabsTrigger>
        <TabsTrigger value='activity' icon={<Activity className='size-4' />}>
          アクティビティ
        </TabsTrigger>
        <TabsTrigger value='scout' icon={<Mail className='size-4' />}>
          スカウト
        </TabsTrigger>
        <TabsTrigger value='ai' icon={<Sparkles className='size-4' />}>
          AI判定
        </TabsTrigger>
      </TabsList>
      <TabsContent value='basic'>
        <div className='p-4'>基本情報のコンテンツ</div>
      </TabsContent>
      <TabsContent value='activity'>
        <div className='p-4'>アクティビティのコンテンツ</div>
      </TabsContent>
      <TabsContent value='scout'>
        <div className='p-4'>スカウトのコンテンツ</div>
      </TabsContent>
      <TabsContent value='ai'>
        <div className='p-4'>AI判定のコンテンツ</div>
      </TabsContent>
    </Tabs>
  ),
};

// Controlled（外部でstate管理）
export const Controlled = {
  render: () => {
    const [value, setValue] = useState('tab1');

    return (
      <div className='w-[400px]'>
        <p className='mb-4 text-sm text-gray-500'>
          現在のタブ: <span className='font-bold'>{value}</span>
        </p>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value='tab1'>タブ1</TabsTrigger>
            <TabsTrigger value='tab2'>タブ2</TabsTrigger>
            <TabsTrigger value='tab3'>タブ3</TabsTrigger>
          </TabsList>
          <TabsContent value='tab1'>
            <div className='p-4'>タブ1のコンテンツ（Controlled）</div>
          </TabsContent>
          <TabsContent value='tab2'>
            <div className='p-4'>タブ2のコンテンツ（Controlled）</div>
          </TabsContent>
          <TabsContent value='tab3'>
            <div className='p-4'>タブ3のコンテンツ（Controlled）</div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

// 無効化されたタブ
export const Disabled = {
  render: () => (
    <Tabs defaultValue='tab1' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='tab1'>有効なタブ</TabsTrigger>
        <TabsTrigger value='tab2' disabled>
          無効なタブ
        </TabsTrigger>
        <TabsTrigger value='tab3'>有効なタブ</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='p-4'>タブ1のコンテンツ</div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='p-4'>タブ2のコンテンツ（表示されない）</div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='p-4'>タブ3のコンテンツ</div>
      </TabsContent>
    </Tabs>
  ),
};

// 長いコンテンツ
export const WithRichContent = {
  render: () => (
    <Tabs defaultValue='overview' className='w-[600px]'>
      <TabsList>
        <TabsTrigger value='overview' icon={<Home className='size-4' />}>
          概要
        </TabsTrigger>
        <TabsTrigger value='history' icon={<Activity className='size-4' />}>
          履歴
        </TabsTrigger>
        <TabsTrigger value='settings' icon={<Mail className='size-4' />}>
          設定
        </TabsTrigger>
      </TabsList>
      <TabsContent value='overview'>
        <div className='space-y-4 p-4'>
          <h3 className='text-lg font-bold'>候補者概要</h3>
          <p className='text-gray-600'>
            この候補者は3年以上のフロントエンド開発経験を持っています。
            React、TypeScript、Next.jsに精通しており、チームでの協業経験も豊富です。
          </p>
          <div className='flex flex-wrap gap-2'>
            {['React', 'TypeScript', 'Next.js', 'Tailwind CSS'].map((skill) => (
              <span key={skill} className='rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600'>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value='history'>
        <div className='space-y-4 p-4'>
          <h3 className='text-lg font-bold'>活動履歴</h3>
          <ul className='space-y-2'>
            {[
              { date: '2024/01/15', action: 'スカウト送信' },
              { date: '2024/01/18', action: '返信受信' },
              { date: '2024/01/20', action: '面談設定' },
            ].map((item) => (
              <li key={item.date} className='flex items-center gap-4 text-sm'>
                <span className='text-gray-500'>{item.date}</span>
                <span>{item.action}</span>
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>
      <TabsContent value='settings'>
        <div className='space-y-4 p-4'>
          <h3 className='text-lg font-bold'>設定</h3>
          <p className='text-gray-600'>候補者の設定はここで管理できます。</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
