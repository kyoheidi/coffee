// apps/web/app/admin/products/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminProductsPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(0);

  const save = async () => {
    await supabase.from('products').insert({ name, slug, price });
  };

  return (
    <main>
      <h1>商品追加（バリスタ用）</h1>
      {/* フォームUIをここに実装。保存時に save() を呼ぶ */}
    </main>
  );
}
