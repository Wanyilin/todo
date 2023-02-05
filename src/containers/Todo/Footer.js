import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup} from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 5px;
  .btn-link {
    padding: 0;
  }
`

const Footer = ({
  todoCount,
  setCurrCategory,
  currCategory,
  onClearCompletedTodo
}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
};

export default Footer;
