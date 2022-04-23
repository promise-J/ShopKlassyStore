import {useState} from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {  tablet } from "../responsive"
import {useSelector} from 'react-redux'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import { publicRequest, imgRequest } from '../apiRequest'

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
    ${tablet({flexDirection: 'column'})}
`
const Left = styled.div`
    border: 1px solid black;
    flex: 1;
    display: flex;
    flex-direction: column;
`
const Right = styled.div`
    border: 1px solid black;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
`
const Img = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: contain;
`

const LeftInfo = styled.div`
    flex: 3;
`
const RightInfo = styled.div`
    flex: 3;
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
    color: ${props=> props.verified === 'true' ? 'green' : 'red'}
`

const FormItem = styled.div`
    background: red;
    height: 80%;
    width: 90%;
`


const Profile = () => {
    const initialState = {img: null, username: '', email: '', password: ''}
    const {currentUser} = useSelector(state=> state.user)
    const [showVerify, setShowVerify] = useState(false)
    const [imgPrev, setImgPrev] = useState('')
    const [imgLoad, setImgLoad] = useState(false)
    const [data, setData] = useState(initialState)
    const [imgErr, setImgErr] = useState('')
    const [copied, setCopied] = useState(false)
    const [user, setUser] = useState(null)

    const {img, email, password, username} = data
     console.log(user)
    
    const handleImgChange = async(e)=>{
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
            // if(user.publicId){
                //     const deleted = await imgRequest.post('/api/delete_avatar', {publicId: user?.publicId})
            //     console.log(deleted)
            // }
            if(img){
                setImgLoad(true)
                const res = await imgRequest.post('/api/upload_avatar', formData)
                if(res.status===200){
                    const update = await publicRequest.put(`/user/${currentUser._id}`, {...data, password: password && password, img: img && res.data.secure_url, publicId: img && res.data.public_id})
                    // console.log(res)
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




  return (
    <>
    <Navbar />
    <Container>
        <Wrapper>
            <Left>
                <ImgContainer>
                  <Img src={currentUser.img} />
                </ImgContainer>
                <LeftInfo>
                    <LeftInfoItems>
                        <LeftInfoItem>Username</LeftInfoItem>
                        <LeftInfoItemValue>{currentUser.username}</LeftInfoItemValue>
                    </LeftInfoItems>
                    <LeftInfoItems>
                        <LeftInfoItem>Email</LeftInfoItem>
                        <LeftInfoItemValue>{currentUser.email}</LeftInfoItemValue>
                    </LeftInfoItems>
                    <LeftInfoItems>
                        <LeftInfoItem>Favourite Products:   {currentUser.favorite.length}</LeftInfoItem>
                    </LeftInfoItems>
                    <LeftInfoItems>
                        <LeftInfoItem>Status</LeftInfoItem>
                        <LeftInfoItemValueStatus verified={currentUser.status ? 'true' : 'false'} >{currentUser.status ? 'Your account is verified' : 'Please Verify your account'}</LeftInfoItemValueStatus>
                        {currentUser.status && <LeftInfoItemValueStatus onClick={()=> setShowVerify(!showVerify)} style={{fontSize: 13, margin: '8px 0'}} verified={currentUser.status ? 'true' : 'false'} ><span style={{background: 'rgb(223, 221, 221)', padding: 2, marginTop: 4, cursor: 'pointer'}}>Click here to Verify your account</span>{!showVerify ? <ArrowDownward style={{fontSize: 12}} /> : <ArrowUpward style={{fontSize: 12}} />}</LeftInfoItemValueStatus>}
                        {showVerify && 
                        <div style={{}}>
                            <input style={{padding: 3}} placeholder='Enter Your Email' />
                            <button style={{padding: 3, marginLeft: 3}}>Verify</button>
                        </div>
                        }

                        </LeftInfoItems>
                        <LeftInfoItems>
                        <LeftInfoItemValue>
                           <LeftInfoItem>Referral Code</LeftInfoItem>
                           <div>
                           <p style={{fontSize: 12}}>Your have refered 4 persons. Your refferal earnings is $45.</p>
                           <span style={{fontSize: 9, textDecoration: 'underline'}}>{`${process.env.REACT_APP_PUBLIC_URL}/auth/register/ref=${currentUser._id}`}</span>
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
                      <FormItem>
                      
                      </FormItem>
                    </form>
                </RightInfo>
            </Right>
        </Wrapper>
    </Container>
    <Footer />
    </>
  )
}

export default Profile