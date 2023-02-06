import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard.tsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isCounting: 0,
      temperaturaDeseada: 0,
    };
  }

  setData = newData => {
    this.setState({
      data: newData,
    });
  }

  setIsCounting = (newVal) => {
    this.setState({
      isCounting: newVal,
    });
  };

  setTemperaturaDeseada = (newVal) => {
    this.setState({
      temperaturaDeseada: newVal,
    });
  };

  cleanData = (dataToClean) => {
    return dataToClean.filter((data) => data["field1"] != null);
  };

  readData = () => {
    const channelId = 2024259; // Reemplaza con el ID de tu canal
    const apiKey = "9UIR78D55KNTA01I"; // Reemplaza con tu clave API
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setData(this.cleanData(data.feeds)));

    console.log("Readed data");
  };

  async writeData(isCounting, temperaturaDeseada) {
    const WritingapiKey = "V18U20C2BKG99MQE"; // Reemplaza con tu clave API

    const rndNum = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const response = await fetch(
      `https://api.thingspeak.com/update?api_key=${WritingapiKey}&field1=${rndNum(0,10)}&field2=${rndNum(0,10)}&field3=${rndNum(0,1)}&field4=${rndNum(0,1)}&field5=${isCounting}&field6=${temperaturaDeseada}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === 0) console.log("No data");
        else console.log("Registro exitoso");
      })
      .catch((error) => console.error(error));
    // const response = await fetch(
    //   `https://api.thingspeak.com/update?api_key=${WritingapiKey}&field5=${isCounting}&field6=${temperaturaDeseada}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data === 0) console.log("No data");
    //     else console.log("Registro exitoso " + temperaturaDeseada);
    //   })
    //   .catch((error) => console.error(error));
  }

  componentDidMount() {
    let counter = 0

    this.intervalId = setInterval(() => {      

      if (counter == 3){
        this.writeData(this.state.isCounting, this.state.temperaturaDeseada)
        counter = 0
      }else
        counter++

      this.readData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        <Dashboard
          data={this.state.data}
          setIsCounting={this.setIsCounting}
          setTemperaturaDeseada={this.setTemperaturaDeseada}
          tempeDeseada={this.state.temperaturaDeseada}
        />
      </div>
    );
  }
}

export default App;