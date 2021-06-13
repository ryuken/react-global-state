import React, { useState, useEffect } from 'react'

const initialGlobalState = {
    count: 0,
    // contains all todos
    todos: [],
}

// Create a Context for the (global) State
const GlobalState = React.createContext();

// i've rewritten the React.Component to hooks...
const Global = ({ Root  }) => {

    const [globals, setGlobals] = useState(initialGlobalState || {})

    const setGlobalState = (data = {}) => {

        // clone data & overwrite modified data
        let newGlobals = {...globals, ...data}

        // Update the state with the new State
        setGlobals(newGlobals)
    }

    useEffect(() => {
        // Expose the setGlobals function to the Globals object
        GlobalState.set = setGlobalState
    }, [])

    return (
        // Pass the current value of GlobalState, based on this components' State, down
        <GlobalState.Provider value={globals}>
            <Root />
        </GlobalState.Provider>
    )
}

// Create a shorthand Hook for using the GlobalState
const useGlobalState = () => React.useContext(GlobalState);

export {
    Global,
    useGlobalState,
    GlobalState
}