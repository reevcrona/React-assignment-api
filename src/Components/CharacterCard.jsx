import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";





function CharacterCard(){
    
    const {dataChar} = useParams();
    const [CharacterData,setCharacterData] = useState(null);
    
    useEffect(() => {
        axios.get(`https://api.disneyapi.dev/character?name=${dataChar}`).then((res) => {
            setCharacterData(res.data.data)
        })
    },[dataChar])

    const renderCharacterData = () => {
        return (
            <div>
                <h1>{CharacterData.name}</h1>
                <img src={CharacterData.imageUrl}></img>
                <p>{CharacterData._id}</p>
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