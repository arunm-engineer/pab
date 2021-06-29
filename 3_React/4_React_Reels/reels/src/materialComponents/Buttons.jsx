import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// Any name can be used while importing for things like export default 
import Sender from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function Buttons() {
    return (
        <div>
            <h2>Buttons</h2>
            <Button variant="contained">Hello</Button>
            <Button variant="outlined">Hello</Button>
            <Button variant="text">Hello</Button>

            <h2>Color &amp;&#38; Event Listeners</h2>
            {/* inline styling */}
            <Button variant="contained" style={{
                backgroundColor: "lightpink"
            }}>Hello</Button>
            <Button variant="outlined" href="https://material-ui.com/components/icons/#icons" 
            color="primary" >Hello</Button>
            <Button variant="text" color="secondary">Hello</Button>
            <Button variant="contained" color="primary" onClick={() => {alert("Hello")}}>Hello</Button>
            <Button variant="contained" color="secondary" onClick={() => {alert("Bye")}}>Bye</Button>

            <h2>Size</h2>
            <Button variant="contained" size="large" color="primary">Send</Button>
            <Button variant="contained" size="small" color="secondary">Delete</Button>

            <h2>Icons</h2>
            <Button variant="contained" startIcon={<Sender/>} color="primary">Hello</Button>
            <Button variant="contained" endIcon={<DeleteIcon/>} size="small" color="secondary">Hello</Button>

            <h2>More on icons</h2>
            {/* With animation. Icon Button changes it's by color by default */}
            <IconButton>
                <Sender onClick={() => {
                alert('Sent');
            }}></Sender>
            </IconButton>
            {/* Without animation */}
            <DeleteIcon style={{
                color: "aqua"
            }} onClick={() => {
                alert('Deleted');
            }} ></DeleteIcon>
        </div>
    )
}

export default Buttons
