import {useEffect, useState} from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import {  tablet } from "../responsive"
import {useSelector} from 'react-redux'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import { publicRequest } from '../apiRequest'

const Container = styled.div`
min-height: 100vh;
height: calc(100vh - 120px);
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
padding: 0 40px;
`

const Wrapper = styled.div`
    display: flex;
    height: 80%;
    padding: 30px;
    flex: 1;
    ${tablet({flexDirection: 'column', padding: 30, width: '100%'})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`
const Img = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: contain;
    position: absolute;
    right: 30%;
    border: gray 1px solid;
    top: 0;
    ${tablet({height: '100px', width: '100px', left: 10})}
`

const LeftInfo = styled.div`
    flex: 3;
`
const RightInfo = styled.div`
    flex: 3;
    width: 100%;
`
const LeftInfoItems = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 5px 15px;
`
const LeftInfoItem = styled.span`
    color: gray;
`

const LeftInfoItemValue = styled.span`
    font-weight: 600;
`
const LeftInfoItemValueStatus = styled.span`
    font-weight: 600;
    font-size: 12px;
    color: ${props=> props.verified === 'true' ? 'green' : 'red'}
`

const FormItem = styled.div`
    height: 80%;
    width: 100%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
`

const FormItemInput = styled.input`
    width: 45%;
    margin: 5px;
    padding: 5px;
    ${tablet({width: '40%'})}
`
const FormItemButton = styled.button`
    width: 45%;
    margin: 5px;
`

