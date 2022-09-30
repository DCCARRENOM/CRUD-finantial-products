import './App.css';
import Home from './Pages/Home';
import Products from './Pages/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
        </Routes>
      </BrowserRouter>


      {/* <Home heroes={heroes}/> */}

    </div>
  );
}

export default App;
