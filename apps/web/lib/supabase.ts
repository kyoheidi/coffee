// apps/web/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

class EmptySupabaseQuery {
  private readonly result = { data: [], error: null };

  select() {
    return this;
  }

  eq() {
    return this;
  }

  single() {
    return Promise.resolve({ data: null, error: null });
  }

  then<TResult1 = { data: never[]; error: null }, TResult2 = never>(
    onfulfilled?: ((value: { data: never[]; error: null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) {
    return Promise.resolve(this.result).then(onfulfilled, onrejected);
  }

  catch<TResult = never>(onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null) {
    return Promise.resolve(this.result).catch(onrejected);
  }
}

const emptySupabaseClient = {
  from() {
    return new EmptySupabaseQuery();
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : emptySupabaseClient) as any;
