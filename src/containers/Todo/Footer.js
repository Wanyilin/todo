import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup} from 'react-bootstrap';
import { TODOLIST_TYPE } from 'src/utils/consts';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 5px;
  .btn-link {
    padding: 0;
  }
`

const Footer = ({
  todoStatistics,
  setCurrCategory,
  currCategory,
  onClearCompletedTodo
}) => {
  const {
    completedCount,
    todoCount
  } = todoStatistics;
  const todoCats = Object.keys(TODOLIST_TYPE);
  const todoCountStr = `${todoCount} ${todoCount > 1 ? 'items' : 'item'} left`
  return (
    <Wrapper>
      <span>
        {todoCountStr}
      </span>
      <ButtonGroup>
        {todoCats.map(cat => (
          <Button
            key={cat}
            variant={currCategory === TODOLIST_TYPE[cat] ? 'secondary' : 'outline-secondary'}
            onClick={() => setCurrCategory(TODOLIST_TYPE[cat])}
          >
            {cat}
          </Button>
        ))}
      </ButtonGroup>
      {completedCount > 0 && (
        <Button
          variant="link"
          onClick={onClearCompletedTodo}
        >
          Clear Completed
        </Button>
      )}
    </Wrapper>
  )
};

export default Footer;
