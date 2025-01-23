
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment({
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            console.error(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
            <CardElement />
            <button type="submit" className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Pay
            </button>
        </form>
    );
}
