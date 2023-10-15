import React, {useEffect, useState} from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
    Navigate
} from "react-router-dom";
import {Grid, Typography, ButtonGroup, Button} from "@material-ui/core";

function HomePage(){
  const [roomCode, setRoomCode] = useState(null)
  useEffect(() => {
    async function FetchData(){
      fetch('/api/user-in-room')
          .then((response) => response.json())
          .then((data) => {
            setRoomCode(data.code)
          })
    }
    FetchData();
  }, []);


  const ClearRoomCode = () =>{
      setRoomCode(null)
  }

  function renderHomePage(){
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
  return (
      <Router>
        <Routes>
          <Route
              exact
              path="/"
              element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()} />
          <Route exact path="/join" element={<RoomJoinPage />} />
          <Route path="/join/:roomId" element={<RoomJoinPage />} />
          <Route exact path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode"
                 element={<Room leaveRoomCallback={ClearRoomCode} />} />
        </Routes>
      </Router>
    );
}

export default HomePage;