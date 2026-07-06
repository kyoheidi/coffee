// supabase/functions/stripe-webhook/index.ts
// Stripeから「決済完了」の通知を受け取り、ordersテーブルに記録する。
// ordersへの書き込みはここ（service_role権限）からのみ行う想定。

import Stripe from 'npm:stripe';
import { createClient } from 'npm:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!;
  const body = await req.text();

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    await supabase.from('orders').insert({
      user_id: session.metadata?.user_id,
      stripe_session_id: session.id,
      amount: session.amount_total,
      status: 'paid',
    });
  }

  return new Response('ok');
});
