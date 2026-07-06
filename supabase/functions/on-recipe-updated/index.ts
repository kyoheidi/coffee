// supabase/functions/on-recipe-updated/index.ts
// recipes / products テーブルの変更をトリガーに、Supabase Database Webhookから呼ばれる。
// Cloudflare PagesのDeploy Hook URLを叩いて、サイトの再ビルドを走らせるだけの役割。

Deno.serve(async (_req) => {
  await fetch(Deno.env.get('CLOUDFLARE_DEPLOY_HOOK_URL')!, { method: 'POST' });
  return new Response('ok');
});
