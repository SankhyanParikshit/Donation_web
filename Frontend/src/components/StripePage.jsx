import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('your_stripe_publishable_key_here');

export default function PaymentPage() {
    const { campaignId } = useParams();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the client secret from the server
        fetch('/api/payment/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ campaignId }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [campaignId]);

    const onPaymentSuccess = () => {
        navigate('/success');
        setTimeout(() => {
            navigate('/community');
        }, 5000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm onPaymentSuccess={onPaymentSuccess} />
                </Elements>
            )}
        </div>
    );
}
