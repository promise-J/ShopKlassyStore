import { Add, Remove, StarRateSharp } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { mobile, tablet } from "../responsive"
import { publicRequest } from '../apiRequest'
import { addProduct } from "../redux/cartRedux"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core"

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    height: 100vh;
    ${mobile({ flexDirection: 'column', padding: 2 })}
    ${tablet({ flexDirection: 'column',
     padding: 2,
      justifyContent: 'center',
       height: '75vh',
        marginTop: 20
    })}
`
const ImgContainer = styled.div`
    flex: 1;
    ${tablet({
      padding: '0 5px',
      width: '90%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%'
    })}
`
const InfoContainer = styled.div`
   flex: 1;
   padding: 0px 30px;
   height: 100%;
   ${tablet({ padding: "0 10px", display: 'flex', alignItem: 'center', justifyContent: 'center', marginBottom: 40})}
`
const InnerInfoContainer = styled.div`
   flex: 1;
   padding: 0px 30px;
   height: 100%;
   padding: 20px;
   ${tablet({ padding: "0 10px", display: 'flex', flexDirection: 'column', alignItem: 'center', justifyContent: 'center', marginBottom: 40})}
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    ${tablet({ width: '90%', height: '80%', marginTop: 20})};
    ${mobile({ height: '80%' })};
`

const Title = styled.h1`
    font-weight: 200;
    ${tablet({ fontSize: '25px', fontWeight: 500 })}
`

const Desc = styled.p`
    margin: 20px 0;
    ${mobile({ margin: '8px 0' })};
`

const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
    ${tablet({ fontSize: '23px' })}
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0;
    ${mobile({ margin: '16px 0' })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.color};
    border: ${props => props.color === 'white' && 'gray 1px solid'};
    margin: 0px 5px;
`


const FilterTitle = styled.div`
font-size: 20px;
font-weight: 200;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`
    
`
const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    ${tablet({ width: '100%' })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;

`

const Amount = styled.span`
    width:30px;
    height: 30px;
    border: 1px solid teal;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 10px;
    border: 1px solid teal;
    background: white;
    cursor: pointer;
    font-weight: 500;
    &:hover{
        background: #f8f4f4;
    };
    ${mobile({ padding: '5px' })}
    ${tablet({ padding: '5px', fontSize: '15px' })}
`

const StarRateContainer = styled.div`
border: 1px solid rgb(225, 225, 225);
width: fit-content;
padding: 2px;
margin-top: 35px;
`

const Product = () => {
    const {isLogged} = useSelector(state=> state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(null)
    const [size, setSize] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);


    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true)
                const res = await publicRequest.get(`/product/find/${id}`)
                setProduct(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === 'decrease') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleRating = (value)=>{
        if(value===rating){
            setRating((value)=> value - 1)
        }
        if(rating===1){
            setRating(0)
        }
        setRating(value)
    }

    const ratingValue = ()=>{
        switch (rating) {
            case 1:
                return 'Needs much improvement'
            case 2:
                return 'Not satisfactory'
            case 3:
                return 'Fair Enough'
            case 4:
                return 'Satisfactory'
            case 5:
                return 'Excellent Product'
        
            default:
                return 'Not too busy? Please rate'
        }
    }

    const handleCart = () => {
        if(!isLogged){
            return navigate('/login')
        }
        try {
            dispatch(addProduct({ productId: product._id,
                 quantity, color,
                  size, desc: product.desc,
                   title: product.title,
                   img: product.img,
                   price: product.price
                  }))
            publicRequest.put('/user/update/cart', {
                productId: product._id,
                quantity,
                title: product.title,
                color,
                desc: product.desc,
                img: product.img,
                price: product.price,
                size
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <Navbar />
            { loading ? 
            <Wrapper>
                <CircularProgress style={{margin: 'auto', fontSize: 55}} />
            </Wrapper> :
            <Wrapper>
                <ImgContainer>
                    <Image src={product?.img} />
                </ImgContainer>
                <InfoContainer>
                    <InnerInfoContainer>
                    {(!color || !size) && <span style={{ color: 'red' }}>{`Please select a size and a color`}</span>}
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>$ {product?.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {
                                product?.color?.map(c => (
                                    <FilterColor key={c} color={c}
                                        onClick={() => setColor(c)}
                                    />
                                ))
                            }
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <FilterSizeOption>Choose a size</FilterSizeOption>
                                {
                                    product?.size?.map(s => (
                                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                    ))
                                }

                            </FilterSize>
                        </Filter>

                    </FilterContainer>
                    {(color || size) ? <div style={{ border: 'red 1px teal', margin: '15px 0', padding: 15, color: color, background: 'black', opacity: 0.9 }}>{`Color: ${color || 'none'}`} {size !== 'null' && `Size: ${size || 'none'}`}</div>
                        : <div style={{ color: 'red', border: 'red 1px teal', margin: '15px 0', padidng: 15 }}>Color and Size not selected</div>
                    }
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity('decrease')} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity('increase')} />
                        </AmountContainer>
                        <Button disabled={!color || !size} onClick={handleCart}>ADD TO CART</Button>
                    </AddContainer>
                    <StarRateContainer>
                    <StarRateSharp style={{color: rating >= 1 && 'rgb(247, 211, 6)', fontSize: 30, cursor: 'pointer'}} onClick={()=> handleRating(1)} />
                    <StarRateSharp style={{color: (rating >= 2) && 'rgb(247, 211, 6)', cursor: 'pointer', fontSize: 30}} onClick={()=> handleRating(2)} />
                    <StarRateSharp style={{color: (rating >= 3) && 'rgb(247, 211, 6)', cursor: 'pointer', fontSize: 30}} onClick={()=> handleRating(3)} />
                    <StarRateSharp style={{color: (rating >= 4) && 'rgb(247, 211, 6)', cursor: 'pointer', fontSize: 30}} onClick={()=> handleRating(4)} />
                    <StarRateSharp style={{color: (rating >= 5) &&  'rgb(247, 211, 6)', cursor: 'pointer', fontSize: 30}} onClick={()=> handleRating(5)} />
                    </StarRateContainer>
                    <span style={{fontSize: 13,
                         fontStyle: 'italic',
                          marginTop: 15,
                          width: 'fit-content',
                          background: rating > 0 ? 'black' : 'inherit',
                          padding: 5,
                          color: rating===1 ? 'rgb(255, 0, 0)' :
                          rating === 2 ? 'rgb(240, 75, 75)' :
                          rating === 3 ? 'yellow' : 
                          rating === 4 ? 'rgb(138, 243, 138)' :
                          rating === 5 ? 'green' : 'black',
                          letterSpacing: 2
                    }}>{ratingValue()}</span>
                    </InnerInfoContainer>
                </InfoContainer>
            </Wrapper>
            }
            <Newsletter />
            
            <Footer />
        </Container>
    )
}

export default Product
