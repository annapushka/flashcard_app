import background from "../img/saveIcon.png";

function SaveButtonNew(props) {
    return (
        <button {...props} onClick={props.addNewWord} className="saveButton">
            <img src={background} alt="save" className="saveButton__img" />
        </button>
    );
}

export default SaveButtonNew;