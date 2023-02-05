import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup} from 'react-bootstrap';

import { clearCompleted, getTodoList } from './util';
import { useActions } from '../../hooks/useActions';

const Footer = ({
  todoCount,
  setCurrCategory,
  currCategory,
  onClearCompletedTodo
}) => {
  return (
    <>
      <span>
        {todoCount} items left
      </span>
      <ButtonGroup>
        <Button
          variant={currCategory === 'all' ? 'secondary' : 'outline-secondary'}
          onClick={() => setCurrCategory('all')}
        >
          All
        </Button>
        <Button
          variant={currCategory === 'uncompleted' ? 'secondary' : 'outline-secondary'}
          onClick={() => setCurrCategory('uncompleted')}
        >
          Active
        </Button>
        <Button
          variant={currCategory === 'completed' ? 'secondary' : 'outline-secondary'}
          onClick={() => setCurrCategory('completed')}
        >
          Completed
        </Button>
      </ButtonGroup>
      <Button
        variant="link"
        onClick={onClearCompletedTodo}
      >
        Clear Completed
      </Button>
    </>
  )
};

export default Footer;
