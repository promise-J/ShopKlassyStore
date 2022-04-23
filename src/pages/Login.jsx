import { Check, Clear } from "@material-ui/icons"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
// import Advertisement from "../components/Advertisement"
import Navbar from "../components/Navbar"

import Pop3 from '../images/payment.png'
import { login } from "../redux/apiCalls"
import { mobile, tablet } from "../responsive"

const Cover = styled.div``

const Container = styled.div`
    width: 100vw;
    height: 70vh;
    background: linear-gradient(rgba(225,225,225,0.4), rgba(225,225,225,0.5)), url(${Pop3}) no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 20px;
    width: 45%;
    background: black;
    color: white;
    ${tablet({width: '80%'})}
    ${mobile({width: '80%'})}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    outline: none;
    border: none;
    padding: 3px 10px;
    font-size: 16px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 5px;
    background: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 8px;
`
const Linked = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const InputSpan = styled.span`
    font-size: 12px;
    color: red;
    margin-top: 5px;
    letter-spacing: 2px;
    color: ${props=> props.color};
    transition: all 1s ease;
    margin-left: auto;
`
const InputDiv = styled.div`
 display: flex;
 flex-direction: column;
`


const Login = () => {
 const dispatch = useDispatch()
 const [data, setData] = useState({email: '', password: ''})
 const {email, password} = data

 const handleChange = (e)=>{
     const {name, value} = e.target
     setData({...data, [name]: value})
 }

    const emailMatch = (e)=>{
        return String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

  const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
          login(dispatch, {email, password})
      } catch (error) {
          console.log(error)
      }
  }

    return (
        <Cover>
        <Navbar />
        <Container>
          <Wrapper>
            <Title>LOGIN NOW</Title>
            <Form onSubmit={handleSubmit}>
            <InputDiv>
                    <Input name='email' value={email} onChange={handleChange} placeholder='Email' />
                    {
                        emailMatch(email) ? 
                        <InputSpan style={{display: !email && 'none'}} color='#00ff00'>Verification Confirmed <Check style={{fontSize: '13px'}}/></InputSpan> :
                        <InputSpan style={{display: !email && 'none'}} color='red'>Email Verification Failed <Clear style={{fontSize: '13px'}}/></InputSpan>
                    }
                    </InputDiv>
                    <InputDiv>
                    <Input onChange={handleChange} name='password' value={password} placeholder='Password' type='password' />
                    </InputDiv>
                <Button>LOGIN</Button>
                <Linked>YOU DO NOT REMEMBER YOUR PASSWORD?</Linked>
                <Link style={{textDecoration: "none", color: 'inherit'}} to='/register'>CREATE A NEW ACCOUNT</Link>
            </Form>
          </Wrapper>
        </Container>
        </Cover>
    )
}

export default Login
