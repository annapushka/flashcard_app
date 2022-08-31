import './assets/styles/styles.css'
import './assets/styles/normalize.css'
import WordList from './assets/components/WordList';
import Header from './assets/components/Header';
import CardSlider from './assets/components/CardSlider';
import NoMatch from './assets/components/NoMatch';
import Error from './assets/components/Error';
import { useState, useContext} from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { DataContext } from "../src/assets/components/DataContextProvider";
import Loading from './assets/components/Loading';



function App(props) {

  const { isLoaded, error } = useContext(DataContext);

  //search
  const [saerchTearm, setSearchTerm] = useState('');

  function saerchHandler (e) {
    setSearchTerm(e.target.value);
  }

  return (
      <Router>
        {error ? (
          <Error/>
        ) : (
          <div className="App">
          {isLoaded ? (
            <>
              <Header saerchHandler={saerchHandler} value={saerchTearm}></Header>
              <Routes>
                <Route exact path='/game' element={<CardSlider/>} />
                <Route exact path='/' element={<WordList saerchTearm={saerchTearm}/>} />
                <Route path="*" element={<NoMatch/>} />
              </Routes>
            </>
          ) : (
            <Loading/>
          )} 
          </div>
        )}
      </Router>
    );
}

export default App;
