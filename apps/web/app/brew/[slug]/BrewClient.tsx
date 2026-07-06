'use client';

export default function BrewClient({ slug }: { slug: string }) {
  // ここでステップごとのタイマー・アニメーションを実装していく
  return (
    <main>
      <h1>抽出ガイド: {slug}</h1>
    </main>
  );
}