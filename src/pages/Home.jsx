import axios from "axios";
import "../styles/Home.css";
import InputSvg from "../assets/Group 1.svg"
import DisneyLogo from "..//assets/walt-disney-pictures.svg";
import PlaceHolderImage from "../assets/No-Image-Placeholder.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home(){
    
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const [mulitpleChars,setMultipleChars] = useState(null);
    const [singleChar,setSingleChar] = useState(null);
    const [charactersFound,setCharactersFound] = useState(null);

    const getSpecificCharacter = () => {
        
        if(search !== ""){

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
                    setCharactersFound(results.length)
                }
                else if (results._id){
                    // Only one character was found
                    console.log("One was found: ", results)
                    setSingleChar(results)
                    setCharactersFound(1)
                    setMultipleChars(null) // Reset
                }else{
                    setCharactersFound("No match found please try again")
                }
                
            }
        )}
        setSearch("");
    }
    
    const renderSingleOption = (data) => {
        
        return(
            <div className="character-container">
                <img className="character-image" src={data.imageUrl ? data.imageUrl: PlaceHolderImage}></img>
                <h2 className="character-name">{data.name}</h2>
                <button className="character-button" onClick={() => navigate(`/character/${data._id}`)}>Character page</button>
            </div>
        )
    }

    const renderOptions = (data) => {
       
        return data.map((item,index) => {
        return(
            <div className="character-container" key={index}>
                <img className="character-image" src={item.imageUrl ? item.imageUrl : PlaceHolderImage}></img>
                <h2 className="character-name">{item.name}</h2>
                <button className="character-button" onClick={() => navigate(`/character/${item._id}`)}>Character page</button>
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
                <input required minLength="1" className="search-bar" placeholder="Search for your favorite character" value={search} onChange={(e) => setSearch(e.target.value)} type="text"></input>
                <button className="search-button" onClick={getSpecificCharacter}>Search</button>
                <img className="search-svg" src={InputSvg}></img>
            </div>
            
            {charactersFound &&  <h4 className="character-found-text">{charactersFound > 0 ? <>Characters found <span className="num-of-chars-found">{charactersFound}</span> </> : charactersFound }</h4>}

            <div className="character-render-container">
                {mulitpleChars ? renderOptions(mulitpleChars):""}
                {singleChar ? renderSingleOption(singleChar): ""}
            </div>
            

        </div>
    )
}

export default Home;