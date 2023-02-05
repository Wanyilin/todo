import React, { forwardRef } from 'react';
import { ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

import { status as stateType } from '../../utils/type';

const Wrapper = styled.div`
  .input-group {
    flex-wrap: nowrap;
    align-items: center;
    .form-check-input {
      margin-right: 10px;
    }
    .text-corssover {
      text-decoration-line: line-through;
    }
  }

`

const TodoListItem = forwardRef(({
  id,
  todo,
  status,
  onClickDelete,
  onClickCheckBox,
  editTodo,
  setEditTodo,
  onEditTodoText,
}, ref) => {
  return (
    <Wrapper>
      <ListGroup.Item>
        {editTodo !== id ? (
          <InputGroup>
            <Form.Check
              type="checkbox"
              id={`default-${todo}`}
              onClick={({ target }) => onClickCheckBox(target.checked, id)}
              checked={status === stateType.completed}
            />
            <Form.Control
              className={status === stateType.completed ? 'text-corssover' : ''}
              onDoubleClick={() => setEditTodo(id)}
              readOnly
              plaintext
              defaultValue={todo}
            />
            <Button
              variant="light"
              onClick={() => onClickDelete(id)}
            >
              X
            </Button>
          </InputGroup>
        ) : (
          <Form.Control
            autoFocus
            ref={ref}
            onKeyDown={(e) => onEditTodoText(e, { id, todo, status })}
            defaultValue={todo}
          />
        )}
      </ListGroup.Item>
    </Wrapper>
  )
});

export default TodoListItem;
