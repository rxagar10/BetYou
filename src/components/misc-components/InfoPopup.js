import React, {useState} from "react";
import {Popover} from "@material-ui/core";

function InfoPopup(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const infoStyle = {
    border: "2px solid #808080",
    width: "15px",
    height: "15px",
    padding: "2px 0 0 0",
    borderRadius: "100%",
    fontFamily: "Hoefler Text, serif",
    color: "#808080",
    cursor: "pointer",
  }

  const textStyle = {
    border: "1px solid #D3D3D3",
    borderRadius: "2px",
    backgroundColor: "#D3D3D3",
    color: "#565656",
    fontSize: "15px",
    width: "150px",
    height: "min-content",
    minHeight: "100px",
    overflowY: "scroll",
  }

  return (
      <div className={props.className}>
        <div aria-describedby={id} variant="contained" color="primary" style={infoStyle} onClick={handleClick}>i</div>

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}

        >
          <div style={textStyle}>{props.text}</div>
        </Popover>
      </div>
  );
}

export default InfoPopup;