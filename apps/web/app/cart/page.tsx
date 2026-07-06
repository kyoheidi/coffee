export default function CartPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FBF7F0', color: '#1E1712', fontFamily: '"Zen Kaku Gothic New", sans-serif' }}>
      <section style={{ padding: '64px 24px 36px', maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B27C25', fontWeight: 700 }}>
            COFFEE EXPERIENCE
          </span>
          <span style={{ fontSize: 12, color: '#6E8B6B', fontWeight: 700 }}>体験の設計</span>
        </div>

        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1.15fr 0.85fr', alignItems: 'start' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.4, margin: '0 0 16px', fontFamily: '"Shippori Mincho", serif' }}>
              1杯のコーヒーに、<br />
              ひと息の物語を添える。
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: '#8A6A54', maxWidth: 640, margin: 0 }}>
              焙煎の深み、湯温の変化、香りの広がり。コーヒーは味覚だけでなく、時間と気分を整える体験です。<br />
              このページでは、豆の選び方から抽出の流れまで、気持ちのいい一杯をつくるための設計を見せます。
            </p>
          </div>

          <div style={{ background: '#4A2E22', color: '#FBF7F0', padding: 24, borderRadius: 24, boxShadow: '0 20px 40px rgba(30,23,18,0.16)' }}>
            <p style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D9A441', margin: '0 0 8px' }}>
              今のおすすめ
            </p>
            <h2 style={{ fontSize: 24, margin: '0 0 12px', fontFamily: '"Shippori Mincho", serif' }}>
              ルワンダ・ジンバブエ・ブレンド
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#E7DCCF', margin: '0 0 16px' }}>
              花の香りと柑橘の明るさが、濃厚なコクへと変わる、朝の気分を整える一杯です。
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontSize: 12 }}>フローラル</span>
              <span style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontSize: 12 }}>柑橘感</span>
              <span style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontSize: 12 }}>やわらかい余韻</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 24px 64px', maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {[
            {
              title: '豆の選び方',
              text: '産地の違いを感じる、焙煎のニュアンスまでを丁寧に伝える。
',
            },
            {
              title: '抽出の流れ',
              text: '湯量やタイミングを見ながら、ひとつひとつのステップを楽しく体験できるように設計する。',
            },
            {
              title: '香りの記録',
              text: '飲んだ感想を残せるようにして、次の一杯に繋げる。',
            },
            {
              title: '暮らしに馴染む',
              text: '忙しい朝でも、静かな夜でも、気分に合わせて選べる体験にする。',
            },
          ].map((item) => (
            <div key={item.title} style={{ background: '#fff', border: '1px solid rgba(30,23,18,0.08)', borderRadius: 18, padding: 20 }}>
              <h3 style={{ fontSize: 18, margin: '0 0 8px', fontFamily: '"Shippori Mincho", serif' }}>{item.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.8, color: '#8A6A54', margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}