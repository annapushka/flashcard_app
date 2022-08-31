
function SearchBox(props) {
    return (
        <div className="searchBox">
            <input type="text" className="searchBox__input" placeholder="Search..." onChange={props.saerchHandler} value={props.saerchTearm} />
        </div>
    );
}

export default SearchBox;