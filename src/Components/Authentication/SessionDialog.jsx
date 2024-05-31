import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react'
import { DarkButton } from '../../Style/StyledComponents/Buttons';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const SessionDialog = ({handleClose,open}) => {
  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"The end of session!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          'Your session is not valid. Please log in again.'
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent:"center"}}>
          <DarkButton 
          sx={{width:"50%"}}
          onClick={handleClose}>Agree</DarkButton>
        </DialogActions>
      </Dialog>
  )
}

export default SessionDialog