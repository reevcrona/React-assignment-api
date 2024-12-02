import {useState, useEffect } from "react";
import axios from "axios";
import "../styles/DisneyData.css";

function DisneyData(){
    
    const [disneyData, setDisneyData] = useState([]);
    const [nextPage,SetNextPage] = useState("");
    const [prevPage,setPrevPage] = useState("");

    useEffect(() => {
        axios.get(`https://api.disneyapi.dev/character?pageSize=20`).then((res) => {
            console.log(res.data)
            setDisneyData(res.data.data)
            SetNextPage(res.data.info.nextPage)
            
        })
    },[])
    
    const getNextPage = () => {
        axios.get(nextPage).then((res) => {
            setDisneyData(res.data.data)
            SetNextPage(res.data.info.nextPage)
            setPrevPage(res.data.info.previousPage)
        })
    }

    const getPrevPage = () => {
       if(prevPage){
            axios.get(prevPage).then((res) => {
                setDisneyData(res.data.data)
                SetNextPage(res.data.info.nextPage)
                setPrevPage(res.data.info.previousPage)
            })
       }
        
    }
    const renderData = (data) => {
        return data.map((item,index) => {
         return (
             <div key={index}>
                 <h2 className="data-name">{item.name}</h2>
                 <img className="data-img" src={item.imageUrl}></img>
             </div>
         )
        })
     }

    return(
        <div className="disney-data-main-container">
           <button onClick={getPrevPage}>Prev page</button>
           <button onClick={getNextPage} >Next page</button>
            <div className="disney-data-container">
                {disneyData.length > 0 ? renderData(disneyData) : <h1>No data</h1>}
            </div>
            
        </div>
    )
}

export default DisneyData;