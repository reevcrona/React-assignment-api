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
             <div className="character-container" key={index}>
                 <img className="character-image" src={item.imageUrl ? item.imageUrl:PlaceHolderImage}></img>
                 <h2 className="character-name">{item.name}</h2>
                 <button className="character-button" onClick={() => navigate(`/character/${item._id}`)}>Character page</button>
             </div>
         )
        })
     }

     const apiCallPageIndex = (index) => {
        navigate(`/characters/page/${index}`);
     }


     const renderPageRange = (start,end,container,notCloseToEnd) => {
        for (let i = start; i <= end; i++) {
            const item = <button key={i} className={i === currentPage ? "current-page-num" :"num"} 
            onClick={() => apiCallPageIndex(i)}>{i}</button>
                
            container.push(item);
        }
        if(notCloseToEnd){
            const dots = <span className="dots">...</span>;
            const lastPagebtn = <button className="num" onClick={() => apiCallPageIndex(totalPages)}>{totalPages}</button> 

            container.push(dots)
            container.push(lastPagebtn)
        }
     }

     const getPageRange = () => {
        const numContainer = [];
        if(currentPage > 368){
            const start = totalPages - 4;
            const end  = totalPages;
            renderPageRange(start,end,numContainer,false)
            
        }else if (currentPage === 1){
            const start = currentPage;
            const end = start + 4 ; 
            renderPageRange(start,end,numContainer,true)
        }else if (currentPage === 2){
            const start = currentPage - 1;
            const end = start + 4 ; 
            renderPageRange(start,end,numContainer,true)
        }
        else{
            const start = currentPage - 2;
            const end = start + 4 ; 
            renderPageRange(start,end,numContainer,true)
        }
        
        
        const prevPage = <button key={"prev-btn"} className="page-range-button prev-btn" onClick={() => apiCallPageIndex(currentPage > 1 ? currentPage - 1:currentPage)}>Prev</button>;
        const nextPage = <button key={"next-btn"} className="page-range-button next-btn" onClick={() => apiCallPageIndex(currentPage < totalPages ? currentPage + 1:currentPage)} >Next</button>;
        numContainer.unshift(prevPage);
        numContainer.push(nextPage);
        return numContainer;
    };
    
    return(
        <div className="disney-data-main-container">
            <div className="character-render-container">
                {disneyData.length > 0 ? renderData(disneyData) : <h1 className="loading-text">Loading Content...</h1>}
            </div>
           <div className="page-range-container">{getPageRange()}</div>
        </div>
    )
}

export default DisneyData;