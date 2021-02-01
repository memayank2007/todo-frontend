import React, { useState } from 'react'
import {
  List,
  Button,
  TextField,
  ListItem,
  ListItemText
} from '@material-ui/core'

const Item = ({ todoItem, deleteTodo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false)
  const [todo, setTodo] = useState(todoItem.title)

  const handleEditChange = e => {
    setTodo(e.target.value)
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleEditSubmit = _id => {
    const todoObject = {
      title: todo
    }
    fetch(`http://localhost:5000/apis/todos/${_id}`, {
      method: 'Put',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(todoObject)
    })
      .then(res => res.json())
      .then(response => {
        const editedList = todos.map(oneTodo => {
          if (oneTodo._id === _id) {
            console.log(_id)
            oneTodo.title = todo
          }
          return oneTodo
        })

        setTodos(editedList)
        handleEdit()
        console.log(todo, _id)
      })
      .catch(error => console.log(error))
  }

  return (
    <ListItem>
      {' '}
      {!edit ? (
        <>
          <ListItemText primary={todoItem.title} />
          <Button variant='contained' onClick={handleEdit}>
            Edit
          </Button>{' '}
          <Button
            variant='contained'
            color='secondary'
            onClick={() => deleteTodo(todoItem._id)}
          >
            Delete
          </Button>
        </>
      ) : (
        <>
          {' '}
          <input
            type='text'
            value={todo}
            name='todo'
            onChange={handleEditChange}
          />{' '}
          <button onClick={handleEdit}> Cancel </button>{' '}
          <button type='submit' onClick={() => handleEditSubmit(todoItem._id)}>
            Save{' '}
          </button>{' '}
        </>
      )}{' '}
    </ListItem>
  )
}

export default Item
