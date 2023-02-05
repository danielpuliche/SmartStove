import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputNumber} from 'antd';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (!isCounting) return;
    const interval = setInterval(() => {
      setTimeRemaining(time => {
        if (time === 0 || time < 0) {
          clearInterval(interval);
          setIsCounting(false);
          return null;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCounting]);

  function startTimer() {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeRemaining(totalSeconds);
    setIsCounting(true);

  }

  return (
    <div>
        <Grid container >
            <Grid item xs={12} md={6} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <Typography component="p" variant="h8">
                        Horas: 
                    </Typography>
                    <InputNumber size="large" min={0} max={4} defaultValue={hours} onChange={(e) => setHours(Number(e))}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <Typography component="p" variant="h8">
                        Minutos: 
                    </Typography>
                    <InputNumber size="large" min={0} max={60} defaultValue={minutes} onChange={(e) => setMinutes(Number(e))}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <Typography component="p" variant="h8">
                        Segundos: 
                    </Typography>
                    <InputNumber size="large" min={0} max={60} defaultValue={seconds} onChange={(e) => setSeconds(Number(e))}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <Button onClick={startTimer} variant="contained" disabled={isCounting}>Empezar</Button>
                </Paper>
            </Grid>
        </Grid>
        
        {timeRemaining !== null ? (
        <p>
          Time remaining: {Math.floor(timeRemaining / 3600)} hours{" "}
          {Math.floor((timeRemaining % 3600) / 60)} minutes{" "}
          {timeRemaining % 60} seconds
        </p>
      ) : (
        <p>Enter a time above to start the timer</p>
      )}
    </div>
  );
}

export default Timer;