import React, { useEffect } from 'react';
import './App.css';
import Welcome from './components/Header';

const url = "https://consensys-93520259f634.herokuapp.com/api/createRoom?user=frd";

function App() {
  // const { result } = useCreateRoom('sai');
  const [data, setData] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
         const response = await fetch(url)
          const newData = await response.json()
          setData(newData)
      };

      fetchData();
  }, [])   
  
  return (
    <>
     <div className="App">
      <header className="App-header">
        <Welcome name="Sai"/>
        <p>
          {data}
        </p>
      </header>
    </div>
    </>
  );
}

export default App;
