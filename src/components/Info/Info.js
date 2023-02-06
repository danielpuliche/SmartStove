import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';

const isON = (data) => {if (parseInt(data) == 0) {
    return "OFF"
  }else{
    return "ON"
  }}

export default function Deposits(props) {
  const date = new Date(); 

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h1">
        {isON(props.data)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {date.toLocaleDateString()}
      </Typography>
    </React.Fragment>
  );
}