import CheckoutForm from './CheckoutForm';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return (
    <main className="container-padding py-16">
      <h1 className="text-3xl md:text-5xl mb-6">Secure Checkout</h1>
      <CheckoutForm />
    </main>
  );
}


