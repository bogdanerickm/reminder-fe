import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DateTimeField from '../components/DateTimeField';
import { useForm } from "react-hook-form";
import { saveReminder } from '../api';
import moment from 'moment';
import useNotification from '../components/NotificationMessage';

// import Notification from '../components/NotificationMessage';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  colorError: {
    color: 'red'
  }
}));

export default function SendReminder() {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(new Date())
  const [notifyByTelegram, setNotifyByTelegram] = useState(false)
  const [notifyByEmail, setNotifyByEmail] = useState(false)
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const [Notification , notifyError, notifySuccess] = useNotification()
 
  const onSubmit = async data => {
    const dataToNotify = {
      ...data,
      selectedDateTime: formatDateTime(),
      notifyByTelegram,
      notifyByEmail
    }
    // const {json : response} = await (await saveReminder(dataToNotify)).json();
    saveReminder(dataToNotify)
      .then(async data => {
        const { json: response } = await data.json();
        clear()
        notifySuccess('Reminder Saved Correctly')
      })
      .catch(e => {
        notifyError('Ops, Something went wrong')
      })
  }
  
  const clear = () => {
    setSelectedDate(new Date())
    setSelectedTime(new Date())
    setNotifyByTelegram(false)
    setNotifyByEmail(false)
    reset()
  }

  const formatDateTime = () => {
    let formattedDate = new moment(selectedDate).format('YYYY-MM-DD')
    let formattedTime = new moment(selectedTime).format('HH:mm')
    return new Date(`${formattedDate} ${formattedTime}`)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (time) => {
    setSelectedTime(time)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Reminder
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <DateTimeField date={selectedDate} dateHandler={handleDateChange} time={selectedTime} timeHandler={handleTimeChange} />
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" inputRef={register({ required: 'Please insert a valid Name', minLength: { value: 2, message: "Minimum of  char" }, maxLength: { value: 10, message: "Maximum of 10 char" } })} name="name" fullWidth label="Name" />
              <p className={classes.colorError}>{errors.name && errors.name.message}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" inputRef={register({ required: 'Please insert a valid Subject', minLength: { value: 1, message: "Minimun of 1 char" }, maxLength: { value: 20, message: "Subject has to be 10 chars maximun" } })} fullWidth label="Subject" name="subject" type="text" />
              <p className={classes.colorError}>{errors.subject && errors.subject.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" inputRef={register({ required: false, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" } })} fullWidth label="Email to" name="emailTo" />
              <p className={classes.colorError}>{errors.emailTo && errors.emailTo.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" inputRef={register({ required: true, maxLength: { value: 40, message: 'Maximum 40 chars' } })} fullWidth multiline rows={6} name="body" label="Body" type="text" />
              <p className={classes.colorError}>{errors.body && errors.body.message}</p>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value={notifyByTelegram} onChange={() => setNotifyByTelegram(!notifyByTelegram)} checked={notifyByTelegram} color="primary" />}
                label="I want to receive Telegram Notification."
              />
              <FormControlLabel
                control={<Checkbox value={notifyByEmail} onChange={() => setNotifyByEmail(!notifyByEmail)} checked={notifyByEmail} color="primary" />}
                label="I want to receive an Email Notification."
              />
            </Grid>
          </Grid>

          <Notification/>
          
          <Button fullWidth type="submit" variant="outlined" color="primary" className={classes.submit} >
            notify
          </Button>
        </form>
          {/* <Comp/> */}
      </div>
    </Container>
  );
}