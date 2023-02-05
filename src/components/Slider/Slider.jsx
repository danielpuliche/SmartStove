import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';
import {ResponsiveContainer} from 'recharts';
import Button from '@mui/material/Button';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 40,
    label: '40°C',
  },
  {
    value: 60,
    label: '60°C',
  },
  {
    value: 80,
    label: '80°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const API_KEY = "V18U20C2BKG99MQE";

function sendTemp(data) {
  const response = fetch(
    `https://api.thingspeak.com/update?api_key=${API_KEY}&field6=${data}`
  );

  if (response.ok) {
    console.log("Data escrito con éxito");
  } else {
    console.error("Error al escribir datos");
  }
}

export default function DiscreteSliderLabel(props) {

  const [tempDeseada, setTempDeseada] = useState(0);

  const handleChange = (event, newValue) => {
    setTempDeseada(newValue);
  }; 

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <Box style={{marginLeft:"10%", width:"80%", marginTop:"8%"}}>
        <Slider
          value = {tempDeseada}
          aria-label="Always visible"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={10}
          marks={marks}
          valueLabelDisplay="on"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={console.log("PRESS")}>Enviar temperatura</Button>
        </Box>
      </ResponsiveContainer>
    </React.Fragment>
  );
}