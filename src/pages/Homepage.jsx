import React, { useEffect } from 'react'
// import Advertisement from '../components/Advertisement'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
// import Products from '../components/Products'
import Slider from '../components/Slider'
import styled from 'styled-components'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import FavoriteProduct from '../components/favoriteProducts/FavoriteProduct'

const Title = styled.div`
    font-size: 35px;
    text-align: center;
    color: pink;
    font-weight: 500;
    margin: 8px 0;
    ${mobile({textAlign: 'center'})}
`

const Homepage = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
      }, [])

    return (
        <div style={{width: '100%', overflow: 'hidden'}}>
            {/* <Advertisement /> */}
            <Navbar />
            <Slider />
            <Title>MOST POPULAR PRODUCTS</Title>
            <Categories />
            <Title>YOUR FAVOURITE CATEGORIES</Title>
            <FavoriteProduct />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Homepage
