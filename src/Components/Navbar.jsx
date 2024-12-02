
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/characters/page/1" >All characters</Link></li>
            <li><Link >Contact</Link></li>
            <li><Link >About</Link></li>
        </ul>
    )
}

export default Navbar;