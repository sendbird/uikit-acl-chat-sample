import React, { useState, useEffect } from "react";

import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function CreateChannelModal(props) {
  const { setShowCreateChannelModal, onChannelCreation, userId } = props;
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([userId]);
  const [count, setCount] = useState(0);

  const createChannel = (e) => {

    const createChannel = async () => {
      const res = await fetch('https://chatsamples.com/acl/channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds: participants }),
      });
      const jsonResponse = await res.json();
      console.log(jsonResponse);
      onChannelCreation(jsonResponse.data.channel_url);
    }

    createChannel();

  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://chatsamples.com/acl/users');
        const jsonResponse = await res.json();
        console.log(jsonResponse.users);
        setUsers(jsonResponse.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const closeForm = () => {
    setShowCreateChannelModal(false);
  };

  const selectedCount = (e) => {
    let id = e.target.id;
    console.log("e=", e.target.id);
    if (!participants.includes(id)) {
      const updatedParticipants = [...participants, id];
      console.log('update=', updatedParticipants)
      setParticipants(updatedParticipants);
      setCount(updatedParticipants.length);
    } else {
      const updatedParticipants = participants.filter(function (item) {
        return item !== id;
      });
      setParticipants(updatedParticipants);
      setCount(updatedParticipants.length);
    }
  };

  return (
    <div className="bg-modal" style={{ display: "flex" }}>
      <div className="modal-content-create-channel">
        <div className="form_close_btn" onClick={closeForm}>
          +
        </div>
        <h3 id="create-channel-form-title">New channel</h3>
        <h5 className="create-channel-member-count">{count < 1 ? 0 : count - 1} selected</h5>
        <div className="create_channel_wrap">
          <FormGroup className="user-select-form">

            {users.map((user) => {
              return (
                <FormControlLabel
                  control={<Checkbox id={user.id} onClick={(e) => selectedCount(e)} />}
                  id="user-information"
                  label={
                    <>
                      <img src={user.image} key="1" alt="profile-img" className="profile-img" />
                      <span id="user-name" >{user.name}</span>

                    </>
                  }
                />
              )
            })}

          </FormGroup>
          <Stack spacing={2} direction="row" className="button-container">
            <Button variant="contained" onClick={createChannel}>Submit</Button>
            <Button variant="outlined" onClick={closeForm}>
              Cancel
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
export default CreateChannelModal;
