import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const asyncStripe = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ cart }) => {
    const router = useRouter();

    const handler = async () => {
        try {
            const stripe = await asyncStripe;
            const res = await fetch("/api/stripe/session", {
                methid: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cart)
            });

            const session = await res.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            console.log(result);
        }catch(error){
            console.error(error);
        }
    }

    return (
        <button onClick={handler} className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
        </button>
    )
}

export default CheckoutButton;