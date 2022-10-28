import React, { useState } from "react";
import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function CreateChannelModal(props) {
  const { setShowCreateChannelModal } = props;
  const { participants, setParticipants } = useState([]);
  const { count, setCount } = useState(0);

  const createChannel = (e) => {
    console.log("Create channel");
    //create channel with list of participants included in array

  };

  const closeForm = () => {
    setShowCreateChannelModal(false);
  };

  const selectedCount = (e) => {
    let id = e.target.id;
    // members.push(id)
    // console.log('partiticipants=', members.length)
    console.log("e=", e.target.id);
    if (!participants.includes(id)) {
      setParticipants(participants.push(id));
      setCount(participants.length);
    } else {
      let newParticipants = participants.filter(function (item) {
        return item !== id;
      });
      setParticipants(newParticipants);
      setCount(newParticipants.length);
    }
  };

  return (
    <div className="bg-modal" style={{ display: "flex" }}>
      <div className="modal-content-create-channel">
        <div className="form_close_btn" onClick={closeForm}>
          +
        </div>
        <h3 id="create-channel-form-title">New channel</h3>
        <h5 className="create-channel-member-count">{count} selected</h5>
        <div className="create_channel_wrap">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox id="1" onClick={(e) => selectedCount(e)} />}
                id="user-information"
                label={
                  <>
                      <img src="https://img.freepik.com/free-photo/headshot-pleased-hipster-guy-dressed-maroon-t-shirt_176532-8161.jpg?w=2000" key="1" alt="profile-img" className="profile-img" />
                   <span id="user-name" >Chris</span>
                     
                  </>
              }
              />
              <FormControlLabel
                control={<Checkbox id="2" onClick={(e) => selectedCount(e)} />}
                id="user-information"
                label={
                  <>
                      <img src="https://thumbs.dreamstime.com/b/headshot-handsome-bearded-man-smiling-standing-against-white-background-headshot-handsome-bearded-man-smiling-standing-202880713.jpg" key="1" alt="profile-img" className="profile-img" />
                     <span id="user-name">James</span> 
                     
                  </>
              }
              />
              <FormControlLabel
                control={<Checkbox id="3" onClick={(e) => selectedCount(e)} />}
                id="user-information"
                label={
                  <>
                      <img src="https://i.pinimg.com/originals/5a/c9/d9/5ac9d91aee8d3b1cc377f87220379f88.jpg" key="1" alt="profile-img" className="profile-img" />
                     <span id="user-name">Sravan</span> 
                     
                  </>
              }
              />
              <Stack spacing={2} direction="row" className="button-container">
                <Button variant="contained" onClick={createChannel}>Submit</Button>
                <Button variant="outlined" onClick={closeForm}>
                  Cancel
                </Button>
              </Stack>
            </FormGroup>
        </div>
      </div>
    </div>
  );
}
export default CreateChannelModal;
