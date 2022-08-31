import React, { useState, useEffect } from "react";
const DataContext = React.createContext();

function DataContextProvider(props) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setErorr] = useState('');

    useEffect(() => { loadData() }, []);

    const loadData = () => {
        fetch('/api/words')
            .then((result) => {
                if (result.ok) {
                    return result.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((data) => {
                setData(data);
                setIsLoaded(true);
            }).catch(error => {
                setIsLoaded(true);
                setErorr(error);
            });
    }

    const handleDelete = (e) => {
        const id = e.target.id;
        fetch(`/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(() => loadData())
            .catch(error => {
                setIsLoaded(true);
                setErorr(error);
            });
    }


    return (
        <DataContext.Provider value={{ data, isLoaded, handleDelete, loadData, error }}>
            {props.children}
        </DataContext.Provider>

    );
}

export { DataContextProvider, DataContext };