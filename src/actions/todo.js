import uuid from 'react-uuid';
import { remove as lodashRemove } from 'lodash';

import {
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TODO_COMPLETED,
  UPDATE_TODO,
  GET_TODO_LIST,
  STATUS,
} from 'src/utils/type';
import jsonSafeParse from 'src/utils/jsonSafeParse';

const PREFIX = 'todo';

const todoAction = {
  createTodo: data => ({ type: CREATE_TODO, data }),
  updateTodo: data => ({ type: UPDATE_TODO, data }),
  getTodoList: data => ({ type: GET_TODO_LIST, data }),
  deleteAllCompleted: data => ({ type: DELETE_TODO_COMPLETED, data }),
  deleteTodo: data => ({ type: DELETE_TODO, data }),
};

const todoIds = () => {
  const todoFromLocalStorage = localStorage.getItem('todoIds');
  return todoFromLocalStorage ? todoFromLocalStorage.split(',') : [];
};
const getTodoById = (id) => jsonSafeParse(localStorage.getItem(`${PREFIX}:${id}`));
  

const updateTodoIds = (ids) => localStorage.setItem('todoIds', ids);
const setTodo = (id, todoObj) => (
  localStorage.setItem(`${PREFIX}:${id}`, JSON.stringify(todoObj))
);
const removeTodo = (id) => localStorage.removeItem(`${PREFIX}:${id}`);

const createTodo = todoContent => dispatch => {
  const newTodoId = uuid();
  const todoIdsList = todoIds();
  const newTodoObj = {
    id: newTodoId,
    content: todoContent,
    status: STATUS.UNCOMPLETED
  };
  setTodo(newTodoId, newTodoObj);
  todoIdsList.push(newTodoId);
  updateTodoIds(todoIdsList);
  dispatch(todoAction.createTodo(newTodoObj));
};

const updateTodo = (modifiedTodo, completed) => dispatch => {
  let updatedTodos = {};
  const setModifiedTodoObj = ({ id, content }) => {
    const modifiedObj = {
      id,
      content,
      status: completed ? STATUS.COMPLETED : STATUS.UNCOMPLETED
    }
    setTodo(id, modifiedObj);
    return modifiedObj;
  };
  if (Array.isArray(modifiedTodo)) {
    updatedTodos = modifiedTodo
      .map(setModifiedTodoObj)
      .reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc
      }, {});
  } else {
    const modifiedTodoObj = setModifiedTodoObj(modifiedTodo);
    updatedTodos[modifiedTodoObj.id] = modifiedTodoObj;
  }

  dispatch(todoAction.updateTodo(updatedTodos));
};

const getTodoList = () => dispatch => {
  const todoIdsList = todoIds();
  const todoList = todoIdsList.map(id => getTodoById(id));
  dispatch(todoAction.getTodoList(todoList));
};

const deleteAllCompleted = idsToDelete => dispatch => {
  const todoIdsList = todoIds();
  idsToDelete.forEach(id => {
    lodashRemove(todoIdsList, (todoId) => todoId === id);
    removeTodo(id);
  }); 
  updateTodoIds(todoIdsList);
  dispatch(todoAction.deleteAllCompleted(idsToDelete));
};

const deleteTodo = idToDelete => dispatch => {
  const todoIdsList = todoIds();
  lodashRemove(todoIdsList, (todoId) => todoId === idToDelete);
  updateTodoIds(todoIdsList);
  removeTodo(idToDelete);
  dispatch(todoAction.deleteTodo(idToDelete));
};

export {
  createTodo,
  updateTodo,
  getTodoList,
  deleteAllCompleted,
  deleteTodo,
};
