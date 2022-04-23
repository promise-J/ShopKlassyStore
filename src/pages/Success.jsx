import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { publicRequest } from "../apiRequest";
import { initialiseProducts, resetCart } from "../redux/cartRedux";
// import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch()


  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await publicRequest.post("/order", {
          userId: currentUser._id,
          products: cart.products,
          amount: cart.total,
          address: data.billing_details.address,
        });

        setOrderId(res.data._id)
        
      }catch(err) {
        console.log(err)
      }
    };
    data && createOrder();
  }, [cart, currentUser, data]);

  useEffect(()=>{
    const clearCart = ()=>{
      dispatch(resetCart())
    }
    clearCart()

  },[dispatch])


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to='/'>
       <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;