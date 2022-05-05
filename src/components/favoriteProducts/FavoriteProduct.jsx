import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import styled from "styled-components"
import Product from '../Product'
import './favorite.css'
import {publicRequest} from '../../apiRequest'
import { useSelector } from 'react-redux'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`

const FavoriteProduct = ()=>{
    const [products, setProducts] = useState([])
    const {isLogged} = useSelector(state=> state.user)
    useEffect(()=>{
        const getProducts = async()=>{
            const res = await publicRequest.get('/user/fetch/favorite')
            setProducts(res.data)
        }
        isLogged && getProducts()
    },[isLogged])


   return (
    <Container>
    {
        products.length > 0 ? products.map(product=>(
            <Product setProducts={setProducts} key={product._id} product={product} />
        )) : <h2 style={{margin: 'auto', fontSize: 24, opacity: 0.5}}>You dont have any favorite Product</h2>
    }
    </Container>
    )
  
}

export default FavoriteProduct