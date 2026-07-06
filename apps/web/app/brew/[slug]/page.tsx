import { supabase } from '@/lib/supabase';
import BrewClient from './BrewClient';

// ビルド時に、どのslugのページを作るかをここで教える
export async function generateStaticParams() {
  const { data } = await supabase.from('products').select('slug');
  return data?.map((p) => ({ slug: p.slug })) ?? [];
}

export default function BrewPage({ params }: { params: { slug: string } }) {
  return <BrewClient slug={params.slug} />;
}