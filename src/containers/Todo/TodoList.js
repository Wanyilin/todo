import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

import TodoListItem from './TodoListItem';
import {
  addTodo,
	getTodoList,
  markTodo,
  deleteTodo,
} from './util';
import { useActions } from '../../hooks/useActions';
import { useOutsideClick } from '../../hooks/useOutsideClick';


const Wrapper = styled.div`
  .list-group-item {
    border-left: 0;
    border-right: 0;
  }
`

const TodoList = ({
  todoList,
}) => {
  const [
    getTodoListAction,
    markTodoAction,
    deleteTodoAction,
    addTodoAction,
  ] = useActions([
    getTodoList,
    markTodo,
    deleteTodo,
    addTodo,
  ]);
  const [editTodo, setEditTodo] = useState();
  
  const ref = useOutsideClick(() => setEditTodo());
  const onClickDelete = id => {
    deleteTodoAction(id);
    getTodoListAction();
  };
  const onClickCheckBox = (checked, id) => {
    markTodoAction({ markedIds: [id], completed: checked });
    getTodoListAction();
  };
  const onEditTodoText = (e, todoObj) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      const todoTextFormatted = value.trim();
      if (todoTextFormatted) {
        addTodoAction({ ...todoObj, todo: todoTextFormatted });
        getTodoListAction();
        setEditTodo();
      }
    }
  };
  return (
    <Wrapper>
      <ListGroup>
        {todoList && todoList.map(todo => (
          <TodoListItem
            ref={ref}
            key={todo.id}
            {...todo}
            setEditTodo={setEditTodo}
            editTodo={editTodo}
            onClickDelete={onClickDelete}
            onClickCheckBox={onClickCheckBox}
            onEditTodoText={onEditTodoText}
          />
        ))}
      </ListGroup>
    </Wrapper>
  )
};

export default TodoList;
