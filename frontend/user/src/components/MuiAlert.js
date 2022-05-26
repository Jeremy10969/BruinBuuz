import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const MuiAlert = (props) => {
    const [open, setOpen] = useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity={props.type}>
                {props.content}
            </Alert>
        </Snackbar>
    );
}

export default MuiAlert