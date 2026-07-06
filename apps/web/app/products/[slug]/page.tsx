// apps/web/app/products/[slug]/page.tsx
import { supabase } from '@/lib/supabase';

export const dynamicParams = false;

// ビルド時に全商品分のページを生成する
export async function generateStaticParams() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseConfig) {
    return [{ slug: 'sample' }];
  }

  try {
    const { data } = await supabase.from('products').select('slug');
    const slugs = (data as Array<{ slug?: string }> | null | undefined)
      ?.map((p) => p.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? [];
    return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: 'sample' }];
  } catch (error) {
    console.warn('Failed to generate static params for product page:', error);
    return [{ slug: 'sample' }];
  }
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
