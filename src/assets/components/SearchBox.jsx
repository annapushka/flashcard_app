import { observer, inject } from "mobx-react";
import React, { useState } from "react";


function SearchBox({ wordStore }) {

    //search
    const [saerchTearm, setSearchTerm] = useState('');

    const saerchHandler = (e) => {
        setSearchTerm(e.target.value);
        wordStore.search(saerchTearm);
    }

    return (
        <div className="searchBox">
            <input type="text" className="searchBox__input" placeholder="Search..." onChange={saerchHandler} value={saerchTearm} />
        </div>
    );
}

export default inject(["wordStore"])(observer(SearchBox));
