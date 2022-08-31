function AddButton(props) {
    return (
        <button className="addButton" onClick={props.handleAdd}>Add</button>
    );
}

export default AddButton;