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
  onMarkAllTodo,
  onCreateTodo,
  isAnyTodo,
  todoStatistics: {
    completedCount,
    todoCount
  }
}) => {
  const allowCheckAll = todoCount || completedCount;
  const onEnterTodo = (e) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      const todoTextFormatted = value.trim();
      if (todoTextFormatted) {
        onCreateTodo(todoTextFormatted);
        e.target.value = '';
      }
    }
  };
  const btnName = isAnyTodo ? 'Mark all done' : allowCheckAll ? 'Mark all uncompleted' : 'Todo';
  return (
    <Wrapper>
      <InputGroup>
        <Button
          variant="secondary"
          id="mark-all-done"
          className="mark-all-done-btn"
          onClick={onMarkAllTodo}
          disabled={!allowCheckAll}
        >
          {btnName}
        </Button>
        <FloatingLabel
          controlId="floatingInput"
          label="What need to be done?"
          className="add-todo-input"
        >
          <Form.Control
            type="input"
            placeholder="What need to be done?"
            onKeyDown={onEnterTodo}
            className="add-todo-input"
          />
        </FloatingLabel>
      </InputGroup>
    </Wrapper>
    
  )
};

export default AddTodo;