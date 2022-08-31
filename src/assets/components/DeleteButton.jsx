function DeleteButton(props) {
    return (
        <button className="deleteButton" onClick={props.handleDelete} id={props.id}>Delete</button>
    );
}

export default DeleteButton;