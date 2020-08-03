

export const saveReminder = (dataToSend) => {
    return fetch('http://localhost:3030/reminders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });
}