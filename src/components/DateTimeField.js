import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DateTimeField({date, dateHandler, time, timeHandler}) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Grid item xs={12} sm={5}>
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Select Date"
            format="MM/dd/yyyy"
            value={date}
            onChange={dateHandler}
            />
        </Grid>
        <Grid item xs={12} sm={5}>
            <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Select Time"
            value={time}
            onChange={timeHandler}
            />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
