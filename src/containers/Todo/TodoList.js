import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';

import {
	getTodoList,
  markTodo,
  deleteTodo,
} from './util';
import { status as stateType } from '../../utils/type';
import { useActions } from '../../hooks/useActions';

const ListItem = ({ id, todo, status, onClickDelete, onClickCheckBox }) => (
  <ListGroup.Item>
    <Form.Check
      type="checkbox"
      id={`default-${todo}`}
      label={todo}
      onClick={({ target }) => onClickCheckBox(target.checked, id)}
      defaultChecked={status === stateType.completed}
    />
    <Button
      variant="light"
      onClick={() => onClickDelete(id)}
    >
      X
    </Button>
  </ListGroup.Item>
)

const TodoList = ({
  todoList,
  todoType,
}) => {
  const [
    getTodoListAction,
    markTodoAction,
    deleteTodoAction,
  ] = useActions([
    getTodoList,
    markTodo,
    deleteTodo,
  ])
  const onClickDelete = id => {
    deleteTodoAction(id);
    getTodoListAction();
  };
  const onClickCheckBox = (checked, id) => {
    markTodoAction({ markedIds: [id], completed: checked });
    getTodoListAction();
  };
  return (
    <>
      <ListGroup>
        {todoList && todoList.map(todo => (
          <ListItem
            key={todo.id}
            {...todo}
            onClickDelete={onClickDelete}
            onClickCheckBox={onClickCheckBox}
          />
        ))}
      </ListGroup>
    </>
  )
};

export default TodoList;
