import React from 'react';
import styled from 'styled-components';
import { Button, Form, FloatingLabel, InputGroup } from 'react-bootstrap';


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
      }
    }
  };
  return (
    <InputGroup>
      <Button
        variant="outline-secondary"
        id="mark-all-done"
        onClick={onMarkAllCompleted}
      >
        Mark all done
      </Button>
      <FloatingLabel
        controlId="floatingInput"
        label="What need to be done?"
        className="mb-3"
      >
        <Form.Control
          type="input"
          placeholder="What need to be done?"
          onKeyDown={onClick} 
        />
      </FloatingLabel>
    </InputGroup>
  )
};

export default AddTodo;