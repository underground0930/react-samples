export type TableHeader = {
  label: string;
  key: string;
};

export const TABLE_HEADERS: TableHeader[] = [
  {
    label: 'ID',
    key: 'id',
  },
  {
    label: '名前',
    key: 'name',
  },
  {
    label: 'メールアドレス',
    key: 'email',
  },
  {
    label: '電話番号',
    key: 'phone',
  },
  {
    label: '住所',
    key: 'address',
  },

  { label: '年齢', key: 'age' },
  { label: '性別', key: 'gender' },
  { label: '生年月日', key: 'birthday' },
  { label: 'プロフィール', key: 'profile' },
  { label: '作成日時', key: 'createdAt' },
  { label: '更新日時', key: 'updatedAt' },
] as const;

export type TableDataKey = (typeof TABLE_HEADERS)[number]['key'];

export type TableData = Record<TableDataKey, string | number>;

// 長かったり短かったりする文字列を生成する関数
const generateVariableLengthText = (
  baseText: string,
  index: number,
  shortLength: number = 5,
  longLength: number = 50,
): string => {
  const isLong = Math.random() > 0.5;
  const length = isLong ? longLength : shortLength;
  const repeatCount = Math.ceil(length / baseText.length);
  const text = baseText.repeat(repeatCount).slice(0, length);
  return `${text}${index}`;
};

// メールアドレス形式を生成
const generateEmail = (index: number): string => {
  const domains = ['example.com', 'test.co.jp', 'sample.org', 'demo.net'];
  const domain = domains[index % domains.length];
  const isLong = Math.random() > 0.5;
  const usernameLength = isLong ? 20 : 5;
  const username = `user${index}`.padEnd(usernameLength, 'x').slice(0, usernameLength);
  return `${username}@${domain}`;
};

// 電話番号形式を生成
const generatePhone = (index: number): string => {
  const isMobile = Math.random() > 0.5;
  if (isMobile) {
    // 携帯電話: 090-1234-5678
    const prefix = ['090', '080', '070'][index % 3];
    const middle = String(Math.floor(Math.random() * 9000) + 1000);
    const last = String(Math.floor(Math.random() * 9000) + 1000);
    return `${prefix}-${middle}-${last}`;
  } else {
    // 固定電話: 03-1234-5678
    const prefix = ['03', '06', '052'][index % 3];
    const middle = String(Math.floor(Math.random() * 9000) + 1000);
    const last = String(Math.floor(Math.random() * 9000) + 1000);
    return `${prefix}-${middle}-${last}`;
  }
};

// 年齢を生成（数値）
const generateAge = (): number => {
  return Math.floor(Math.random() * 60) + 20; // 20〜79歳
};

// 生年月日を生成（YYYY-MM-DD形式）
const generateBirthday = (age: number): string => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${birthYear}-${month}-${day}`;
};

export const TABLE_DATA: () => TableData[] = () => {
  return Array.from({ length: 100 }, (_, index) => {
    const age = generateAge();
    return {
      id: index,
      name: generateVariableLengthText('名前', index, 3, 30),
      email: generateEmail(index),
      phone: generatePhone(index),
      address: generateVariableLengthText('住所', index, 5, 100),
      age: age,
      gender: generateVariableLengthText('性別', index, 2, 10),
      birthday: generateBirthday(age),
      profile: generateVariableLengthText('プロフィール', index, 10, 200),
      createdAt: generateVariableLengthText('作成日時', index, 10, 30),
      updatedAt: generateVariableLengthText('更新日時', index, 10, 30),
    };
  });
};
