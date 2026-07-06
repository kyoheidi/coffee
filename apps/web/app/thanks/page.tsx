export default function ThanksPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '"Noto Sans JP", sans-serif', padding: '48px 20px' }}>
      <section style={{ maxWidth: 820, margin: '0 auto', padding: 32, borderRadius: 32, border: '1px solid rgba(30,23,18,0.08)', background: '#fff', boxShadow: '0 24px 50px rgba(30,23,18,0.08)' }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
          ORDER CONFIRMED
        </p>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
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
""