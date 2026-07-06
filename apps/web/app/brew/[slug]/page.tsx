import { supabase } from '@/lib/supabase';
import BrewClient from './BrewClient';

const sampleSlugs = ['sample', 'harmony', 'noir'] as const;

export const dynamicParams = false;

// ビルド時に、どのslugのページを作るかをここで教える
export async function generateStaticParams() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseConfig) {
    return sampleSlugs.map((slug) => ({ slug }));
  }

  try {
    const { data } = await supabase.from('products').select('slug');
    const slugs = (data as Array<{ slug?: string }> | null | undefined)
      ?.map((p) => p.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? [];
    return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : sampleSlugs.map((slug) => ({ slug }));
  } catch (error) {
    console.warn('Failed to generate static params for brew page:', error);
    return sampleSlugs.map((slug) => ({ slug }));
  }
}

export default function BrewPage({ params }: { params: { slug: string } }) {
  return <BrewClient slug={params.slug} />;
}