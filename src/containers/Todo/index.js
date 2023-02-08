import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
	createTodo,
  updateTodo,
  getTodoList,
  deleteAllCompleted,
} from 'src/actions/todo';
import { useActions } from 'src/hooks/useActions';
import { STATUS, TODOLIST_TYPE } from 'src/utils/type';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

const Wrapper = styled.div`
	.header {
		font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
	}
	.todo {
		margin: 20px 30px;
		text-align: center;
		border: 1px solid #ced4da;
    border-top: transparent;
	}
`

const Todo = () => {
	const [
		createTodoAction,
		getTodoListAction,
		deleteAllCompletedAction,
		updateTodoAction
	] = useActions([
		createTodo,
		getTodoList,
		deleteAllCompleted,
		updateTodo,
	]);
	
	useEffect(() => {
		getTodoListAction();
	}, []);

	const listFromState = useSelector((state) => state?.todo);
	const todoList = listFromState ? Object.values(listFromState) : [];
	const [currCategory, setCurrCategory] = useState(TODOLIST_TYPE.ALL);
	const todoStatistics = todoList.reduce((acc, curr) => {
		acc.todoCount = curr.status === STATUS.UNCOMPLETED ? acc.todoCount + 1 : acc.todoCount;
		acc.completedCount = curr.status === STATUS.COMPLETED ? acc.completedCount + 1 : acc.completedCount;
		return acc;
	}, { todoCount: 0, completedCount: 0 });
	const isAnyTodo = todoList.length > 0 && todoStatistics.todoCount > 0;

	const onCreateTodo = (todoContent) => {
		createTodoAction(todoContent);
	};
	const onClearCompletedTodo = () => {
		const ids = todoList
		.filter(todo => todo.status === STATUS.COMPLETED)
		.map(todo => todo.id);
		deleteAllCompletedAction(ids);
	};

	const onMarkAllTodo= () => {
		const statusToUpdate = isAnyTodo ? STATUS.COMPLETED : STATUS.UNCOMPLETED;
		updateTodoAction(todoList, statusToUpdate );
	}

	return (
		<Wrapper>
			<div className="header">
				<h1>todos</h1>
			</div>
			<div className="todo">
				<AddTodo
					onCreateTodo={onCreateTodo}
					onMarkAllTodo={onMarkAllTodo}
					isAnyTodo={isAnyTodo}
					todoStatistics={todoStatistics}
				/>
				<TodoList currCategory={currCategory} todoList={todoList}/>
				{todoList.length > 0 && (
					<Footer
						todoStatistics={todoStatistics}
						setCurrCategory={setCurrCategory}
						currCategory={currCategory}
						onClearCompletedTodo={onClearCompletedTodo}
					/>
				)}
			</div>
		</Wrapper>
	)
};

export default Todo;