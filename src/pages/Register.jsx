import { Check, Clear } from "@material-ui/icons"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import styled from "styled-components"
// import Advertisement from "../components/Advertisement"
import Navbar from "../components/Navbar"
import Pop3 from '../images/payment.png'
import { register } from "../redux/apiCalls"
import { mobile, tablet } from "../responsive"

const Cover = styled.div``
const Container = styled.div`
    width: 100vw;
    height: 100vh;
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
    ${tablet({width: '80%'})};
    ${mobile({width: '80%'})};
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    ${mobile({flexDirection: 'column'})};
`
const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 3px 10px;
outline: none;
border: none;
${mobile({width: '100%'})};
font-size: 16px;
`
const InputDiv = styled.div`
 display: flex;
 flex-direction: column;
`

const Agreement = styled.span`
    font-size: 13px;
    margin: 20px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 10px;
    background: teal;
    color: white;
    cursor: pointer;
    ${mobile({padding: '10px'})};
    &:disabled{
        background: gray;
    }
`
const InputSpan = styled.span`
    font-size: 12px;
    color: ${props=> props.color};
    margin-top: 5px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    letter-spacing: 3px;
    margin-left: auto;
    transition: 1s all ease;
`
const ErrMsg = styled.span`
    color: red;
    letter-spacing: 2px;
    text-align: center;
`
const SucMsg = styled.span`
    color: green;
    letter-spacing: 2px;
    text-align: center;
`

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialState = {
        username: '',
        email: '',
        password: '',
        cpassword: ''
    }

    const [data, setData] = useState(initialState)
    const {username, email, password, cpassword} = data
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const usernameLength = (e)=>{
        if(e.length > 3) return true
    }
    const emailMatch = (e)=>{
        const match = String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(match) return true
    }
    const passwordMatch = (p, cp)=>{
        if(!p) return false
        if(p ===cp) return true
    }

    const passwordLength =(e)=>{
        if(e.length > 5) return true
    }

    const handleChange = (e)=>{
      const {name, value} = e.target
      setData({...data, [name]: value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const res = await register(dispatch, {email, username, password})
        if(res.status === 200){
            setSuccess('Registration Successful')
            setTimeout(()=>{
               navigate('/login')
            }, 3000)
        }else{
            setError(res.data)
        }
        setData({...initialState})
    }

    return (
        <Cover>
        <Navbar />
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                {error && <ErrMsg>{error}</ErrMsg>}
                {success && <SucMsg>{success}</SucMsg>}
                <Form onSubmit={handleSubmit}>
                    <InputDiv>
                    <Input value={username} name='username' onChange={handleChange} placeholder='Username' />
                    {   usernameLength(username) ?
                        <InputSpan style={{display: !username && 'none'}} color='#00ff00'>Verification Confirmed <Check style={{fontSize: '13px'}} /></InputSpan> :
                        <InputSpan style={{display: !username && 'none'}} color='red'>Username must be atleast 5 characters <Clear style={{fontSize: '13px'}}/></InputSpan> 
                    }
                    </InputDiv>
                    <InputDiv>
                    <Input value={email} name='email' onChange={handleChange} placeholder='Email' />
                    {
                        emailMatch(email) ? 
                        <InputSpan style={{display: !email && 'none'}} color='#00ff00'>Verification Confirmed <Check style={{fontSize: '13px'}}/></InputSpan> :
                        <InputSpan style={{display: !email && 'none'}} color='red'>Email Verification Failed <Clear style={{fontSize: '13px'}}/></InputSpan>
                    }
                    </InputDiv>
                    <InputDiv>
                    <Input value={password} name='password' onChange={handleChange} placeholder='Password' type='password' />
                    {
                        passwordLength(password) ?
                        <InputSpan style={{display: !password && 'none'}} color='#00ff00'>Verification Confirmed <Check style={{fontSize: '13px'}}/></InputSpan> :
                        <InputSpan style={{display: !password && 'none'}} color='red'>Password Verification Failed <Clear style={{fontSize: '13px'}}/></InputSpan>
                    }
                    </InputDiv>
                    <InputDiv>
                    <Input value={cpassword} name='cpassword' onChange={handleChange} placeholder='Confirm Password' type='password' />
                    {
                        passwordMatch(password, cpassword) ?
                        <InputSpan style={{display: !cpassword && 'none'}} color='#00ff00'>Verification Confirmed <Check style={{fontSize: '13px'}}/></InputSpan> :
                        <InputSpan style={{display: !cpassword && 'none'}} color='red'>Verification Failed <Clear style={{fontSize: '13px'}}/></InputSpan>
                    }
                    </InputDiv>
                    <Agreement>By creating this account, I hereby agree to the terms and conditions provided.</Agreement>
                    <Button disabled={!usernameLength(username) || !emailMatch(email) || !passwordLength(password) || !passwordMatch(password, cpassword)}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
        </Cover>
    )
}

export default Register

