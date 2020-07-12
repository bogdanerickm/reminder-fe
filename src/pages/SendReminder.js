import React, {useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  const classes                             = useStyles();
  const [selectedDate, setSelectedDate]     = useState(new Date());
  const [selectedTime, setSelectedTime]     = useState(new Date());
  const [sendByTelegram, setSendByTelegram] = useState(false);
  const [sendByEmail, setSendByEmail]       = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    console.log('datita',data);
    const dataToSend = {
      ...data,
      selectedDate,
      selectedTime,
      sendByTelegram,
      sendByEmail
    }
    console.log('datita completa',dataToSend);
  }
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

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
              <DateTimeField date={selectedDate} dateHandler={handleDateChange} time={selectedTime} timeHandler={handleTimeChange}/>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" inputRef={register({ required: true, minLength:1, maxLength: 10 })} name="firstName" fullWidth label="First Name" />
              <p className={classes.colorError}>{errors.firstName && errors.firstName.message}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" inputRef={register({ required: true, minLength:1, maxLength: 10 })} fullWidth label="Last Name" name="lastName" />
              {errors.lastName && errors.lastName.message}
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" inputRef={register({ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address"}})} fullWidth label="Email from" name="emailFrom" />
              <p className={classes.colorError}>{errors.emailFrom && errors.emailFrom.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" inputRef={register({ required: false, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address"}})} fullWidth label="Email to" name="emailTo"/>
              <p className={classes.emailTo}>{errors.emailTo && errors.emailTo.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" inputRef={register({ required: true, maxLength: 40 })} fullWidth multiline rows={6} name="body" label="body" type="text" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value={sendByTelegram} onChange={()=> setSendByTelegram(!sendByTelegram)} color="primary" />}
                label="I want to receive Telegram Notification."
              />
              <FormControlLabel
                control={<Checkbox value={sendByEmail} onChange={()=> setSendByEmail(!sendByEmail)} color="primary" />}
                label="I want to receive an Email Notification."
              />
            </Grid>
          </Grid>
          <Button fullWidth type="submit" variant="outlined" color="primary" className={classes.submit} >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
}