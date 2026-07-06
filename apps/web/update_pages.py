from pathlib import Path

files = {
    Path('app/brew/[slug]/BrewClient.tsx'): """'use client';
import Link from 'next/link';

const brewGuides: Record<string, { title: string; description: string; steps: string[] }> = {
  sample: {
    title: 'ルワンダ・オレンジリズム抽出ガイド',
    description: '柑橘のフレーバーを引き出すための、やさしい流れを大切にしたレシピです。',
    steps: ['湯温 92°C で計量した豆をセット', '30秒蒸らし', '120ml をゆっくり注ぐ', '残りの湯を360ml に近づける'],
  },
  harmony: {
    title: 'ハーモニー・ブレンド抽出ガイド',
    description: '甘みと清涼感が調和するよう、湯量と時間を整えていきます。',
    steps: ['豆量 20g をセット', '40秒蒸らし', '100ml を注ぐ', '残りの湯を300ml まで注ぐ'],
  },
  noir: {
    title: 'ノワール・ディープ抽出ガイド',
    description: '深いコクを引き出すために、少し濃いめの抽出を目指します。',
    steps: ['豆量 20g をセット', '30秒蒸らし', '80ml を注ぐ', '残りの湯を260ml まで注ぐ'],
  },
};

export default function BrewClient({ slug }: { slug: string }) {
  const guide = brewGuides[slug] ?? brewGuides.sample;

  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '\"Noto Sans JP\", sans-serif', padding: '48px 20px 80px' }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 32 }}>
        <div style={{ display: 'grid', gap: 20 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
            BREW GUIDE
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontFamily: '\"Tiffany Medium\", \"Noto Sans JP\", sans-serif' }}>
            {guide.title}
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.95, color: '#4A3A31' }}>{guide.description}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: 24 }}>
          <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 24px 50px rgba(30,23,18,0.08)', padding: 32 }}>
            <div style={{ display: 'grid', gap: 18 }}>
              {guide.steps.map((step, index) => (
                <div key={step} style={{ display: 'grid', gap: 10, padding: 22, borderRadius: 26, background: '#FEFCF9', border: '1px solid rgba(30,23,18,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#6E8B6B', fontWeight: 700 }}>STEP {index + 1}</span>
                    <span style={{ fontSize: 13, color: '#E53935', fontWeight: 700 }}>抽出のリズム</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: '#4A3A31' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <aside style={{ display: 'grid', gap: 20 }}>
            <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', padding: 28, boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>EXPERIENCE</p>
              <h2 style={{ margin: '12px 0 0', fontSize: 20, fontFamily: '\"Tiffany Medium\", \"Noto Sans JP\", sans-serif' }}>色の余韻を楽しむ</h2>
              <p style={{ margin: '16px 0 0', fontSize: 15, lineHeight: 1.8, color: '#4A3A31' }}>
                抽出の時間を感じることで、コーヒーの色彩がより鮮やかになります。1つ1つのステップを、ゆったりと味わってください。
              </p>
            </div>
            <Link href={`/products/${slug}`} style={{ display: 'inline-flex', padding: '16px 22px', borderRadius: 999, background: '#1976D2', color: '#fff', textDecoration: 'none', fontWeight: 700, justifyContent: 'center' }}>
              商品ページに戻る
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
""",
    Path('app/cart/page.tsx'): """'use client';
import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

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

export default function CartPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get('slug');
  const product = useMemo(() => getProduct(slug), [slug]);

  const handleCheckout = () => {
    router.push('/thanks');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '\"Noto Sans JP\", sans-serif', padding: '48px 20px' }}>
      <section style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
            CART
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontFamily: '\"Tiffany Medium\", \"Noto Sans JP\", sans-serif' }}>
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
                <h2 style={{ margin: '10px 0 0', fontSize: 26, fontFamily: '\"Tiffany Medium\", \"Noto Sans JP\", sans-serif' }}>{product.name}</h2>
                <p style={{ margin: '10px 0 0', color: '#4A3A31', lineHeight: 1.8 }}>{product.summary}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                <span style={{ fontSize: 14, color: '#6E8B6B' }}>Price</span>
                <strong style={{ fontSize: 32, color: '#E53935' }}>¥{product.price}</strong>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
              <button
                type="button"
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  padding: '16px 22px',
                  borderRadius: 999,
                  border: 'none',
                  background: '#1976D2',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ご購入手続きへ
              </button>
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
""",
    Path('app/thanks/page.tsx'): """export default function ThanksPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '\"Noto Sans JP\", sans-serif', padding: '48px 20px' }}>
      <section style={{ maxWidth: 820, margin: '0 auto', padding: 32, borderRadius: 32, border: '1px solid rgba(30,23,18,0.08)', background: '#fff', boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
          ORDER CONFIRMED
        </p>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, fontFamily: '\"Tiffany Medium\", \"Noto Sans JP\", sans-serif' }}>
          ご注文ありがとうございます。
        </h1>
        <p style={{ margin: '24px 0 0', fontSize: 16, lineHeight: 1.8, color: '#4A3A31' }}>
          ご注文が正常に完了しました。抽出ガイドや他の豆もぜひご覧ください。次の一杯が、より豊かな体験になりますように。
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
          <a href="/" style={{ padding: '14px 22px', borderRadius: 999, background: '#1976D2', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
            トップに戻る
          </a>
          <a href="/products/sample" style={{ padding: '14px 22px', borderRadius: 999, border: '1px solid rgba(30,23,18,0.12)', background: '#fff', color: '#1E1712', textDecoration: 'none', fontWeight: 700 }}>
            他の商品を見る
          </a>
        </div>
      </section>
    </main>
  );
}
""",
}

for path, content in files.items():
    p = Path(path)
    p.write_text(content, encoding='utf-8')
    print(f'Wrote {p}')
PY