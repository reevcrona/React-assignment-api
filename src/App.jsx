import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import DisneyData from './Components/DisneyData'

function App() {
  
  
  
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
