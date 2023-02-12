import {
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TODO_COMPLETED,
  UPDATE_TODO,
  GET_TODO_LIST,
} from 'src/utils/consts';

const initialState = {
  todo: {}
}

const todoReducer = ( state = initialState, action ) => {
  const { todo } = state;
  const newTodo = { ...todo };
  const { type, data } = action;
  switch (type) {
    case CREATE_TODO: {
      return {
        ...state,
        todo: {
          ...todo,
          [data.id]: data,
        }
      };
    }
    case DELETE_TODO: {
      delete newTodo[data];
      return {
        ...state,
        todo: newTodo,
      };
    }
    case DELETE_TODO_COMPLETED: {
      data.forEach(id => {
        delete newTodo[id]
      })
      return {
        ...state,
        todo: newTodo,
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        todo: {
          ...todo,
          ...data,
        }
      }
    }
    case GET_TODO_LIST: {
      const todoList = data.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {})
      return { ...state, todo: todoList };
    }
  }
}

export default todoReducer;