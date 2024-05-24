const reducer = (state = 5) => {
    return state;
  }
  
  const { createStore } = Redux;
  const store = createStore(reducer);