const Profile = () => {
    const [user, setUser] = useState(null)
    const {currentUser} = useSelector(state=> state.user)
    const initialState = {img: null, username: '', email: '', password: ''}
    const [showVerify, setShowVerify] = useState(false)
    const [imgPrev, setImgPrev] = useState('')
    const [imgLoad, setImgLoad] = useState(false)
    const [data, setData] = useState(initialState)
    const [initValue, setInitValue] = useState(initialState)
    const [imgErr, setImgErr] = useState('')
    const [copied, setCopied] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [code, setCode] = useState('')
    const [viewCodeArea, setViewCodeArea] = useState(false)

    const {img, email, password, username} = data
    


    const handleInputChange = (e)=>{
        const {value, name} = e.target
        setData({...data, [name]: value})
    }
    
    const handleImgChange = async(e)=>{
        console.log(e.target.files[0])
        const file = e.target.files[0]
        if(file.size > 1024 * 1024){
                setData({...data, img: null})
                setImgPrev('')
                return setImgErr('file too large')
            }
            if(file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png'){
                setData({...data, img: null})
                setImgPrev('')
                return setImgErr('Image format not allowed')
            }
            setImgErr('')
            setData({...data, img: file})
            setImgPrev(URL.createObjectURL(file))
    }

    const copyToClipBoard = ()=>{
        navigator.clipboard.writeText(currentUser._id)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        },3000)
    }

  
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            let formData = new FormData()
            formData.append('file', img)
           
            if(img){
                setImgLoad(true)
                const res = await publicRequest.post('/api/upload_avatar', formData)
                if(res.status===200){
                    const update = await publicRequest.put(`/user/${currentUser._id}`, {
                        password: password && password,
                        img: img && res.data.secure_url,
                        publicId: img && res.data.public_id,
                        email: email ? email : user?.email,
                        username: username ? username : user?.username
                    })
                    setData({...data, img: null})
                    setImgPrev('')
                    setImgLoad(false)
                    setUser(update.data)
                    setData({...initialState})
                }
                setData({...initialState})
            }else{
                setImgLoad(true)
                const update = await publicRequest.put(`/user/${currentUser._id}`, {password: password && password, email, username})
                // console.log(res)
                setImgLoad(false)
                setUser(update.data)
                setData({...initialState})
            }
            // return navigate('/users')
            // console.log(data)
        } catch (error) {
                // setData({...initialState})
                console.log(error)
            }
    }

    const verifyEmail = async()=>{
        if(!phoneNumber) return
        
        try{
            console.log(phoneNumber)
            const res = await publicRequest.post('/user/generate/code', {phoneNumber})
            if(res.status===200){
                setViewCodeArea(true)
            }
        }catch(error){
            console.log(error)
        }
    }

    const confirmVerification = async()=>{
        if(!code) return
        const res = await publicRequest.post('/user/verify/code', {code})
        setViewCodeArea(false)
        setUser(res.data.user)
    }


  return (
    <>
    <Navbar />
    <Container>
        <Wrapper>
            <Left>
                <ImgContainer>
                  <Img src={user?.img} />
                </ImgContainer>
                <LeftInfo>
                    <LeftInfoItems>
                        <LeftInfoItem>Username</LeftInfoItem>
                        <LeftInfoItemValue>{user?.username}</LeftInfoItemValue>
                    </LeftInfoItems>
                    <LeftInfoItems>
                        <LeftInfoItem>Email</LeftInfoItem>
                        <LeftInfoItemValue>{user?.email}</LeftInfoItemValue>
                    </LeftInfoItems>
                    <LeftInfoItems>
                        <LeftInfoItem>Favourite Products:   {user?.favorite?.length}</LeftInfoItem>
                    </LeftInfoItems>
                    <LeftInfoItems>
                        <LeftInfoItem>Status</LeftInfoItem>
                        <LeftInfoItemValueStatus verified={user?.status === 'active' ? 'true' : 'false'} >{user?.status === 'active' ? 'Your account is verified' : 'Please Verify your account'}</LeftInfoItemValueStatus>
                        {user?.status === 'pending' && <LeftInfoItemValueStatus onClick={()=> setShowVerify(!showVerify)} style={{fontSize: 12, margin: '8px 0'}} verified={user?.status==='active' ? 'true' : 'false'} ><span style={{background: 'rgb(223, 221, 221)', padding: 2, marginTop: 4, cursor: 'pointer', fontSize: 10}}>Click here to Verify your account</span>{!showVerify ? <ArrowDownward style={{fontSize: 10}} /> : <ArrowUpward style={{fontSize: 10}} />}</LeftInfoItemValueStatus>}
                        {showVerify && 
                        <>
                        { !viewCodeArea &&
                            <div style={{}}>
                            <input style={{padding: 3}} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder='Enter Phone Number' />
                            <button style={{padding: 3, marginLeft: 3}} onClick={verifyEmail}>Verify</button>
                        </div>
                        }
                        { viewCodeArea &&
                        <div style={{}}>
                            <input onChange={(e)=> setCode(e.target.value)} style={{padding: 3}} placeholder='Enter Code' />
                            <button onClick={confirmVerification} style={{padding: 3, marginLeft: 3, marginTop: 5}} >Submit</button>
                        </div>
                        }
                        </>
                        }

                        </LeftInfoItems>
                        <LeftInfoItems>
                        <LeftInfoItemValue>
                           <LeftInfoItem>Referral Code</LeftInfoItem>
                           <div>
                           <p style={{fontSize: 12}}>Your have refered 4 persons. Your refferal earnings is $45.</p>
                           <span style={{fontSize: 9, textDecoration: 'underline'}}>{`${process.env.REACT_APP_PUBLIC_URL}/auth/register/ref=${user?._id}`}</span>
                           <button style={{border: 'none', outline: 'none', marginLeft: 5, padding: 5, background: copied && 'green', color: copied && 'white'}} onClick={(copyToClipBoard)}>{copied ? 'Copied' : 'Copy' }</button>
                           </div>
                        </LeftInfoItemValue>
                        </LeftInfoItems>
                </LeftInfo>
            </Left>
            <Right>
                <ImgContainer>
                    {imgErr && <span style={{color: 'red', position: 'absolute', top: -50, fontSize: '11px'}}>{imgErr}</span>}
                    {(imgPrev && !imgLoad) ? <Img style={{marginRight: 10}} src={imgPrev} alt="" /> : (imgPrev && imgLoad) ? <><CircularProgress /><span>Please Wait</span></> :  null}
                    <input type='file' onChange={handleImgChange} />
                </ImgContainer>
                <RightInfo>
                    <form onSubmit={handleSubmit}>
                      <FormItem onSubmit={handleSubmit}>
                        <FormItemInput onChange={handleInputChange} name='username' value={username} style={{width: '92%'}} type="text" placeholder={user?.username} />
                        <FormItemInput onChange={handleInputChange} name='email' value={email} type="text" placeholder={user?.email} />
                        <FormItemInput onChange={handleInputChange} name='password' value={password} type="password" placeholder='password' />
                        <FormItemButton style={{width: '92%'}}>Save</FormItemButton>
                      </FormItem>
                    </form>
                </RightInfo>
            </Right>
        </Wrapper>
    </Container>
    </>
  )
}

export default Profile