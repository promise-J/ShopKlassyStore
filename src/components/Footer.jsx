import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"
import PayImg from '../images/payment.png'
import { mobile, tablet } from "../responsive"

const Container = styled.div`
    display: flex;
    align-item: center;
    padding: 20px;
    margin: auto;
    width: 90vw;
    ${mobile({flexDirection: 'column'})}
    ${tablet({flexWrap: 'wrap', flexDirection: 'column'})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({margin: 'auto', textAlign: 'center'})}
`
const Logo = styled.h1``
const Description = styled.p`
    margin: 20px 0;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    background: #${props=> props.color};
    ${mobile({margin: 'auto'})}
`

const Center = styled.div`
   flex: 1;
   padding: 20px;
   ${mobile({display: 'none'})}
   ${tablet({flex: 1})}
`
const Right = styled.div`
   flex: 1;
   padding: 20px;
   ${mobile({textAlign: 'center', margin: 'auto'})}
   ${tablet({flex: 1})}
`
const Title = styled.h3`
   margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
   padding: 0;
   list-style: none;
   display: flex;
   flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    height: 100px;
    object-fit: cover;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>ShopKlass</Logo>
                <Description>There are always ways of getting your quality to you.</Description>
            <SocialContainer>
                <SocialIcon color='3B5999'><Facebook /></SocialIcon>
                <SocialIcon color='E4405F'><Instagram /></SocialIcon>
                <SocialIcon color='55ACEE'><Instagram /></SocialIcon>
                <SocialIcon color='E60023'><Twitter /></SocialIcon>
                <SocialIcon><Pinterest /></SocialIcon>
            </SocialContainer>
            </Left>
            <Center>
               <Title>Useful Links</Title>
               <List>
                   <ListItem>Home</ListItem>
                   <ListItem>Cart</ListItem>
                   <ListItem>Men's Fashion</ListItem>
                   <ListItem>Women's Fashion</ListItem>
                   <ListItem>Accessories</ListItem>
                   <ListItem>My Accont</ListItem>
                   <ListItem>Order Tracking</ListItem>
                   <ListItem>Wish List</ListItem>
                   <ListItem>Terms and Conditions</ListItem>
                   <ListItem>Contact</ListItem>
                   <ListItem>About</ListItem>
                   <ListItem>Socials</ListItem>
               </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{marginRight: '10px'}}/>45 Amaezike road, Mgbakwu.</ContactItem>
                <ContactItem><Phone style={{marginRight: '10px'}}/>+234 8111 1582 25</ContactItem>
                <ContactItem><MailOutline style={{marginRight: '10px'}}/>chiemelapromise@gmail.com</ContactItem>
                <Payment src={PayImg} />
            </Right>
        </Container>
    )
}

export default Footer
