import './assets/styles/styles.css'
import './assets/styles/normalize.css'
import WordList from './assets/components/WordList';
import Header from './assets/components/Header';
import CardSlider from './assets/components/CardSlider';
import NoMatch from './assets/components/NoMatch';
import Error from './assets/components/Error';
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { observer, inject } from "mobx-react";
import Loading from './assets/components/Loading';



function App({ wordStore }) {

  useEffect(() => { wordStore.loadData() }, []);

  return (
      <Router>
        {wordStore.error ? (
          <Error/>
        ) : (
          <div className="App">
          {wordStore.isLoaded ? (
            <>
              <Header/>
              <Routes>
                <Route exact path='/game' element={<CardSlider/>} />
                <Route exact path='/' element={<WordList/>} />
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

export default inject(["wordStore"])(observer(App));
