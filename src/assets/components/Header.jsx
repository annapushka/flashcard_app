import SearchBox from "./SearchBox";
import Logo from "../img/languageIcon.png";
import Img from "../img/brainIcon.png";

import {
    HashRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

function Header(props) {
    return (
        <div className="header">
            <div className="header__nav">
                <Link to='/'>
                    <img src={Logo} alt="logo" className="header__logo" />
                </Link>

                <Link to='/game'>
                    <div className="header__nav-text">Let's train...</div>
                    <img src={Img} alt="play" className="header__nav-img" />
                </Link>
                <div className="header__nav-text header__nav-text_say">"With the possible exception of the equator, everything begins somewhere"<br /> - C.S. Lewis</div>
            </div>
            <SearchBox />
        </div>
    );
}

export default Header;