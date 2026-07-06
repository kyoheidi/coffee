// apps/web/app/brew/[slug]/page.tsx
'use client';

export default function BrewPage({ params }: { params: { slug: string } }) {
  // ここでステップごとのタイマー・アニメーションを実装していく
  return (
    <main>
      <h1>抽出ガイド: {params.slug}</h1>
    </main>
  );
}
