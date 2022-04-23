// import { Add, Remove } from "@material-ui/icons"
import styled from "styled-components"
// import Advertisement from "../components/Advertisement"
import Footer from "../components/Footer"
import CartProduct from "../components/CartProduct"
import Navbar from "../components/Navbar"
import { mobile, tablet } from "../responsive"
import { Link, useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { publicRequest } from "../apiRequest"

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    ${mobile({flexDirection: 'column'})}
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=> props.type !== 'filled' ? '1px solid #eee' : 'none'};
    background: ${props=> props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props=> props.type === 'filled' && 'white'};
    ${mobile({margin: '15px 0', padding: '5px'})}
    outline: none;
`

const TopTexts = styled.div`
    ${mobile({display: 'flex', justifyContent: 'space-between'})}
`
const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${tablet({flexDirection: 'column'})}
    ${mobile({flexDirection: 'column'})}
`

const Info = styled.div`
    flex: 3;
`

const Hr = styled.hr`
background: #eee
border: none;
height: 1px;
margin: 20px 0;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 60vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === 'total' && "500"};
    font-size: ${props=> props.type === 'total' && "24px"}
`
const SummaryItemText = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background: black;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
`


const Cart = () => {
    const cart = useSelector(state=> state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()
    console.log(cart)

    useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await publicRequest.post("/payment", {
              tokenId: stripeToken.id,
              amount: 500,
            });
            navigate("/success", {
              state: {
                  stripeData: res.data,
                  products: cart
              }, });
          } catch {}
        };
        stripeToken && makeRequest();
      }, [stripeToken, cart, navigate]);

    const onToken = (token)=>{
       setStripeToken(token)
    }

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <Link className="link" to='/'><TopButton>CONTINUE SHOPPING</TopButton></Link>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type='filled'>CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        { cart.products.length >= 1 ?
                            cart.products.map((product, idx)=>(
                                <CartProduct product={product} key={product._id + idx} />
                            )) : <h1>You don't have any item in your cart</h1>
                        }
                      
                        <Hr />
                      
                    </Info>
                    <Summary>
                        {cart.products.length > 0 ?
                        <>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemText>$ {(cart.total).toFixed(2)}</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemText>$ 5.4</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemText>$ -5.94</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemText>$ {cart.total.toFixed(2)}</SummaryItemText>
                        </SummaryItem>
                        <StripeCheckout
                          name='Promise Shopping'
                          image='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png'
                          billingAddress
                          shippingAddress
                          description={`Your total is $${cart.total}`}
                          amount={cart.total * 100}
                          token={onToken}
                          stripeKey={KEY}
                        >
                        <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                        </> : <h2>Cart is empty</h2>
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
