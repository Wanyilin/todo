import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';
import {
	addTodo,
	getTodoList,
  markTodo,
  clearCompleted,
} from './util';
import { useActions } from '../../hooks/useActions';
import { status } from '../../utils/type';

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
		addTodoAction,
		getTodoListAction,
		clearCompletedAction,
		markTodoAction
	] = useActions([
		addTodo,
		getTodoList,
		clearCompleted,
		markTodo,
	]);
	useEffect(() => {
		getTodoListAction();
	}, []);
	const listFromState = useSelector((state) => state?.todo);
	const [currCategory, setCurrCategory] = useState('all');
	const todoList = listFromState ? Object.values(listFromState) : [];
	const uncompletedTodoList = todoList.filter(item => item.status === status.uncompleted);
	const completedTodoList = todoList.filter(item => item.status === status.completed);

	const onAddTodo = (todoText) => {
		addTodoAction({ todo: todoText });
		getTodoListAction();
	};
	const onClearCompletedTodo = () => {
		const ids = completedTodoList.map(todo => todo.id);
		clearCompletedAction(ids);
		getTodoListAction();
	};

	const onMarkAllCompleted = () => {
		const ids = uncompletedTodoList.map(todo => todo.id);
		markTodoAction({ markedIds: ids, completed: status.completed });
		getTodoListAction();
	}

	const currentList = currCategory === 'all' 
		? todoList : currCategory === 'completed' 
		? completedTodoList : uncompletedTodoList;
	return (
		<Wrapper>
			<div className="header">
				<h1>todos</h1>
			</div>
			<div className="todo">
				<AddTodo onAddTodo={onAddTodo} onMarkAllCompleted={onMarkAllCompleted} />
				<TodoList todoList={currentList}/>
				{todoList.length > 0 && (
					<Footer
						todoCount={uncompletedTodoList.length}
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