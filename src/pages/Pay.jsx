import StripeCheckout from 'react-stripe-checkout'

function Pay() {
    const onToken = (token)=>{
        console.log(token)
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <StripeCheckout name='Jp states'
            image=''
            billingAddress
            shippingAddress
            description='Your total is $32'
            amount={2000}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE}
            >
            <button style={{
                border: 'none',
                width: 120,
                borderRadius: 5,
                padding: '20px',
                backgroundColor: 'black',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
            }}>
             Pay Now
            </button>
            </StripeCheckout>
        </div>
    )
}

export default Pay
