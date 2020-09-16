import React, { useState, useEffect } from 'react';
import Board from 'react-trello'
import { getReminders } from '../api';


export default function BoardPage() {
  const [reminders, setReminders] = useState([])
  const mapReminders = x => {
    return {
        id: x._id,
        title: x. name,
        description: x.body,
        label: '2/2',
        draggable: true
    }
  }

  const boardData = {
      lanes: [
        {
          id: 'lane1',
          title: 'Planned Tasks',
          label: '2/2',
          cards: [
            {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: true},
            {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
          ]
        },
        {
          id: 'lane2',
          title: 'Completed',
          label: '0/0',
          // cards: [
          //   {id: 'Card3', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: true},
          //     {id: 'Card4', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
          // ]
          cards: reminders
        }
      ]
  }

  useEffect(() => {
    getReminders()
        .then(async data => {
          setReminders((await data.json()).data.map(mapReminders))
        })
        .catch(e => {
            console.log(e);
        })
    }, [])
    
    console.log(reminders);

   
    return(
        <div>
          <Board data={boardData} draggable editable editLaneTitle />
        </div>
    )
}