import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	.header {
		font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
	}
`

const Todo = () => {
	return (
		<Wrapper>
			<div className="header">
				<h1>todos</h1>
			</div>
		</Wrapper>
	)
};

export default Todo;