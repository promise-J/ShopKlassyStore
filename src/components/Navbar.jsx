import React, { useState } from 'react'
import styled from 'styled-components'
import {ShoppingCartOutlined, MenuSharp, CloseOutlined} from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import {mobile, tablet} from '../responsive'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../redux/apiCalls';
// import {Redirect} from 'react-router-dom'

const MenuList = styled.div`
    height: 100vh;
    width: 99vw;
    background: white;
    position: fixed;
    z-index: 44;
    top: 0;
    left: 0;
    over-flow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`
const MenuContent = styled.div`
    height: 85%;
    width: 80%;
`
const Padder = styled.div`
    height: 60px;
    width: 100vw;
    ${mobile({height: '50px'})};
    background: inherit;
`

const Container = styled.div`
    height: 60px;
    width: 100vw;
    border: 1px solid rgb(230, 223, 223);
    position: fixed;
    top: 30;
    z-index: 30;
    marginBottom: 60px;
    background: white;
    ${tablet({})}
    ${mobile({height: '50px'})};
    `
    const Wrapper = styled.div`
    display: flex;
    padding: 10px 20px;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    ${mobile({padding: '10px 0px', justifyContent: 'space-around'})};
`

const Center = styled.div`
    flex: 1;
    text-align: center;
    ${mobile({flex: '0.5'})}
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "20px"})}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    ${mobile({flex: '40%'})}
    ${tablet({justifyContent: 'center'})}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({marginLeft: '10px'})}
`
const ProfileImg = styled.img`
    height: 30px;
    width: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-left: 10px;
`



const Navbar = () => {
    const cart = useSelector(state=> state.cart)
    const [isOpen, setIsOpen] = useState(false)
    const {currentUser, isLogged} = useSelector(state=> state.user)
    const {pathname} = useLocation()


    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(cart?.products, cart?.products.length, ' to verify length')

    const handleLogout = async()=>{
        logout(dispatch)
        navigate('/login')
        // return <Redirect to={"/"} />
    }

    const toggleMenu = ()=>{
        setIsOpen(!isOpen)
    }
    
    return (
        <>
        <Container>
            <MenuList style={{width: isOpen ? '99vw' : '0vw', transition: '1s all ease'}}>
                {isOpen && <CloseOutlined onClick={toggleMenu} style={{position: 'absolute',
                 color: 'black',
                 cursor: 'pointer',
                  fontWeight: 600,
                    top: 20,
                     right: 30,
                      transition: 'all ease 0.7',
                      fontSize: 30
                      }} />}
                <MenuContent style={{display: isOpen ? 'flex' : 'none',
                 alignItems: 'center',
                 flexDirection: 'column', 
                 padding: 40,

                 }}>
                    <h2 style={{fontSize: 40}}>ShopKlassy</h2>
                    <ul style={{marginTop: 20, display: 'flex',
                     padding: 2,
                     height: '60%',
                     width: '30%',
                    //  justifyContent:'center',
                     alignItems: 'center',
                     flexDirection: 'column',
                     listStyle: 'none',
                     fontSize: 20,
                     letterSpacing: 1.2
                    }}>
                        {isLogged && 
                        <>
                        <li><Link to='/profile'><ProfileImg src={currentUser?.img} alt="profile image" /></Link></li>
                        <li style={{margin: 10, textDecoration: pathname === '/profile' && 'underline', padding: 3}}><Link className='link' to='/profile'>Profile</Link>  </li>
                        </>
                        }
                        <li style={{margin: 10, textDecoration: pathname === '/' && 'underline', padding: 3}}><Link className='link' to='/'>Home</Link></li>
                        <li style={{margin: 10, textDecoration: pathname === '/products' && 'underline', padding: 3}}><Link className='link' to='/products'>Products</Link></li>
                        {isLogged && <li style={{margin: 10, textDecoration: pathname === '/cart' && 'underline', padding: 3}}><Link className='link' to='/cart'>Cart ({cart?.products.length} Product(s))</Link></li>}
                        { !isLogged ?
                        <><li style={{margin: 10, textDecoration: pathname === '/register' && 'underline', padding: 3}}><Link className='link' to='/register'>Register</Link></li>
                        <li style={{margin: 10, textDecoration: pathname === '/login' && 'underline', padding: 3}}><Link className='link' to='/login'>Login</Link></li></> :
                        <li onClick={handleLogout}><Link className='link' to='/'>Logout</Link></li>
                        }
                    </ul>
                </MenuContent>
            </MenuList>
            <Wrapper>
            {/* <Left> */}
                {/* <Language>
                    EN
                </Language> */}
                {/* <SearchContainer>
                    <Search style={{color: "gray", fontSize: "20px"}}/>
                    <Input />
                </SearchContainer> */}
            {/* </Left> */}
                { !isOpen && <MenuSharp onClick={toggleMenu} style={{margin: '10px 20px', transition: 'all ease 0.7', fontSize: 30, cursor: 'pointer'}} />}
            <Center>
                <Link className='link' to='/'>
                  <Logo>ShopKlass</Logo>
                </Link>
            </Center>
            <Right>
                {/* {
                !currentUser ?
                <><Link className='link' to='/register'><MenuItem>Register</MenuItem></Link>
                <Link className='link' to='/login'><MenuItem>Login</MenuItem></Link></> :
                <Link onClick={handleLogout} className='link' to='/'><MenuItem>Logout</MenuItem></Link>
                } */}
              
                {
                    isLogged &&
                    <>
                    <Link className='link' to='/cart'>
                    <MenuItem>
                      {/* {cart?.products.length > 0 && */}
                      <Badge badgeContent={cart?.products.length} color="primary">
                          <ShoppingCartOutlined />
                      </Badge>
                      {/* } */}
                    </MenuItem>
                    </Link>
                    <Link className='link' to='/profile'>
                  <ProfileImg src={currentUser?.img} alt="" />
                </Link>
                </>
                }
            </Right>
            </Wrapper>
        </Container>
        <Padder></Padder>
        </>
    )
}

export default Navbar
