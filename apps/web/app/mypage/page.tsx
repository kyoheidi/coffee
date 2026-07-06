// apps/web/app/mypage/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type LogEntry = {
  id: string;
  comment: string;
  rating: number;
};

export default function MyPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    supabase
      .from('user_logs')
      .select('*')
      .then(({ data }: { data: LogEntry[] | null }) => setLogs(data ?? []));
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#FEFCFA',
        color: '#1E1712',
        fontFamily: '"Zen Kaku Gothic New", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        padding: '48px 20px 80px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: -40,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(30, 103, 210, 0.18)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: -20,
          width: 180,
          height: 180,
          borderRadius: 24,
          background: 'rgba(239, 83, 80, 0.18)',
          transform: 'rotate(12deg)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(255, 202, 40, 0.18)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          right: 80,
          width: 120,
          height: 120,
          borderRadius: 16,
          background: 'rgba(76, 175, 80, 0.2)',
          transform: 'rotate(-18deg)',
          mixBlendMode: 'screen',
        }}
      />

      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 32 }}>
          <div style={{ maxWidth: 720, padding: '12px 0' }}>
            <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6E8B6B', fontWeight: 700 }}>
              ROBERT DELAUNAY
            </p>
            <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.05, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>
              白の余白に、<br />
              鮮やかな色が響く。
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, alignItems: 'start' }}>
            <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 28px 60px rgba(30,23,18,0.08)', padding: 32, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -26, left: -28, width: 110, height: 110, borderRadius: '50%', background: 'rgba(25, 103, 210, 0.18)' }} />
              <div style={{ position: 'absolute', top: 20, right: 26, width: 72, height: 72, borderRadius: 24, background: 'rgba(244, 67, 54, 0.18)' }} />
              <h2 style={{ margin: 0, fontSize: 24, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>抽象的なコーヒー体験</h2>
              <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.85, color: '#4A3A31' }}>
                白一色の背景をベースに、ポップな色と丸みのある形でページを構成。コーヒーの香りや時間の流れを、視覚的なリズムとして伝えます。
              </p>
            </div>

            <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 28px 60px rgba(30,23,18,0.08)', padding: 30, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 18, left: 16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255, 202, 40, 0.24)' }} />
              <div style={{ position: 'absolute', bottom: 20, right: 18, width: 100, height: 100, borderRadius: 24, background: 'rgba(76, 175, 80, 0.16)' }} />
              <h2 style={{ margin: 0, fontSize: 24, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>色の余白</h2>
              <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.85, color: '#4A3A31' }}>
                Delaunay のように、色を点や面として散りばめることで視線の動きをつくります。背景の余白が、鮮やかな色の響きを際立たせます。
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 24 }}>
            <div style={{ borderRadius: 34, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 28px 56px rgba(30,23,18,0.08)', overflow: 'hidden' }}>
              <div style={{ padding: 34 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#1976D2' }} />
                  <h2 style={{ margin: 0, fontSize: 26, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif' }}>記録のパネル</h2>
                </div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: '#4A3A31' }}>
                  あなたのコーヒーノートを、色彩パネルのように見せる。ひとつひとつの体験が、丸や四角のリズムとして並ぶデザインです。
                </p>
              </div>
              <div style={{ padding: '0 34px 34px', display: 'grid', gap: 16 }}>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <article key={log.id} style={{ display: 'grid', gap: 10, padding: 22, borderRadius: 28, background: '#FEFCF9', border: '1px solid rgba(30,23,18,0.06)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1E1712' }}>Experience</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {Array.from({ length: log.rating }).map((_, index) => (
                            <span key={index} style={{ width: 8, height: 8, borderRadius: '50%', background: '#E53935', display: 'inline-block' }} />
                          ))}
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#4A3A31' }}>{log.comment}</p>
                    </article>
                  ))
                ) : (
                  <div style={{ padding: 24, borderRadius: 28, background: '#FFFDF6', color: '#6F5847', fontSize: 14, lineHeight: 1.8, border: '1px dashed rgba(30,23,18,0.14)' }}>
                    まだ記録がありません。コーヒーの香りや色を感じた瞬間を、ここに残してみましょう。
                  </div>
                )}
              </div>
            </div>

            <aside style={{ display: 'grid', gap: 20 }}>
              <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 28px 56px rgba(30,23,18,0.08)', padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, left: 18, width: 88, height: 88, borderRadius: '50%', background: 'rgba(255, 202, 40, 0.2)' }} />
                <div style={{ position: 'absolute', bottom: 18, right: 18, width: 68, height: 68, borderRadius: 16, background: 'rgba(244, 67, 54, 0.16)' }} />
                <h3 style={{ margin: 0, fontSize: 20, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif', marginBottom: 14 }}>色の言葉</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: '#4A3A31' }}>
                  白いキャンバスに、ブルー・レッド・イエローを効かせる。抽象的な色の組み合わせが、コーヒー体験をより印象的にします。
                </p>
              </div>

              <div style={{ borderRadius: 32, background: '#fff', border: '1px solid rgba(30,23,18,0.08)', boxShadow: '0 28px 56px rgba(30,23,18,0.08)', padding: 26, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 18, right: 16, width: 96, height: 96, borderRadius: 24, background: 'rgba(76, 175, 80, 0.18)' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 22, width: 68, height: 68, borderRadius: '50%', background: 'rgba(25, 103, 210, 0.16)' }} />
                <h3 style={{ margin: 0, fontSize: 20, fontFamily: '"Tiffany Medium", "Noto Sans JP", sans-serif', marginBottom: 14 }}>余白のリズム</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: '#4A3A31' }}>
                  余白を広めにとることで、色のひとつひとつがより鮮やかに見える。画面全体が心地よい調和を生みます。
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

