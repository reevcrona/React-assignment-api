import axios from "axios";
import "../styles/Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home(){
    
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const [mulitpleChars,setMultipleChars] = useState(null);

    const getSpecificCharacter = () => {
        axios.get(`https://api.disneyapi.dev/character?name=${encodeURIComponent(search)}`).then((res) => {
            

            const results = res.data.data;

            if(results){
                if(results.length > 1){
                    console.log("Mulitple was found: ", results)
                    setMultipleChars(results)
                }else{
                    navigate(`/character/${results.name}`)
                    console.log("One was found: ", results)
                }
                
            }
        })
    }
    
    const renderOptions = (data) => {
       return data.map((item,index) => <h2 key={index}>{item.name}</h2>)
    }

    return (
        <div>
            <h1 className="home-header">Home</h1>
            <input onChange={(e) => setSearch(e.target.value)} type="text"></input>
            <button onClick={getSpecificCharacter}>Go</button>
            {mulitpleChars ? renderOptions(mulitpleChars):""}

        </div>
    )
}

export default Home;