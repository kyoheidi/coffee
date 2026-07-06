// supabase/functions/create-checkout-session/index.ts
// ブラウザから呼ばれ、Stripeの決済ページURLを返す。
// Stripeのシークレットキーはこの関数の中だけに存在する。

import Stripe from 'npm:stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});

Deno.serve(async (req) => {
  try {
    const { price_id, user_id } = await req.json();

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price_id, quantity: 1 }],
      mode: 'payment',
      success_url: `${Deno.env.get('SITE_URL')}/thanks`,
      cancel_url: `${Deno.env.get('SITE_URL')}/cart`,
      metadata: { user_id, price_id },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 400 });
  }
});
