import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_TODO_COMPLETED,
  MARK_TODO,
  GET_TODO_LIST,
} from '../utils/type';

const initialState = {
  todo: {}
}

const todoReducer = ( state = initialState, action ) => {
  const { type, data } = action
  switch (type) {
    case ADD_TODO:
      state.todo[data.id] = data;
      return state;
    case DELETE_TODO:
      delete state[data];
      return state;
    case CLEAR_TODO_COMPLETED:
      data.forEach(id => {
        delete state.todo[id]
      })
      return state;
    case MARK_TODO: 
      data.forEach(item => state.todo[item.id] = item);
      return state;
    case GET_TODO_LIST:
      const todoList = {};
      data.forEach(item => todoList[item.id] = item);
      return { todo: todoList };
  }
}

export default todoReducer;