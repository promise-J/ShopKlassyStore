import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"
import { publicRequest } from "../apiRequest"
import { useEffect, useState } from "react"

const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 1s ease;
    cursor: pointer;
    ${mobile({opacity: '1'})}
    ${tablet({opacity: '1'})}
`
const PriceDiv = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 120px;
    height: 50px;
    opacity: 0;
    transition: 1.4s ease all;
    ${mobile({opacity: '1'})};
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #f5fbfd;
    &:hover ${Info}{
        opacity: 1;
    }
    &:hover ${PriceDiv}{
        opacity: 1;
    }
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    transition: all 0.7s ease;
    &:hover{
        background: pink;
        color: white;
        transform: scale(1.3)
    }
`

const Image = styled.img`
    height: 75%;   
`
const PriceTag = styled.p`
    font-size: 24px;
    font-style: italic;
    font-weight: 100;
    letter-spacing: 2px;
`
const PriceSlash = styled.p`
    text-decoration: line-through;
    color: #bbb;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 14px;
`

const Product = ({product, setProducts}) => {
    const {isLogged, currentUser} = useSelector(state=> state.user)
    const navigate = useNavigate()
    const [isFav, setIsFav] = useState(false)
    const [isLoadFav, setIsLoadFav] = useState(false)

    useEffect(()=>{
        setIsFav(currentUser?.favorite?.includes(product._id) ? true : false)
    },[currentUser, product])


    const addToCart = ()=>{
        if(!isLogged){
            return navigate('/login')
        }
        navigate('/cart')
    }

    const addToFavorite = async()=>{
        setIsFav(!isFav)
        setIsLoadFav(true)
        if(setProducts){
            setProducts(products=> products.filter(pro=> pro._id !== product._id))
        }
        await publicRequest.put('/user/update/favorite', {productId: product._id})
        setIsLoadFav(false)
    }

    
    return (
        <Container>
            {/* <Circle /> */}
            <Image src={product.img}/>
            <Info>
                <Icon title="Search Product">
                    <Link style={{color: 'inherit'}} to={`/product/${product._id}`}>
                    <SearchOutlined />
                    </Link>
                </Icon>
                <Icon title="View Cart">
                    <ShoppingCartOutlined onClick={()=> addToCart()} />
                </Icon>
                <Icon title={isFav ? 'Unmark Favorite' : 'Mark Favorite'} style={{
                    background: isFav && 'pink',
                    transform: isFav && 'scale(1.3)',
                    color: isFav && 'white',
                    animate: isLoadFav && 'favAnimate 2s infinite',
                    transition: 'all 0.7s ease'
                    }} onClick={()=> addToFavorite()}>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
            <PriceDiv>
            <PriceTag>${product.price}</PriceTag>
            <PriceSlash>${Number(product.price) + Math.round(((Number(product.price) * 80)/100))}</PriceSlash>
            </PriceDiv>
        </Container>
    )
}

export default Product
