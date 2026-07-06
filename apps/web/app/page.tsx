// apps/web/app/page.tsx
import { supabase } from '@/lib/supabase';

const sampleProducts = [
  {
    slug: 'sample',
    name: 'ルワンダ・オレンジリズム',
    origin_story: '果実感と穏やかなコクを感じる一杯。朝の陽だまりのように、軽やかに立ち上がる香りです。',
    price: 1800,
  },
  {
    slug: 'harmony',
    name: 'ハーモニー・ブレンド',
    origin_story: '柔らかな甘みとシトラスの清涼感が重なる、穏やかな一杯。日常に寄り添う豊かな余韻を目指しました。',
    price: 2200,
  },
  {
    slug: 'noir',
    name: 'ノワール・ディープ',
    origin_story: 'ダークチョコレートの深みとスパイシーな余韻。よく眠れない夜にそっと寄り添う、しっかりとした味わいです。',
    price: 2400,
  },
];

async function getProducts() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseConfig) {
    return sampleProducts;
  }

  try {
    const { data } = await supabase.from('products').select('slug,name,origin_story,price');
    const products = (data as Array<{ slug?: string; name?: string; origin_story?: string; price?: number }> | null | undefined)
      ?.map((item) => ({
        slug: item.slug ?? 'sample',
        name: item.name ?? 'コーヒー',
        origin_story: item.origin_story ?? '香りを楽しめる一杯です。',
        price: item.price ?? 2000,
      }))
      .filter((item) => item.slug) ?? [];

    return products.length > 0 ? products : sampleProducts;
  } catch (error) {
    console.warn('Failed to load products for home page:', error);
    return sampleProducts;
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', padding: '48px 20px 80px' }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ minWidth: 260 }}>
            <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
              MEGURU COFFEE
            </p>
            <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 5vw, 70px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
              白い余白の上に、<br />
              色彩が重なるコーヒー体験。
            </h1>
          </div>
          <div style={{ width: 220, minWidth: 220, borderRadius: 28, padding: 22, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 24px 40px rgba(30,23,18,0.08)' }}>
            <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E53935', fontWeight: 700 }}>
              NOW SERVING
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.8, color: '#4A3A31' }}>
              香りを色で感じるような、3つのブレンドを揃えました。
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 52 }}>
          {products.map((product) => (
            <article key={product.slug} style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 24px 40px rgba(30,23,18,0.08)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', minHeight: 190, background: '#FEFCF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(25, 103, 210, 0.16)', position: 'absolute', top: 24, left: 24 }} />
                <div style={{ width: 90, height: 90, borderRadius: 16, background: 'rgba(244, 67, 54, 0.16)', position: 'absolute', bottom: 24, right: 24 }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E53935', margin: '0 auto 12px' }} />
                  <span style={{ color: '#6E8B6B', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Blend</span>
                </div>
              </div>
              <div style={{ padding: 28, display: 'grid', gap: 16 }}>
                <div>
                  <p style={{ margin: 0, color: '#6E8B6B', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.16em' }}>Product</p>
                  <h2 style={{ margin: '10px 0 0', fontSize: 24, fontWeight: 700, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>{product.name}</h2>
                </div>
                <p style={{ margin: 0, color: '#4A3A31', lineHeight: 1.8, minHeight: 76 }}>{product.origin_story}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div>
                    <p style={{ margin: 0, color: '#6E8B6B', fontSize: 12 }}>Price</p>
                    <p style={{ margin: '6px 0 0', fontSize: 22, fontWeight: 700 }}>¥{product.price}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href={`/products/${product.slug}`}
                      style={{ padding: '10px 18px', borderRadius: 999, border: '1px solid rgba(30,23,18,0.12)', background: '#fff', color: '#1E1712', textDecoration: 'none', fontWeight: 700 }}
                    >
                      商品を見る
                    </a>
                    <a
                      href={`/brew/${product.slug}`}
                      style={{ padding: '10px 18px', borderRadius: 999, background: '#1976D2', color: '#fff', textDecoration: 'none', fontWeight: 700 }}
                    >
                      抽出ガイド
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
