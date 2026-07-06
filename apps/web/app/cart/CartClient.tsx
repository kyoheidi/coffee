'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

const sampleProducts = [
  {
    slug: 'sample',
    name: 'ルワンダ・オレンジリズム',
    price: 1800,
    summary: '果実感と穏やかなコクを感じる一杯。',
  },
  {
    slug: 'harmony',
    name: 'ハーモニー・ブレンド',
    price: 2200,
    summary: '柔らかな甘みとシトラスの清涼感が重なるブレンド。',
  },
  {
    slug: 'noir',
    name: 'ノワール・ディープ',
    price: 2400,
    summary: 'ダークチョコレートの深みとスパイスの余韻を楽しむ一杯。',
  },
];

function getProduct(slug: string | null) {
  return sampleProducts.find((item) => item.slug === slug) ?? null;
}

export default function CartClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const product = useMemo(() => getProduct(slug), [slug]);

  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '"Noto Sans JP", sans-serif', padding: '48px 20px' }}>
      <section style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
            CART
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
            ご注文内容の確認
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: '#4A3A31' }}>
            購入したい商品を確認し、支払いに進んでください。抽出ガイドにもすぐ戻れます。
          </p>
        </div>

        {product ? (
          <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 24px 50px rgba(30,23,18,0.08)', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#6E8B6B', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Item</p>
                <h2 style={{ margin: '10px 0 0', fontSize: 26, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>{product.name}</h2>
                <p style={{ margin: '10px 0 0', color: '#4A3A31', lineHeight: 1.8 }}>{product.summary}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                <span style={{ fontSize: 14, color: '#6E8B6B' }}>Price</span>
                <strong style={{ fontSize: 32, color: '#E53935' }}>¥{product.price}</strong>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
              <a
                href="/thanks"
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px 22px',
                  borderRadius: 999,
                  border: 'none',
                  background: '#1976D2',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                ご購入手続きへ
              </a>
              <a href={`/brew/${product.slug}`} style={{ display: 'inline-flex', justifyContent: 'center', padding: '14px 22px', borderRadius: 999, border: '1px solid rgba(30,23,18,0.12)', background: '#fff', color: '#1E1712', textDecoration: 'none', fontWeight: 700 }}>
                抽出ガイドに戻る
              </a>
            </div>
          </div>
        ) : (
          <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 24px 50px rgba(30,23,18,0.08)', padding: 28, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: 16, color: '#4A3A31', lineHeight: 1.8 }}>
              カートに商品がありません。トップページから商品をお選びください。
            </p>
            <a href="/" style={{ display: 'inline-flex', marginTop: 24, padding: '14px 22px', borderRadius: 999, background: '#1976D2', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
              トップへ戻る
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
