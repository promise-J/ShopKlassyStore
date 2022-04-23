import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"

const Container = styled.div`
    margin: 20px;
    height: 50vh;
    position: relative;
    width: 40%;
    ${tablet({width: '90%', margin: '30px auto'})}
    ${mobile({margin: '15px'})}
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    background: rgba(225, 225, 225, 0.5);
    padding: 5px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    backgrond: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({category}) => {

    const [cat, setCat] = useState('')

    const generateNumber = (input)=>{
        const value = Math.floor(Math.random() * input)
        return value
    }

    useEffect(()=>{
        setCat(category.categories[(generateNumber(category.categories.length))])
    },[category])


    return (
        <Container>
            <Link to={`/products/${cat.trim()}`}>
            <Image src={category.img} />
            <Info>
                <Title>{category.title}</Title>
                <p style={{color: "black", margin: '10px', background: 'white', padding: 10, opacity: 0.5}}>Category: {cat}</p>
                <Button>SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
