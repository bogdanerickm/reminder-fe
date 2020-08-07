
import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function useNotification() {
    const [color, setColor] = useState('success')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    
    const notifySuccess = (message) => {
        setColor('success')
        setMessage(message)
        setOpen(true)
    }

    const notifyError = (message) => {
        setColor('error')
        setMessage(message)
        setOpen(true)
    }

    const Notification = () => {
        return <Snackbar open={open} autoHideDuration={1600} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color}>
                {message}
            </Alert>
        </Snackbar>
    }

    return [Notification, notifyError, notifySuccess]
}

