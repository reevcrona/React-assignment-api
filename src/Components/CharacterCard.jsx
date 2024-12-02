import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

import "../styles/CharacterCard.css";



function CharacterCard(){
    
    const {charId} = useParams();
    const [CharacterData,setCharacterData] = useState(null);
    
    useEffect(() => {
        axios.get(`https://api.disneyapi.dev/character/${charId}`).then((res) => {
            setCharacterData(res.data.data)
        })
    },[charId])

    const renderCharacterData = () => {
        return (
            <div>
                <h1 className="card-header">{CharacterData.name}</h1>
                <img src={CharacterData.imageUrl}></img>
                <p className="card-id">{CharacterData._id}</p>
                <p className="card-id">{CharacterData.tvShows}</p>
            </div>
        )
    }

    return (
        <div>
            {CharacterData ? renderCharacterData() : <h1>Loading...</h1>}
        </div>
    )
}

export default CharacterCard;