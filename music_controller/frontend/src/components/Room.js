import React, { useState, useEffect } from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Grid, Button, Typography} from "@material-ui/core"

function Room({leaveRoomCallback}) {
  const { roomCode } = useParams();

  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);


  function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
          if (!response.ok){
              leaveRoomCallback();
              navigate("/");
          }
          return response.json()
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }



  const LeaveButtonPressed = () => {
      const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
      fetch('/api/leave-room/', requestOptions).then((_response) =>{
          leaveRoomCallback();
          navigate("/");
      });
  }

  return (
      <Grid container spacing={1}>
          <Grid item xs={12} align="center">
              <Typography variant="h6" component="h6">
                  Code: {roomCode}
              </Typography>
          </Grid>
          <Grid item xs={12} align="center">
              <Typography variant="h6" component="h6">
                  Vote: {votesToSkip}
              </Typography>
          </Grid>
          <Grid item xs={12} align="center">
              <Typography variant="h6" component="h6">
                  Can Pause: {guestCanPause.toString()}
              </Typography>
          </Grid>
          <Grid item xs={12} align="center">
              <Typography variant="h6" component="h6">
                  Host: {isHost.toString()}
              </Typography>
          </Grid>
          <Grid item xs={12} align="center">
              <Button variant="contained" color="secondary" onClick={LeaveButtonPressed}>
                  Leave Room
              </Button>
          </Grid>
      </Grid>

  );
}

export default Room;