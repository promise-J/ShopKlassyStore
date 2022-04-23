import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { Add, Remove } from "@material-ui/icons"
import { useState } from "react"
import { publicRequest } from "../apiRequest"
import { useDispatch } from 'react-redux'
import { removeCartItem,initialiseProducts } from '../redux/cartRedux'



const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${tablet({ flexDirection: 'column' })}
    ${mobile({ flexDirection: 'column' })}
    margin: 20px;
    border-bottom: 1px solid rgb(225,225,225);
    padding: 5px;
`
const ProductDetail = styled.div`
flex: 2;
    display: flex;
`
const Image = styled.img`
width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductSize = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.color};
    border: ${props => props.color === 'white' && 'gray 1px solid'};
`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({ padding: '8px 0' })}
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    ${mobile({ marginBottom: '10px', width: '50%', justifyContent: 'space-around', fontSize: '16px' })}
`
const ProductAmount = styled.div`
font-size: 20px;
margin: 7px;
${mobile({ fontSize: '15px' })}
`
const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ fontSize: '20px' })}
`



const CartProduct = ({ product }) => {

    

    const [qty, setQty] = useState(product.quantity)
    const [done, setDone] = useState(false)
    const dispatch = useDispatch()

    const removeCart = async (id) => {
        try {
            await publicRequest.put('/user/delete/cart', { productId: id })
            dispatch(removeCartItem(product.productId))


        } catch (error) {
            console.log(error)
        }

    }

    const handleQuantity = (type) => {
        if (type === 'decrease') {
            qty > 1 && setQty(qty - 1)

            console.log(qty)
        } else {
            setQty(qty + 1)
            console.log(qty)
        }
    }

    const updateCart = async () => {
        const { quantity, ...rest } = product
        try {
            
            const res = await publicRequest.put('/user/update/cart', { ...rest, quantity: qty })
            setDone(true)
            setTimeout(() => {
                setDone(false)
            }, 2000)
           dispatch(initialiseProducts(res.data))
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Product>
            <ProductDetail>
                <Image src={product.img} />
                <Details>
                    <ProductName><b>Product: </b>{product.title}</ProductName>
                    <ProductId><b>ID  </b>{product.productId}</ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize><b>Size  </b>{product.size}</ProductSize>
                </Details>
            </ProductDetail>
            <PriceDetail>
                <ProductAmountContainer>
                    <Remove onClick={() => handleQuantity('decrease')} style={{ color: 'red', fontSize: 13, cursor: 'pointer' }} />
                    <ProductAmount>{qty}</ProductAmount>
                    <Add onClick={() => handleQuantity('increase')} style={{ color: 'green', fontSize: 13, cursor: 'pointer' }} />
                </ProductAmountContainer>
                <ProductPrice>${Math.round(product.price * qty)}</ProductPrice>
                <span onClick={() => removeCart(product.productId)} style={{ cursor: 'pointer', color: 'red', fontSize: 12, fontWeight: 600 }}>Remove</span>
                <button onClick={updateCart} style={{ margin: 5, padding: '0px 10px', outline: 'none' }}>Save</button>
                <p style={{
                    color: 'green',
                    fontSize: 11,
                    animation: '2s cartAlert linear',
                    transition: '1s all ease-in',
                    display: done ? 'block' : 'none'
                }}>Cart is saved</p>
            </PriceDetail>
        </Product>
    )
}

export default CartProduct