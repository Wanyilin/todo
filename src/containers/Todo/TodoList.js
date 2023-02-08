import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import {
  updateTodo,
  deleteTodo,
} from 'src/actions/todo';
import { STATUS, TODOLIST_TYPE } from 'src/utils/type';
import { useActions } from 'src/hooks/useActions';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import TodoListItem from './TodoListItem';


const Wrapper = styled.div`
  .list-group-item {
    border-left: 0;
    border-right: 0;
  }
`

const TodoList = ({
  currCategory,
  todoList,
}) => {
  const [
    updateTodoAction,
    deleteTodoAction,
  ] = useActions([
    updateTodo,
    deleteTodo,
  ]);
  const [editTodo, setEditTodo] = useState();
  const currTodoList = todoList.filter(todo => {
    if (currCategory === TODOLIST_TYPE.UNCOMPLETED)
      return todo.status === STATUS.UNCOMPLETED;
    if (currCategory === TODOLIST_TYPE.COMPLETED)
      return todo.status === STATUS.COMPLETED;
    return todo;
  })

  
  const ref = useOutsideClick(() => setEditTodo());
  const onClickDelete = id => deleteTodoAction(id);
  const onCheckTodo = (todoObj, checked) => updateTodoAction(todoObj, checked);

  const onEditTodoContent = (e, todoObj) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      const todoTextFormatted = value.trim();
      if (!todoTextFormatted)  return;
      updateTodoAction({ ...todoObj, content: todoTextFormatted }, todoObj.status);
      setEditTodo();
    }
  };
  return (
    <Wrapper>
      <ListGroup>
        {currTodoList && currTodoList.map(todo => (
          <TodoListItem
            ref={ref}
            key={todo.id}
            id={todo.id}
            content={todo.content}
            status={todo.status}
            setEditTodo={setEditTodo}
            editTodo={editTodo}
            onClickDelete={onClickDelete}
            onCheckTodo={onCheckTodo}
            onEditTodoContent={onEditTodoContent}
          />
        ))}
      </ListGroup>
    </Wrapper>
  )
};

export default TodoList;
