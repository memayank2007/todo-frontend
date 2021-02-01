import React, { useState, useEffect } from 'react'
import { Container, Button, TextField, List } from '@material-ui/core'

import Item from './Item'

import '../Styles/Todo.css'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  const fetchData = React.useCallback(() => {
    fetch(`http://localhost:5000/apis/todos`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json'
      })
    })
      .then(res => res.json())
      .then(response => {
        setTodos(response.todos)
      })
      .catch(error => console.log(error))
  }, [])

  React.useEffect(
    () => {
      fetchData()
    },
    [fetchData]
  )

  const handleChange = e => {
    setTodo(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (todo === '') {
      return
    }
    let todoObject = {
      title: todo
    }
    fetch(`http://localhost:5000/apis/todos`, {
      method: 'Post',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(todoObject)
    })
      .then(res => res.json())
      .then(response => {
        todoObject._id = setTodos([...todos, todoObject])
        setTodo('')
      })
      .catch(error => console.log(error))
  }

  const deleteTodo = _id => {
    fetch(`http://localhost:5000/apis/todos/${_id}`, {
      method: 'Delete',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(response => {
        setTodos(todos.filter(t => t._id != _id))
      })
      .catch(error => console.log(error))
  }

  return (
    <Container maxWidth='sm'>
      {' '}
      <div>
        {' '}
        <h3>Task Management </h3>{' '}
        <div>
          {' '}
          <form onSubmit={handleSubmit}>
            <label>
              <TextField
                id='standard-basic'
                label='Add a task ...'
                value={todo}
                name='todo'
                onChange={handleChange}
              />{' '}
            </label>{' '}
            <Button variant='contained' color='primary' type='Submit'>
              Submit
            </Button>
          </form>{' '}
        </div>{' '}
        <div>
          {' '}
          {todos.length > 0 ? (
            <List>
              <h3> Todo list </h3>{' '}
              {todos.map(todoItem => {
                return (
                  <Item
                    todoItem={todoItem}
                    deleteTodo={deleteTodo}
                    setTodos={setTodos}
                    todos={todos}
                    key={todoItem._id}
                  />
                )
              })}{' '}
            </List>
          ) : (
            <div> You have no todos </div>
          )}{' '}
        </div>{' '}
      </div>{' '}
    </Container>
  )
}

export default Todo
