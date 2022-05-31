import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const MuiAlert = ({ message, show, hide, type }) => {
    function handleClose(event, reason){
        if(reason=="clickaway")
        {return}
        hide();
    }

    return (
    
  <Snackbar open={show}
        autoHideDuration={2000}
        onClose={hide}>
             <Alert severity={type}>
                 {message}
             </Alert>
          </Snackbar>
    );
  };
export default MuiAlert