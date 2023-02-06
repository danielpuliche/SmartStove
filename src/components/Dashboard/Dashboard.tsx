import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../Chart/Chart";
import Info from "../Info/Info";
import Slider from "../Slider/Slider";
import Temporizador from "../Temporizador/Temporizador";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

class DashboardContent extends React.Component<any, any> {
  intervalId: NodeJS.Timer;
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      lastData: 0,
      boquilla: 0,
      presencia: 0,
    };
  }

  setOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  setLastData = (newValue) =>{
    this.setState({
      lastData: newValue,
    });
  }

  setBoquilla = (newVal: any) => {
    try {
      this.setState({
        boquilla: newVal,
      });
    } catch (e1) {
      this.setState({
        boquilla: 0,
      });
    }
  };

  setPresencia = (newVal: any) => {
    try {
      this.setState({
        presencia: newVal,
      });
    } catch (e1) {
      this.setState({
        presencia: 0,
      });
    }
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {      

      this.setLastData(this.props.data[this.props.data.length - 1])

      try {
        this.setBoquilla(this.state.lastData.field3)
      } catch (e1) {
        this.setBoquilla(0)
      }

      try {
        this.setPresencia(this.state.lastData.field4)
      } catch (e2) {
        this.setPresencia(0)
      }
      
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  
  render() {    

    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute">
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              bgcolor: "#94dde6",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={2}>
                {/* Chart TEMPERATURA*/}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart
                      title="Temperatura"
                      data={this.props.data}
                      label="Celsius (°C)"
                      field={"field1"}
                      color={"red"}
                    />
                  </Paper>
                </Grid>
                {/* BOQUILLA */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Info title={"Boquilla"} data={this.state.boquilla} />
                  </Paper>
                </Grid>
                {/* Chart GAS*/}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart
                      title="Gas"
                      data={this.props.data}
                      label="Unidades"
                      field={"field2"}
                      color={"green"}
                    />
                  </Paper>
                </Grid>
                {/* PRESENCIA */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Info title={"Presencia"} data={this.state.presencia} />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={2}>
                {/* Ingresar temperatura */}
                <Grid item xs={12} md={8} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Slider
                      title={"Ingrese el valor de temperatura: "}
                      tempDeseada={this.props.tempDeseada}
                      changeTemp={this.props.chgTemp}
                    />
                  </Paper>
                </Grid>

                {/* Temporizador*/}
                <Grid item xs={12} md={8} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Temporizador />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

class Dashboard extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  changeTemperature = () => {
    this.props.setTemperaturaDeseada(10);
  };

  render() {
    return (
      <DashboardContent
        data={this.props.data}
        chgTemp={this.changeTemperature}
        tempDeseada={this.props.tempeDeseada}
      />
    );
  }
}

export default Dashboard;
