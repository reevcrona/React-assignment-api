import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import PlaceHolderImage from "../assets/No-Image-Placeholder.svg"
import axios from "axios";

import "../styles/CharacterCard.css";



function CharacterCard(){
    
    const {charId} = useParams();
    const [CharacterData,setCharacterData] = useState(null);
    
    useEffect(() => {
        axios.get(`https://api.disneyapi.dev/character/${charId}`).then((res) => {
            setCharacterData(res.data.data)
            console.log(res.data.data)
        })
    },[charId])

    const renderCharacterData = () => {
        return (
            <div className="character-page-container">
                <img className="character-page-image" src={CharacterData.imageUrl ? CharacterData.imageUrl:PlaceHolderImage}></img>
                <h1 className="character-page-name">{CharacterData.name}</h1>
                {CharacterData.films.length > 0 && <h4 className="films-header">Films {CharacterData.name} has appeared in</h4>} 
                <ul className="films-list">
                    {CharacterData.films.map((item) => <li className="films-list-item">{item}</li>)}
                </ul>
                {CharacterData.shortFilms.length > 0 && <h4 className="films-header">Short films {CharacterData.name} has appeared in</h4>}
                <ul className="films-list">
                {CharacterData.shortFilms.map((item) => <li className="films-list-item">{item}</li>)}
                </ul>
                {CharacterData.tvShows.length > 0 && <h4 className="films-header">Tv shows {CharacterData.name} has appeared in</h4>}
                <ul className="films-list">
                {CharacterData.tvShows.map((item) => <li className="films-list-item">{item}</li>)}
                </ul>
                {CharacterData.videoGames.length > 0 && <h4 className="films-header">Video games {CharacterData.name} has appeared in</h4>}
                <ul className="films-list">
                {CharacterData.videoGames.map((item) => <li className="films-list-item">{item}</li>)}
                </ul>
            </div>
        )
    }

    return (
        <>
            {CharacterData ? renderCharacterData() : <h1 className="loading-text">Loading Content...</h1>}
        </>
    )
}

export default CharacterCard;