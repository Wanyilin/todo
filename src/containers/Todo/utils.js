import { STATUS, TODOLIST_TYPE } from 'src/utils/consts';

const mapTodotypeToStatus = (type, todos) => {
  console.log(todos)
  switch (type) {
    case TODOLIST_TYPE.ALL:
      return todos
    case TODOLIST_TYPE.COMPLETED:
      return todos.filter(todo => todo.status === STATUS.COMPLETED)
    case TODOLIST_TYPE.UNCOMPLETED:
      return todos.filter(todo => todo.status === STATUS.UNCOMPLETED)
    default:
      return []
  }
};

export { mapTodotypeToStatus }
