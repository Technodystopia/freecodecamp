const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  };
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message];
    default:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(messageReducer);
