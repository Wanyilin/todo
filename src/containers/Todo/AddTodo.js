import React from 'react';
import styled from 'styled-components';
import { Button, Form, FloatingLabel, InputGroup } from 'react-bootstrap';

const Wrapper = styled.div`
  box-shadow: 0px 2px 4px black;
  .mark-all-done-btn {
    border-radius: 0;
    border: 0;
  }
  .add-todo-input {
    border-radius: 0;
    border-right: 0;
  }
`

const AddTodo = ({
  onMarkAllCompleted,
  onAddTodo,
}) => {
  const onClick = (e) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      const todoTextFormatted = value.trim();
      if (todoTextFormatted) {
        onAddTodo(todoTextFormatted);
        e.target.value = '';
      }
    }
  };
  return (
    <Wrapper>
      <InputGroup>
        <Button
          variant="secondary"
          id="mark-all-done"
          className="mark-all-done-btn"
          onClick={onMarkAllCompleted}
        >
          Mark all done
        </Button>
        <FloatingLabel
          controlId="floatingInput"
          label="What need to be done?"
          className="add-todo-input"
        >
          <Form.Control
            type="input"
            placeholder="What need to be done?"
            onKeyDown={onClick}
            className="add-todo-input"
          />
        </FloatingLabel>
      </InputGroup>
    </Wrapper>
    
  )
};

export default AddTodo;