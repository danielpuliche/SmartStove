import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard.tsx';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    const intervalId = setInterval(() => {

      const channelId = 2024259; // Reemplaza con el ID de tu canal
      const apiKey = '9UIR78D55KNTA01I'; // Reemplaza con tu clave API
      const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => setData(data.feeds));

      return () => clearInterval(intervalId)

    },2000)

    
  }, []);

  return (
    <div>
      <Dashboard data={data}/>
    </div>
  );
};

export default App;