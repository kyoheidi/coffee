// apps/web/app/admin/recipes/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminRecipesPage() {
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const [targetWeight, setTargetWeight] = useState(0);
  const [targetSeconds, setTargetSeconds] = useState(0);

  const save = async () => {
    // RLSにより、role='admin' の profiles を持つユーザーだけが実際に保存できる
    await supabase.from('recipes').insert({
      product_id: productId,
      step_number: 1,
      title,
      target_weight: targetWeight,
      target_seconds: targetSeconds,
    });
  };

  return (
    <main>
      <h1>レシピ登録（バリスタ用）</h1>
      {/* フォームUIをここに実装。保存時に save() を呼ぶ */}
    </main>
  );
}
