import { Send } from "@material-ui/icons"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"

const Container = styled.div`
    display: flex;
    height: 60vh;
    align-items: center;
    justify-content: center;
    background: #fcf5f5;
    flex-direction: column;
    ${tablet({height: '22vh'})}
    `
    const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${tablet({fontSize: '33px'})}
    ${mobile({fontSize: '30px'})}
    `
    const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${tablet({fontSize: '18px'})}
    ${mobile({fontSize: '18px', textAlign: 'center'})}
`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({width: '90%', marginTop: '15px'})}
`
const Button = styled.button`
    flex: 1;
    border: none;
    background: teal;
    color: white;
`
const Input = styled.input`
    border: none;
    outline: none;
    padding-left: 20px;
    flex: 8;
`

const Newsletter = () => {
    return (
        <Container>
            <Title>NEWSLETTER</Title>
            <Description>Get timely updates from your favourite Products</Description>
            <InputContainer>
              <Input placeholder='Your Email'/>
              <Button>
                  <Send />
              </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
