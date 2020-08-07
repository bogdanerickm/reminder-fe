import { API_URL } from "./urls";


export const saveReminder = (dataToSend) => {
    return fetch(API_URL + 'reminders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });
}