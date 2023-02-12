import React, { forwardRef } from 'react';
import { ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

import { STATUS } from 'src/utils/consts';

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
  content,
  status,
  onClickDelete,
  onCheckTodo,
  editTodo,
  setEditTodo,
  onEditTodoContent,
}, ref) => {
  const isCompleted = status === STATUS.COMPLETED;
  const onClickCheckBox = ({ target }) => onCheckTodo({ id, content },target.checked);
  const onDoubleClickContent = () => setEditTodo(id);
  const onClickDeleteBtn = () => onClickDelete(id);
  const onEditTodo = () => onEditTodoContent({ id, content, status });
  return (
    <Wrapper>
      <ListGroup.Item>
        {editTodo !== id ? (
          <InputGroup>
            <Form.Check
              type="checkbox"
              id={id}
              onChange={onClickCheckBox}
              checked={isCompleted}
            />
            <Form.Control
              className={isCompleted ? 'text-corssover' : ''}
              onDoubleClick={onDoubleClickContent}
              readOnly
              plaintext
              defaultValue={content}
            />
            <Button
              variant="light"
              onClick={onClickDeleteBtn}
            >
              X
            </Button>
          </InputGroup>
        ) : (
          <Form.Control
            autoFocus
            ref={ref}
            onKeyDown={onEditTodo}
            defaultValue={content}
          />
        )}
      </ListGroup.Item>
    </Wrapper>
  )
});

export default TodoListItem;
