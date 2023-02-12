import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
	updateTodo,
	getTodoList,
	deleteAllCompleted,
} from 'src/actions/todo';
import { useActions } from 'src/hooks/useActions';
import { STATUS, TODOLIST_TYPE } from 'src/utils/consts';
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
		updateTodoAction,
		getTodoListAction,
		deleteAllCompletedAction,
	] = useActions([
		updateTodo,
		getTodoList,
		deleteAllCompleted,
	]);

	useEffect(() => {
		getTodoListAction();
	}, []);

	const listFromState = useSelector((state) => state?.todo);
	const todoList = listFromState ? Object.values(listFromState) : [];
	const [currCategory, setCurrCategory] = useState(TODOLIST_TYPE.ALL);
	const todoStatistics = todoList.reduce((acc, curr) => {
		if (curr.status === STATUS.UNCOMPLETED) acc.todoCount = acc.todoCount + 1;
		if (curr.status === STATUS.COMPLETED) acc.completedCount = acc.completedCount + 1;
		return acc;
	}, { todoCount: 0, completedCount: 0 });
	const isAnyTodo = todoList.length > 0 && todoStatistics.todoCount > 0;

	const onClearCompletedTodo = () => {
		const ids = todoList
			.filter(todo => todo.status === STATUS.COMPLETED)
			.map(todo => todo.id);
		deleteAllCompletedAction(ids);
	};

	const onUpdateAllTodo = () => updateTodoAction(todoList, isAnyTodo);

	return (
		<Wrapper>
			<div className="header">
				<h1>todos</h1>
			</div>
			<div className="todo">
				<AddTodo
					isAnyTodo={isAnyTodo}
					todoStatistics={todoStatistics}
					onUpdateAllTodo={onUpdateAllTodo}
				/>
				<TodoList currCategory={currCategory} todoList={todoList} />
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