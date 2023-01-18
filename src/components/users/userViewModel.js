import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const userViewModel = (props) => {
    const {open, handleClose} = props;

    const modalCloseHandler = () => {
        handleClose(false)
    }
 
  return (
    <>
      <Dialog
        open={open}
        onClose={()=>{handleClose(false)}}
        aria-labelledby="alertmodalCloseHandler-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalCloseHandler}>Cencel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default userViewModel;