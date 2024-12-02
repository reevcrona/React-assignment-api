import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import DisneyData from './Components/DisneyData'
import { useEffect,useState } from "react";
import axios from "axios";
function App() {
  
  const [characters,setCharacters] = useState([])
  

  useEffect(() => {
    const fetchCharacters = async () => {
      let allCharacters = [];
      for (let i = 1; i <= 149; i++) {
        const res = await axios.get(`https://api.disneyapi.dev/character?page=${i}`);
        allCharacters = allCharacters.concat(res.data.data.map((char) => char.name));
      }
      setCharacters(allCharacters); // Update state after all data is fetched
    };

    fetchCharacters();
  }, []);
  console.log(characters)
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element = {<DisneyData/>} />
        <Route path="/page/:pageNumber" element = {<DisneyData/>}  />
      </Routes>
     </BrowserRouter>
        
    </>
  )
}

export default App
