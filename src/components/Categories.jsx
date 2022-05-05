import { useState, useEffect } from 'react'
import styled from "styled-components"
import { publicRequest } from '../apiRequest'
import { mobile, tablet } from "../responsive"
import CategoryItem from "./CategoryItem"
import {useSelector} from 'react-redux'

const Container = styled.div`
    display: flex;
    padding: 40px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
    ${tablet({ flexDirection: 'column' })}
`

const Categories = () => {

    const [products, setProducts] = useState([])
    const {isLogged} = useSelector(state=> state.user)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get('/product')
                setProducts(res.data.slice(0, 4))
            } catch (error) {
                console.log(error)
            }
        }
        isLogged && getProducts()
    }, [isLogged])

            return (
                <Container>
                    {
                        products.map(cat => (
                            <CategoryItem key={cat.id} category={cat} />
                        ))
                    }
                </Container>
            )
    }

    export default Categories
