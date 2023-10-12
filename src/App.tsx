import React, { ReactElement } from 'react';
import './App.css';
import Welcome from './components/Header';

function App(): ReactElement {
  return (
    <>
     <div className="App">
      <header className="App-header">
        <Welcome name="Sai"/>
      </header>
    </div>
    </>
  );
}

export default App;
