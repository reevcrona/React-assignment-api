import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import DisneyData from './Components/DisneyData.jsx';
import Home from "./pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  
  
  
  return (
    <>
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/characters/page/:pageNumber" element = {<DisneyData/>}  />
      </Routes>
     </BrowserRouter>
        
    </>
  )
}

export default App
