import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import { publicRequest } from "../apiRequest"
import { CircularProgress } from "@material-ui/core"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`


const AllProduct = ({filters, sort}) => {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProduct] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
      const getProducts = async()=>{
         try {
             setLoading(true)
             const res = await publicRequest.get('/product')
             setProducts(res.data)
             setLoading(false)
            } catch (error) {
         }
      }
      getProducts()
    },[])

    useEffect(()=>{
      setFilterProduct(
          products.filter((item)=> Object.entries(filters).every(([key, value])=>
            item[key].includes(value)
          ))
      )
    },[filters, products])
    
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
        
            loading ? 
            <Container>
             <CircularProgress />
            </Container> 
            :
            <Container>
            {filterProducts.length > 0 
                ?  filterProducts.map(product=>(
                    <Product key={product._id} product={product} />
                )) : products.map(product=>(
                    <Product key={product._id} product={product} />
                ))
            }
            </Container>
        
    )
}

export default AllProduct
