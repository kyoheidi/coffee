// apps/web/app/products/[slug]/page.tsx
import { supabase } from '@/lib/supabase';

// ビルド時に全商品分のページを生成する
export async function generateStaticParams() {
  const { data } = await supabase.from('products').select('slug');
  return data?.map((p) => ({ slug: p.slug })) ?? [];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('*, recipes(*)')
    .eq('slug', params.slug)
    .single();

  if (!product) return <main>商品が見つかりません</main>;

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.origin_story}</p>
      {/* 購入ボタン、レシピ表示などをここに実装 */}
    </main>
  );
}
