import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Cart from './pages/Cart';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from './redux/userRedux';
import { initialiseProducts } from './redux/cartRedux';
import { fetchUser } from './redux/apiCalls';
import LoadingImg from './images/loadingGIF.gif'
import { publicRequest } from './apiRequest';
import ProtectedRoute from './utils/ProtectedRoute';
import AllProducts from './pages/AllProducts';
import Profile from './pages/Profile';

function App() {
  const [fetching, setFetching] = useState(true)
  const {currentUser, isLogged} = useSelector(state=> state.user)
  const dispatch = useDispatch()
  

  useEffect(() => {
    if (!currentUser && isLogged) {
      const getUser = async () => {
        dispatch(loginStart());
        return fetchUser(dispatch).then((user) => {
          dispatch(loginSuccess(user));
          setFetching(false);
        });
      };
      isLogged && getUser();
    } else {
      setFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(()=>{
      const getCart = async()=>{
        try {
          const allCart = await publicRequest.get('/user/get/cart')
          dispatch(initialiseProducts(allCart.data))
        } catch (error) {
          console.log(error)
        }
      }
      isLogged && getCart()
  },[isLogged, dispatch])

  if(fetching){
    return (
      <img style={{height: "100vh", width: "100vw", objectFit: 'cover'}} src={LoadingImg} alt="loading" />
    )
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} caseSensitive={false} exact />
          <Route path='/login' element={currentUser ? <Navigate to='/' /> : <Login />} exact />
          <Route path='/register' element={currentUser ? <Navigate to='/' /> : <Register />} exact />
          <Route path='/product/:id' element={<Product />} exact />
          <Route path='/products/:category' element={<ProductList />} exact />
          <Route path='/products' element={<AllProducts />} exact />
          <Route path='/profile' element={<ProtectedRoute isLogged={isLogged}><Profile /></ProtectedRoute>} exact />
          <Route path='/success' element={<ProtectedRoute isLogged={isLogged}><Success /></ProtectedRoute>} exact />
          <Route path='/cart' element={<ProtectedRoute isLogged={isLogged}><Cart /></ProtectedRoute>} exact />
          <Route path='*' element={<NotFound />} exact />
        </Routes>
      </Router>
      {/* <Homepage /> */}
    </div>
  );
}


export default App;


