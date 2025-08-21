'use client';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useMemo, useState } from 'react';
import { useCartStore } from '@/store/cart';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function FormInner() {
  const stripe = useStripe();
  const elements = useElements();
  const items = useCartStore(s => s.items);
  const subtotal = useCartStore(s => s.subtotalCents)();
  const clearCart = useCartStore(s => s.clearCart);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: { return_url: window.location.origin + '/checkout' },
    });
    if (error) setMessage(error.message || 'Payment error');
    else { setMessage('Payment processed'); clearCart(); }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <PaymentElement options={{ layout: 'tabs', paymentMethodOrder: ['card','upi'] }} />
        <button disabled={loading} className="w-full px-6 py-3 rounded-full bg-black text-white">Pay ₹{(subtotal/100).toFixed(0)}</button>
        {message && <p className="text-sm text-black/70">{message}</p>}
      </form>
      <div>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test' }}>
          <PayPalButtons style={{ layout: "horizontal" }} createOrder={(data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: String(Math.max(1, Math.round(subtotal/100))) } }]
          })} onApprove={async (_, actions) => { await actions.order?.capture(); clearCart(); }} />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default function CheckoutForm() {
  const items = useCartStore(s => s.items);
  const subtotal = useCartStore(s => s.subtotalCents)();
  const options = useMemo(() => ({
    mode: 'payment',
    amount: subtotal,
    currency: 'inr',
  }), [subtotal]);

  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    if (subtotal <= 0) return;
    fetch('/api/checkout/intent', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency: 'INR' })
    }).then(r => r.json()).then(d => setClientSecret(d.clientSecret || ''));
  }, [subtotal, items]);

  if (subtotal <= 0) return <p>Your cart is empty.</p>;
  if (!clientSecret) return <p>Preparing checkout…</p>;

  return (
    <Elements stripe={stripePromise} options={{ ...options, clientSecret }}>
      <FormInner />
    </Elements>
  );
}


