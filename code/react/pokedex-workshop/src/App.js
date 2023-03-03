import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Header from './components/Header';
import List from './components/List';
import Create from './components/Create';


class App extends Component {

  render() {
    
    return (
      <div className="App">
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/list' element={<List/>} />
              <Route path='/create' element={<Create />} />
              <Route path='/edit' element={<Create />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
