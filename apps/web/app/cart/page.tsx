export default function CartPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FEFCFA', color: '#1E1712', fontFamily: '"Noto Sans JP", sans-serif', padding: '48px 20px' }}>
      <section style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
            CART
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
            カートを確認する
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: '#4A3A31' }}>
            カートに移動するには各商品ページから購入手続きに進んでください。商品一覧へ戻って、もう一度お選びください。
          </p>
        </div>

        <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 24px 50px rgba(30,23,18,0.08)', padding: 28, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 18, color: '#4A3A31', lineHeight: 1.8 }}>
            このページではまだ商品を選択していません。
          </p>
          <a href="/" style={{ display: 'inline-flex', marginTop: 24, padding: '14px 22px', borderRadius: 999, background: '#1976D2', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
            商品一覧に戻る
          </a>
        </div>
      </section>
    </main>
  );
}
""