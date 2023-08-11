import { Routes,Route } from 'react-router-dom';
import { 
  Home, 
  MainHome, 
  ProductDetail,
  MainAuth, 
  Login,
  Register,
  Carts, 
  Favorites ,
  Products,
  CheckoutBoarding
} from './pages';

const App = () => {
  return (
    <div className="App">
       <Routes>
          <Route path="/auth" element={<MainAuth/>}>
             <Route index element={<Login/>}/>
             <Route path="register" element={<Register/>}/>
          </Route>
          <Route path="/" element={<MainHome/>}>
            <Route index element={<Home/>}/>
            <Route path="product" element={<Products/>}/>
            <Route path="product/:id" element={<ProductDetail/>}/>
            <Route path="carts" element={<Carts/>}/>
            <Route path="favorites" element={<Favorites/>}/>
            <Route path="/checkout" element={<CheckoutBoarding/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
