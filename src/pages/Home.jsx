import axios from "axios";
import "../styles/Home.css";
import InputSvg from "../assets/Group 1.svg"
import DisneyLogo from "..//assets/walt-disney-pictures.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home(){
    
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const [mulitpleChars,setMultipleChars] = useState(null);
    const [singleChar,setSingleChar] = useState(null);

    const getSpecificCharacter = () => {
        
        axios.get(`https://api.disneyapi.dev/character?name=${encodeURIComponent(search)}`).then((res) => {
            

            const results = res.data.data;

                // think this logic works now????
                // Check if the results length is greater than 1 if it is we found more than one character (Array)
                // If we cant check its length that means its an object and only found one character (Object)
                // If not we found nothing :c

                if(results.length > 1){
                    // Multiple characters were found
                    console.log("Mulitple was found: ", results)
                    setMultipleChars(results)
                    
                    setSingleChar(null) //Reset
                }
                else if (results._id){
                    // Only one character was found
                    console.log("One was found: ", results)
                    setSingleChar(results)
                    
                    setMultipleChars(null) // Reset
                }else{
                    console.log("nothing was found")
                }
                
            }
        )
    }
    
    const renderSingleOption = (data) => {
        
        return(
            <div >
                <h2>{data.name}</h2>
                <img src={data.imageUrl}></img>
                <button onClick={() => navigate(`/character/${data._id}`)}>More details</button>
            </div>
        )
    }

    const renderOptions = (data) => {
       
        return data.map((item,index) => {
        return(
            <div key={index}>
                <h2>{item.name}</h2>
                <img src={item.imageUrl}></img>
                <button onClick={() => navigate(`/character/${item._id}`)}>More details</button>
            </div>
        )
        
       })
       
    }

    return (
        <div className="home-main-container">
            <div className="header-container">
                <h1 className="home-header">Your Favorite Disney Characters, All in One Place!</h1>
                <img className="disney-logo" src={DisneyLogo}></img>

            </div>
            
            <div className="search-bar-container">
                <input className="search-bar" placeholder="Search for your favorite character" onChange={(e) => setSearch(e.target.value)} type="text"></input>
                <button className="search-button" onClick={getSpecificCharacter}>Search</button>
                <img className="search-svg" src={InputSvg}></img>
            </div>
            
            {mulitpleChars ? renderOptions(mulitpleChars):""}
            {singleChar ? renderSingleOption(singleChar): ""}

        </div>
    )
}

export default Home;