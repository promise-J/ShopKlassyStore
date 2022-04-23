import styled from "styled-components"
import Navbar from "../components/Navbar"
import Advertisement from "../components/Advertisement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import {useLocation} from 'react-router-dom'
import { useEffect, useState } from "react"

const Container = styled.div``

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h1`
    margin: 20px;
    ${mobile({textAlign: 'center'})}
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight: '10px',})}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({marginRight: '10px', padding: '5px', marginTop: '15px'})}
`
const Option = styled.option``
// const Container = styled.div``

const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split('/')[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('newest')

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
      }, [])

      

    const handleFilters = (e)=>{
      const {value, name} = e.target
      setFilters({
          ...filters,
          [name]: value,
      })
    }


    return (
        <Container>
            <Navbar />
            <Title><span style={{color: 'teal'}}>Category: </span>{cat.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products</FilterText>
                <Select name='color' value='' onChange={handleFilters}>
                    <Option value=''>Color</Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>green</Option>
                    <Option>blue</Option>
                    <Option>yellow</Option>
                    <Option>red</Option>
                    <Option>pink</Option>
                    <Option>teal</Option>
                    <Option>purple</Option>
                    <Option>gold</Option>
                    <Option>goldenrod</Option>
                </Select>
                <Select defaultValue='' name='size' onChange={handleFilters}>
                    <Option value=''>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products</FilterText>
                    <Select value='newest' onChange={e=> setSort(e.target.value)}>
                    <Option value='newest'>Newest</Option>
                    <Option value='asc'>Price (cheapest)</Option>
                    <Option value='desc'>Price(expensive)</Option>
                </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList
