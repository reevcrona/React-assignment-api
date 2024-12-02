import {useState, useEffect } from "react";
import axios from "axios";
import "../styles/DisneyData.css";
import { useParams,useNavigate } from "react-router-dom";
import PlaceHolderImage from "../assets/No-Image-Placeholder.svg"

function DisneyData(){
    
    const [disneyData, setDisneyData] = useState([]);
    
    const {pageNumber} = useParams();
    const navigate = useNavigate();
    
    const currentPage = pageNumber? parseInt(pageNumber):1;
    const totalPages = 372;

    useEffect(() => {
        axios.get(`https://api.disneyapi.dev/character?page=${currentPage}&pageSize=20`).then((res) => {
            window.scrollTo(0,0);
            setDisneyData(res.data.data)
        })
    },[currentPage])
    
    


    const renderData = (data) => {
        return data.map((item,index) => {
         return (
             <div key={index}>
                 <h2 className="data-name">{item.name}</h2>
                 <img className="data-img" src={item.imageUrl ? item.imageUrl:PlaceHolderImage}></img>
                 <p style={{color:"white"}}>{item.films.length > 0 ? item.films:"No films"}</p>
             </div>
         )
        })
     }

     const apiCallPageIndex = (index) => {
        navigate(`/characters/page/${index}`);
     }


     const renderPageRange = (start,end,container) => {
        for (let i = start; i <= end; i++) {
            const item = <h2 key={i} className={i === currentPage ? "current-page-num" :"num"} 
            onClick={() => apiCallPageIndex(i)}>{i}</h2>
                
            container.push(item);
        }

     }

     const getPageRange = () => {
        const numContainer = [];
        if(currentPage > 368){
            const start = totalPages - 5;
            const end  = totalPages;
            renderPageRange(start,end,numContainer)
            
        }else if (currentPage === 1){
            const start = currentPage;
            const end = start + 5 ; 
            renderPageRange(start,end,numContainer)
        }else if (currentPage === 2){
            const start = currentPage - 1;
            const end = start + 5 ; 
            renderPageRange(start,end,numContainer)
        }
        else{
            const start = currentPage - 2;
            const end = start + 5 ; 
            renderPageRange(start,end,numContainer)
        }
        
        
        const prevPage = <button key={"prev-btn"} className="page-range-button" onClick={() => apiCallPageIndex(currentPage > 1 ? currentPage - 1:currentPage)}>Prev</button>;
        const nextPage = <button key={"next-btn"} className="page-range-button" onClick={() => apiCallPageIndex(currentPage < totalPages ? currentPage + 1:currentPage)} >Next</button>;
        numContainer.unshift(prevPage);
        numContainer.push(nextPage);
        return numContainer;
    };
    
    return(
        <div className="disney-data-main-container">
           
           
            <div className="disney-data-container">
                {disneyData.length > 0 ? renderData(disneyData) : <h1>No data</h1>}
            </div>
           <div className="page-range-container">{getPageRange()}</div>
        </div>
    )
}

export default DisneyData;