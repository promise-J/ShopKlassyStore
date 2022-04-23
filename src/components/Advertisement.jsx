import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    height: 30px;
    background: teal;
    text-align: center;
    color: white;
    padding: 5px;
    ${mobile({fontSize: '14px'})}
`

const Advertisement = () => {
    return (
        <Container>
            <marquee>
              Get discounts up to 30%, 50% and even 70% on our web page. For further enquiry, make sure to register and include your email as one of our lucky winners. Hurray!!!
            </marquee>
        </Container>
    )
}

export default Advertisement
