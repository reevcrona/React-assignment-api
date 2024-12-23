
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXTwitter,faSquareFacebook,faSquareReddit } from '@fortawesome/free-brands-svg-icons';

import "../styles/Navbar.css";
import NavLogo from "../assets/Seker.svg";
function Navbar(){
    return(
        
        <header>
            <nav>
                <img className="nav-logo" src={NavLogo} alt="Navigation logo Seeker"></img>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/characters/page/1" >All characters</Link></li>
                    <li><Link >Contact</Link></li>
                    <li><Link >About</Link></li>
                </ul>
                <ul className="nav-icon-link">
                    <FontAwesomeIcon className="nav-icon" icon={faSquareXTwitter} />
                    <FontAwesomeIcon className="nav-icon" icon={faSquareFacebook} />
                    <FontAwesomeIcon className="nav-icon" icon={faSquareReddit} />
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;