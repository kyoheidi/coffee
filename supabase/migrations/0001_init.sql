-- 0001_init.sql
-- meguru-coffee 初期スキーマ

-- ユーザー情報の拡張（role で顧客/管理者を判定）
create table profiles (
  id uuid primary key references auth.users(id),
  role text not null default 'customer' check (role in ('customer', 'admin')),
  display_name text,
  created_at timestamptz not null default now()
);

-- 商品（コーヒー豆）
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price integer not null,
  stripe_price_id text,
  origin_story text,
  image_url text,
  created_at timestamptz not null default now()
);

-- 抽出レシピ（商品ごとのステップ）
create table recipes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  step_number integer not null,
  title text not null,
  target_weight numeric,
  target_seconds integer,
  barista_comment text
);

-- 注文（Stripe Webhookから作成される）
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  product_id uuid references products(id),
  stripe_session_id text unique,
  amount integer,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- ユーザーの抽出・テイスティング記録
create table user_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  product_id uuid references products(id),
  brewed_at timestamptz not null default now(),
  rating integer check (rating between 1 and 5),
  comment text
);

-- 好み登録（入荷通知などに利用）
create table user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  taste_profile text,
  notify_on_restock boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============ Row Level Security ============

alter table profiles enable row level security;
alter table products enable row level security;
alter table recipes enable row level security;
alter table orders enable row level security;
alter table user_logs enable row level security;
alter table user_preferences enable row level security;

-- profiles: 本人だけ読み書き可能
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- products / recipes: 誰でも閲覧可、書き込みはadminロールのみ
create policy "products_public_read" on products for select using (true);
create policy "products_admin_insert" on products for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "products_admin_update" on products for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "recipes_public_read" on recipes for select using (true);
create policy "recipes_admin_insert" on recipes for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "recipes_admin_update" on recipes for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- orders: 本人の注文のみ閲覧可（作成はEdge Functionがservice_roleで行う）
create policy "orders_select_own" on orders for select using (auth.uid() = user_id);

-- user_logs: 本人のログのみ読み書き可
create policy "user_logs_all_own" on user_logs for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- user_preferences: 本人の設定のみ読み書き可
create policy "user_preferences_all_own" on user_preferences for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
