import {
  ADD_TODO,
  DELETE_TODO,
  CLEAR_TODO_COMPLETED,
  MARK_TODO,
  GET_TODO_LIST,
} from '../utils/type';


const todoAction = {
  addTodo: data => ({ type: ADD_TODO, data }),
  markTodo: data => ({ type: MARK_TODO, data }),
  getTodoList: data => ({ type: GET_TODO_LIST, data }),
  clearCompleted: data => ({ type: CLEAR_TODO_COMPLETED, data }),
  deleteTodo: data => ({ type: DELETE_TODO, data }),
};

export default todoAction;