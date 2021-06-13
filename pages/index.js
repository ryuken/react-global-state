import React from 'react'

import { GlobalState, useGlobalState } from "../components/Global"

import { Grid, Button, List, ListItem, ListItemIcon, Checkbox, TextField, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { finished } from 'stream'

// Create an example component which both renders and modifies the GlobalState
const SomeComponent = () => {

  const { todos } = useGlobalState()

  const addTodo = () => {

    let newTodos = [...todos]
    newTodos.push({ id: Date.now(), text: "", finished: false })

    GlobalState.set({
      todos: newTodos,
    })
  }

  const toggle = (i) => {
    
    let newTodos = [...todos]
    newTodos[i].finished = !newTodos[i].finished

    GlobalState.set({
      todos: newTodos,
    })
  }

  const removeTodo = (i) => {

    let newTodos = [...todos]

    newTodos.splice(i, 1)

    GlobalState.set({
      todos: newTodos,
    })
  }

  return (
    <>
      <Grid container justify="space-around">
        <Grid item>
          {todos.length} todos
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={addTodo}>Add todo</Button>
        </Grid>
      </Grid>
      
      <List>
        {todos.map((todo, i) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.finished}
                onClick={toggle.bind(null, i)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <TextField name="text" fullWidth placeholder="What must be done?" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={removeTodo.bind(null, i)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default SomeComponent