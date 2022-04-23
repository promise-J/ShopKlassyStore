import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import {sliderItems} from '../data'
import { mobile, tablet } from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${tablet({width: '90%', margin: 'auto',height: '75vh'})}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    opacity: 0.7;
    z-index: 2;
    left: ${props=> props.direction==='left' && '15px'};
    right: ${props=> props.direction==='right' && '15px'};
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1s ease;
    transform: translateX(${props=> props.slideIndex * -100}vw);
    ${mobile({})};

`

const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 70vh;
    background: #${props=> props.bg};
    ${mobile({flexDirection: 'column'})};
`
const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    padding: 10px;
    ${mobile({width: '100%', height: '100%'})};
`
const Image = styled.img`
    height: 100%;
    ${mobile({height: '60vh'})}
`
const InfoContainer = styled.div`
    padding: 50px;
    ${tablet({position: 'absolute', top: '30%', background: 'white', opacity: 0.5})}
    ${mobile({flex: '1'})}
`
const Title = styled.h1`
    font-size: 70px;
    ${tablet({fontSize: '40px'})}
    ${mobile({fontSize: '30px'})};
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    ${tablet({fontSize: '18px', letterSpacing: '1px', margin: '30px 0'})}
    ${mobile({fontSize: '15px', margin: '20px 0px'})}
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    outline: none;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) =>{
        if(direction==='left'){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1)
        }else{
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0)
        }
    }
    return (
        <Container>
            <Arrow direction='left' onClick={()=> handleClick('left')}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
              {
                  sliderItems.map(item=>(                      
                 <Slide key={item.id} bg={item.bg}>
                  <ImgContainer><Image src={item.img}/></ImgContainer>
                  <InfoContainer>
                      <Title>{item.title}</Title>
                      <Desc>{item.desc}</Desc>
                      <Button>SHOP NOW</Button>
                  </InfoContainer>
                 </Slide>
                  ))
              }
            </Wrapper>
            <Arrow direction='right' onClick={()=> handleClick('right')}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
