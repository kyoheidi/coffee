// apps/web/app/products/[slug]/page.tsx
import { supabase } from '@/lib/supabase';

const sampleProducts = [
  {
    slug: 'sample',
    name: 'ルワンダ・オレンジリズム',
    origin_story: '果実感と穏やかなコクを感じる一杯。朝の陽だまりのように、軽やかに立ち上がる香りです。',
    details: '柑橘香とフローラルな余韻が混ざり合い、軽やかな後味が続きます。',
    price: 1800,
    recipe: ['豆量 18g', '湯温 92°C', '抽出時間 2分30秒', '湯量 270ml'],
  },
  {
    slug: 'harmony',
    name: 'ハーモニー・ブレンド',
    origin_story: '柔らかな甘みとシトラスの清涼感が重なる、穏やかな一杯。日常に寄り添う豊かな余韻を目指しました。',
    details: 'ミルクチョコとオレンジピールのようなバランスが特徴です。',
    price: 2200,
    recipe: ['豆量 20g', '湯温 90°C', '抽出時間 2分45秒', '湯量 300ml'],
  },
  {
    slug: 'noir',
    name: 'ノワール・ディープ',
    origin_story: 'ダークチョコレートの深みとスパイシーな余韻。よく眠れない夜にそっと寄り添う、しっかりとした味わいです。',
    details: 'ビターな果実感とスモーキーさが調和します。',
    price: 2400,
    recipe: ['豆量 20g', '湯温 94°C', '抽出時間 2分15秒', '湯量 260ml'],
  },
];

export const dynamicParams = false;

// ビルド時に全商品分のページを生成する
export async function generateStaticParams() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseConfig) {
    return sampleProducts.map((product) => ({ slug: product.slug }));
  }

  try {
    const { data } = await supabase.from('products').select('slug');
    const slugs = (data as Array<{ slug?: string }> | null | undefined)
      ?.map((p) => p.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? [];
    return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : sampleProducts.map((product) => ({ slug: product.slug }));
  } catch (error) {
    console.warn('Failed to generate static params for product page:', error);
    return sampleProducts.map((product) => ({ slug: product.slug }));
  }
}

function getSampleProduct(slug: string) {
  return sampleProducts.find((item) => item.slug === slug);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let product = getSampleProduct(params.slug);

  if (hasSupabaseConfig) {
    try {
      const { data } = await supabase
        .from('products')
        .select('*, recipes(*)')
        .eq('slug', params.slug)
        .single();

      if (data) {
        product = {
          slug: data.slug,
          name: data.name,
          origin_story: data.origin_story,
          details: data.details ?? data.origin_story ?? '',
          price: data.price ?? 2000,
          recipe: data.recipes?.map((recipe: any) => recipe.step) ?? ['豆量 18g', '湯温 92°C', '抽出時間 2分30秒', '湯量 270ml'],
        };
      }
    } catch (error) {
      console.warn('Failed to load product detail:', error);
    }
  }

  if (!product) {
    return (
      <main style={{ minHeight: '100vh', background: '#FEFCFA', padding: '64px 20px', color: '#1E1712', fontFamily: '"Noto Sans JP", sans-serif' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 28, border: '1px solid rgba(30,23,18,0.08)' }}>
          <h1 style={{ margin: 0, fontSize: 32, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>商品が見つかりません</h1>
          <p style={{ margin: '24px 0 0', lineHeight: 1.8 }}>トップページに戻って別の商品をお選びください。</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', padding: '48px 20px 80px', color: '#1E1712', fontFamily: '"Noto Sans JP", sans-serif' }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 32 }}>
        <div style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 660 }}>
            <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
              PRODUCT DETAIL
            </p>
            <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
              {product.name}
            </h1>
            <p style={{ margin: 0, color: '#4A3A31', lineHeight: 1.8, fontSize: 16 }}>{product.origin_story}</p>
          </div>

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 0.9fr', alignItems: 'start' }}>
            <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', padding: 28, boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
              <p style={{ margin: 0, fontSize: 12, color: '#6E8B6B', textTransform: 'uppercase', letterSpacing: '0.18em' }}>特徴</p>
              <h2 style={{ margin: '12px 0 0', fontSize: 24, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>深みのある印象</h2>
              <p style={{ margin: '16px 0 0', color: '#4A3A31', lineHeight: 1.8 }}>{product.details}</p>
            </div>

            <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', padding: 28, boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
              <p style={{ margin: 0, fontSize: 12, color: '#6E8B6B', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Price</p>
              <p style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 700 }}>¥{product.price}</p>
              <a
                  href={`/cart/${product.slug}`}
              >
                カートに追加
              </a>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1.3fr 0.7fr' }}>
          <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', padding: 28, boxShadow: '0 24px 50px rgba(30,23,18,0.08)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 28, left: 28, width: 84, height: 84, borderRadius: '50%', background: 'rgba(255, 202, 40, 0.18)' }} />
            <h3 style={{ margin: 0, fontSize: 22, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>おすすめのレシピ</h3>
            <div style={{ marginTop: 20, display: 'grid', gap: 14 }}>
              {product.recipe?.map((step, index) => (
                <div key={step} style={{ padding: 18, borderRadius: 22, background: '#FEFCF9', border: '1px solid rgba(30,23,18,0.06)' }}>
                  <div style={{ fontSize: 13, color: '#6E8B6B', fontWeight: 700 }}>STEP {index + 1}</div>
                  <p style={{ margin: '8px 0 0', fontSize: 15, color: '#4A3A31' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <aside style={{ display: 'grid', gap: 20 }}>
            <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', padding: 28, boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
              <p style={{ margin: 0, fontSize: 12, color: '#6E8B6B', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Brew Guide</p>
              <h4 style={{ margin: '10px 0 0', fontSize: 18, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>抽出ガイドで味を深める</h4>
              <p style={{ margin: '16px 0 0', color: '#4A3A31', lineHeight: 1.8 }}>プロの抽出を参考に、味わいの輪郭をよりはっきりとさせるためのステップです。</p>
              <a
                href={`/brew/${product.slug}`}
                style={{ display: 'inline-flex', marginTop: 22, padding: '12px 18px', borderRadius: 999, background: '#E53935', color: '#fff', textDecoration: 'none', fontWeight: 700 }}
              >
                抽出ガイドを見る
              </a>
            </div>
            <div style={{ borderRadius: 32, background: '#FEFCF9', border: '1px solid rgba(30,23,18,0.08)', padding: 24, boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
              <p style={{ margin: 0, fontSize: 12, color: '#6E8B6B', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Tasting note</p>
              <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.8, color: '#4A3A31' }}>この一杯は、色と香りが重なり合うような余韻を大切にしています。ぜひゆったりとお楽しみください。</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
