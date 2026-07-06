# meguru-coffee

コーヒーEC「meguru」のプロジェクト一式。構成の全体像は `meguru_architecture.md`（別途共有済み）を参照。

## ディレクトリ

- `apps/web` … Next.js（静的書き出し／Cloudflare Pagesにデプロイ）
- `supabase/migrations` … DBのテーブル定義（SQL）
- `supabase/functions` … 決済・通知などのサーバー側処理（Supabase Edge Functions）

## セットアップの順番

1. このリポジトリをGitHubにpush
2. Supabaseプロジェクトを作成し、`apps/web/.env.example` を参考に `.env.local` を作成
3. `supabase/migrations/0001_init.sql` をSupabaseのSQL Editorで実行（テーブル作成）
4. Cloudflare PagesでこのリポジトリをつなぎCI/CDを設定（ビルドコマンド: `npm run build`、出力先: `apps/web/out`）
5. Stripeアカウントを作成し、鍵をSupabaseのSecretsに登録
6. `supabase functions deploy` で `supabase/functions` 配下をデプロイ

詳しい手順は都度ガイドしながら進める。
