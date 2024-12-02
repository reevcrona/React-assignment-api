import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import DisneyData from './Components/DisneyData.jsx';
import Home from "./pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import CharacterCard from "./Components/CharacterCard.jsx";

function App() {
  
  
  
  return (
    <>
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/characters/page/:pageNumber" element = {<DisneyData/>}  />
        <Route path="/character/:charId" element = {<CharacterCard/>} />
      </Routes>
     </BrowserRouter>
        
    </>
  )
}

export default App
