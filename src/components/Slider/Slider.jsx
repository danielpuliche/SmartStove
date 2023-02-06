import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Title from '../Title/Title';
import {ResponsiveContainer} from 'recharts';

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

export default function DiscreteSliderLabel(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <Box style={{marginLeft:"10%", width:"80%", marginTop:"8%"}}>
        <Slider
          aria-label="Always visible"
          defaultValue={props.temperaturaDeseada}
          getAriaValueText={valuetext}
          step={10}
          marks={marks}
          valueLabelDisplay="on"
          onChange={(event,value) => props.changeTemp(value)}
        />
        </Box>
      </ResponsiveContainer>
    </React.Fragment>
  );
}