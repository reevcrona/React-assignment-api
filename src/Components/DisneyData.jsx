import {useState, useEffect } from "react";
import axios from "axios";
import "../styles/DisneyData.css";
import PlaceHolderImage from "../assets/No-Image-Placeholder.svg"

function DisneyData(){
    
    const [disneyData, setDisneyData] = useState([]);
    const [nextPage,SetNextPage] = useState("");
    const [prevPage,setPrevPage] = useState("");

    const [currentPage,setCurrentPage] = useState(1);
    const totalPages = 372;

    useEffect(() => {
        axios.get(`https://api.disneyapi.dev/character?pageSize=20`).then((res) => {
            console.log(res.data)
            setDisneyData(res.data.data)
            SetNextPage(res.data.info.nextPage)
            
        })
    },[])
    
    
    const getPage = (url) => {
        if(url){
            axios.get(url).then((res) => {
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
                 <img className="data-img" src={item.imageUrl ? item.imageUrl:PlaceHolderImage}></img>
                 <p style={{color:"white"}}>{item.films.length > 0 ? item.films:"No films"}</p>
             </div>
         )
        })
     }

     const apiCallPageIndex = (index) => {
        axios.get(`https://api.disneyapi.dev/character?page=${index}&pageSize=20`).then((res) => {
                setDisneyData(res.data.data)
                SetNextPage(res.data.info.nextPage)
                setPrevPage(res.data.info.previousPage)
                setCurrentPage(index)
        })
     }


     

     const getPageRange = () => {
        const numContainer = [];
        if(currentPage > 368){
            const start = totalPages - 5;
            const end  = totalPages;

            for (let i = start; i <= end; i++) {
                const item = <h2 className={i === currentPage ? "current-page-num" :"num"} 
                onClick={() => apiCallPageIndex(i)}>{i}</h2>
                    
                numContainer.push(item);
            }
        }else if (currentPage === 1){
            const start = currentPage;
            const end = start + 5 ; 
            console.log("Start:", start, "End:", end);  
            
            for (let i = start; i <= end; i++) {
                const item = <h2 className={i === currentPage ? "current-page-num" :"num"} 
                onClick={() => apiCallPageIndex(i)}>{i}</h2>
                    
                numContainer.push(item);
            }
        }else if (currentPage === 2){
            const start = currentPage - 1;
            const end = start + 5 ; 
            console.log("Start:", start, "End:", end);  
            
            for (let i = start; i <= end; i++) {
                const item = <h2 className={i === currentPage ? "current-page-num" :"num"} 
                onClick={() => apiCallPageIndex(i)}>{i}</h2>
                    
                numContainer.push(item);
            }
        }
        else{
            const start = currentPage - 2;
            const end = start + 5 ; 
            console.log("Start:", start, "End:", end);  
            
            for (let i = start; i <= end; i++) {
                const item = <h2 className={i === currentPage ? "current-page-num" :"num"} 
                onClick={() => apiCallPageIndex(i)}>{i}</h2>
                    
                numContainer.push(item);
            }
        }
        
        
        const firstPage = <h2 className="num" onClick={() => apiCallPageIndex(1)}>First page</h2>
        const lastPage = <h2 className="num" onClick={() => apiCallPageIndex(totalPages)}>Last page</h2>
        numContainer.unshift(firstPage)
        numContainer.push(lastPage)
        return numContainer;
    };

    return(
        <div className="disney-data-main-container">
           <button onClick={() => getPage(prevPage)}>Prev page</button>
           <button onClick={() => getPage(nextPage)} >Next page</button>
            <div className="disney-data-container">
                {disneyData.length > 0 ? renderData(disneyData) : <h1>No data</h1>}
            </div>
           <div className="page-range-container">{getPageRange()}</div>
        </div>
    )
}

export default DisneyData;