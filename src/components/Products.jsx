import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import { publicRequest } from "../apiRequest"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`


const Products = ({filters, cat, sort}) => {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProduct] = useState([])

    useEffect(()=>{
      const getProducts = async()=>{
         try {
             const res = await publicRequest.get(cat ? `/product?category=${cat}` : '/product')
             setProducts(res.data)
            } catch (error) {
         }
      }
      getProducts()
    },[cat])

    useEffect(()=>{
      cat && setFilterProduct(
          products.filter((item)=> Object.entries(filters).every(([key, value])=>
            item[key].includes(value)
          ))
      )
    },[cat, filters, products])
    
    useEffect(()=>{
      if(sort==='newest'){
        setFilterProduct((prev)=>
            [...prev].sort((a,b)=> a.createAt - b.createAt)
        )
      }else if(sort==='asc'){
          setFilterProduct((prev)=>
          [...prev].sort((a, b)=> a.price - b.price)
          )
      }else{
          setFilterProduct((prev)=>
          [...prev].sort((a, b)=> b.price - a.price)
          )
      }
    },[sort])

    return (
        <Container>
            {
                cat ? filterProducts.map(product=>(
                    <Product key={product._id} product={product} />
                )) : products.slice(0, 6)
                      .map(product=>(
                    <Product key={product._id} product={product} />
                ))
            }
        </Container>
    )
}

export default Products
