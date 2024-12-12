import axios from "axios";
import "../styles/Home.css";
import InputSvg from "../assets/Group 1.svg"
import DisneyLogo from "..//assets/walt-disney-pictures.svg";
import PlaceHolderImage from "../assets/No-Image-Placeholder.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from "react-transition-group";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

function Home(){
    
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const [mulitpleChars,setMultipleChars] = useState(null);
    const [singleChar,setSingleChar] = useState(null);
    const [charactersFound,setCharactersFound] = useState(null);
    const [isLoadingData,setIsLoadingData] = useState(false);
    const [scrollPosition,setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
            
        }

        window.addEventListener("scroll",handleScroll)


        return () => {
            window.removeEventListener("scroll",handleScroll)
        }
    },[])
    
    const getSpecificCharacter = () => {
        
        if(search !== ""){
            setIsLoadingData(true)
            
            axios
            .get(`https://api.disneyapi.dev/character?pageSize=7438&name=${search}`)
            .then((res) => {
            

            const results = res.data.data;
            console.log(res.data.data)

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
                    setSingleChar(null) //Reset
                    setMultipleChars(null) // Reset
                    setCharactersFound("No match found please try again")
                }
                
            })
            .catch(() => {
                setCharactersFound("An error occurred. Please try again.");
            })
            .finally(() => {
                setSearch("");
                setIsLoadingData(false);
            })
        }
        
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
        <>
        <Helmet>
            <title>Your Favorite Disney Characters, All in One Place! - Disney Character Database</title>
            <meta name="description" content="Find your favorite Disney characters all in one place!" />
            <meta name="keywords" content="Disney, characters, search, movies, heroes, villains" />
            <meta name="author" content="Jacob Reevcrona"/>
            <meta property="og:title" content="Your Favorite Disney Characters all in one place" />
            <meta property="og:description" content="Discover your favorite Disney characters and explore their movie presence" />
            <meta property="og:image" content="https://your-project-name.netlify.app/disney-home-meta.jpg" />
            <meta property="og:url" content="https://wondrous-licorice-dcf421.netlify.app/" />
            
        </Helmet>
        <div className="home-main-container">
            <div className="header-container">
                <h1 className="home-header">Your Favorite Disney Characters, All in One Place!</h1>
                <img className="disney-logo" src={DisneyLogo} alt="A classic Walt Disney "></img>

            </div>
               
            <form 
            className="search-bar-container"
            onSubmit={(e) => {
                e.preventDefault();
                getSpecificCharacter()
            }}>
                <input required minLength="1" className="search-bar" placeholder="Search for your favorite character" value={isLoadingData? "Loading...":search} onChange={(e) => setSearch(e.target.value)} type="text"></input>
                <button className="search-button" disabled={isLoadingData} type="submit">Search</button>
                <img className="search-svg" src={InputSvg} alt="Search icon"></img>
            </form>
            
            {charactersFound &&  <h4 className="character-found-text">{charactersFound > 0 ? <>Characters found: <span className="num-of-chars-found">{charactersFound}</span> </> : charactersFound }</h4>}

            <div className="character-render-container">
                {mulitpleChars ? renderOptions(mulitpleChars):""}
                {singleChar ? renderSingleOption(singleChar): ""}
            </div>
            

            {mulitpleChars&& mulitpleChars.length > 30 ?
            <CSSTransition
            in = {scrollPosition > 1000}
            timeout={600}
            classNames="top-button-appear"
            unmountOnExit
            >
            <button className="top-button" onClick={() => window.scrollTo(0,0)}>
                <FontAwesomeIcon className="top-button-icon" icon={faChevronUp} />
            </button>
            </CSSTransition> 
            : ""}
            
        </div>
        </>
    )
}

export default Home;