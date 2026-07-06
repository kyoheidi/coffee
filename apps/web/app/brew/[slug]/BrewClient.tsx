'use client';
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
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '"Noto Sans JP", sans-serif', padding: '48px 20px 80px' }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 32 }}>
        <div style={{ display: 'grid', gap: 20 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
            BREW GUIDE
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
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
              <h2 style={{ margin: '12px 0 0', fontSize: 20, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>色の余韻を楽しむ</h2>
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
""