import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import {Collapse} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert";

function CreateRoomPage(props) {
  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(props.voteToSkip);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const update = props.update
  const roomCode = props.roomCode
  const updateCallback = props.updateCallback
  const navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      }),
    };
    fetch('/api/create-room/', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code));
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode
      }),
    };
    fetch('/api/update-room/', requestOptions)
      .then((response) => {
        if (response.ok){
          setSuccessMsg("Room update successfully!")
        }else{
          setErrorMsg("Error updating room...")
        }
      });
    updateCallback();
  };

  function renderCreateRoom(){
    return (
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
              color="primary"
              variant="contained"
              onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
  </Grid>
  );
  }

  function renderUpdateButton(){
    return(
        <Grid item xs={12} align="center">
          <Button
              color="primary"
              variant="contained"
              onClick={handleUpdateButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
    );
  }

  const title = update ? "Update Room" : "Create Room"
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse
            in={errorMsg != "" || successMsg != ""}
        >
          {successMsg != "" ? (<Alert severity="success" onClose={() => {setSuccessMsg("")}}>{successMsg}</Alert>)
              :
              (<Alert severity="error" onClose={() => {setErrorMsg("")}}>{errorMsg}</Alert>)}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText align="center">
            Guest Control of Playback State
          </FormHelperText>

          <RadioGroup row value={String(guestCanPause)} onChange={handleGuestCanPauseChange}>
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      {update ? renderUpdateButton() : renderCreateRoom()}
    </Grid>
  );
}

export default CreateRoomPage;
