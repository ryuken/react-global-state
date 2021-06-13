import React, { useEffect } from 'react'

import useSwr from "swr"

import { Grid, Button, List, ListItem, ListItemIcon, Checkbox, TextField, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"

import { motion, useAnimation } from "framer-motion"

import { GlobalState, useGlobalState } from "../components/Global"

const fetcher = (url) => fetch(url).then((res) => res.json())

// Create an example component which both renders and modifies the GlobalState
const SomeComponent = () => {

  const { data, error = "" } = useSwr("/api/todos", fetcher)

  const { todos } = useGlobalState()
  const controls = useAnimation()

  useEffect(() => {

    if("undefined" !== typeof data)
      GlobalState.set({ todos: data })

  }, [data])

  useEffect(() => {
    // animate fontSize based on todos length
    controls.start({
      fontSize: ["2rem", "3rem", "2rem"]
    })

  }, [todos.length])

  const addTodo = () => {

    let newTodos = [...todos]
    newTodos.push({ id: Date.now(), text: "", finished: false })

    GlobalState.set({
      todos: newTodos,
    })
  }

  const onChange = (i, value) => {
    
    let newTodos = [...todos]
    newTodos[i].text = value
    
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
          <motion.span animate={controls}>{todos.length}</motion.span> todos
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
            <TextField
              name="text"
              fullWidth
              value={todo.text}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder="What must be done?"
            />
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