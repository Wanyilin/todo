import uuid from 'react-uuid';
import { remove as lodashRemove } from 'lodash';
import todoAction from '../../actions/todo';
import { status } from '../../utils/type';

const prefix = 'todo';

const todoIds = () => {
  const todoFromLocalStorage = localStorage.getItem('todoIds');
  return todoFromLocalStorage ? todoFromLocalStorage.split(',') : [];
};
const getTodoById = (id) => JSON.parse(localStorage.getItem(`${prefix}:${id}`)) || {};

const updateTodoIds = (ids) => localStorage.setItem('todoIds', ids);
const putTodo = (id, todoObj) => (
  localStorage.setItem(`${prefix}:${id}`, JSON.stringify(todoObj))
);
const removeTodo = (id) => localStorage.removeItem(`${prefix}:${id}`);

const addTodo = todo => dispatch => {
  const todoId = todo.id ? todo.id : uuid();
  const todoIdsList = todoIds();
  const todoObj = {
    id: todoId,
    todo: todo.todo,
    status: todo.status ? todo.status : status.uncompleted
  };
  putTodo(todoId, todoObj);
  todoIdsList.push(todoId);
  updateTodoIds(todoIdsList);
  dispatch(todoAction.addTodo(todoObj));
};

const markTodo = ({ markedIds, completed }) => dispatch => {
  const updatedTodo = markedIds.map(id => {
    const todoObj = getTodoById(id);
    todoObj.status = completed ? status.completed : status.uncompleted;
    putTodo(id, todoObj);
    return todoObj;
  });
  dispatch(todoAction.markTodo(updatedTodo));
};

const getTodoList = () => dispatch => {
  const todoIdsList = todoIds();
  const todoList = todoIdsList.map(id => getTodoById(id));
  dispatch(todoAction.getTodoList(todoList));
};

const clearCompleted = ids => dispatch => {
  const todoIdsList = todoIds();
  ids.forEach(id => {
    lodashRemove(todoIdsList, (todoId) => todoId === id);
    removeTodo(id);
  }); 
  updateTodoIds(todoIdsList);
  dispatch(todoAction.getTodoList(ids));
};

const deleteTodo = id => dispatch => {
  const todoIdsList = todoIds();
  lodashRemove(todoIdsList, (todoId) => todoId === id);
  updateTodoIds(todoIdsList);
  removeTodo(id);
  dispatch(todoAction.deleteTodo(id));
};

export {
  addTodo,
  markTodo,
  getTodoList,
  clearCompleted,
  deleteTodo,
}
