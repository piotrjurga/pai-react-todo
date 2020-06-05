import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <div className='todo-item'>
      <input
        type='checkbox'
        checked={props.item.completed}
        onChange={() => props.update(props.item.id)}
      />
      <p className={props.item.completed ? 'todo-item-done' : null}>
        {props.item.text}
      </p>
    </div>
  )
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodoText: ''
    };
    this.newTodo = this.newTodo.bind(this);
    this.todoClick = this.todoClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  newTodo(event) {
    event.preventDefault();
    this.setState(oldState => {
      let newTodos = oldState.todos.slice();
      newTodos.push({
        id: oldState.todos.length,
        text: oldState.newTodoText,
        completed: false
      });
      return {
        todos: newTodos,
        newTodoText: ''
      };
    });
    this.newTodoInput.focus();
  }
  
  todoClick(id) {
    this.setState(oldState => {
      let newTodos = oldState.todos.map(t => {
        if (t.id === id) {
          return { ...t, completed: !t.completed }
        } else {
          return t;
        }
      });
      return { todos: newTodos };
    })
  }
  
  handleChange(event) {
    const {name, value, type, checked} = event.target
    if (type === "checkbox") {
      this.setState({
        [name]: checked
      })
    } else {
      this.setState({
        [name]: value
      }) 
    }
  }
  
  render() {
    const filteredTodos = this.state.todos.filter(t => {
      return !this.state.hideCompleted || !t.completed;
    });
    const todoList = filteredTodos.map(t => {
      return (
        <Todo key={t.id} item={t} update={this.todoClick} />
      );
    });
    
    return (
      <div className='todo-list'>
        <label>
          <input
            type='checkbox'
            name='hideCompleted'
            value={this.state.hideCompleted}
            onChange={this.handleChange}
          />
          hide completed
        </label>
        <hr />
        
        {
          filteredTodos.length == 0 ? <p>Nothing to do...</p> : todoList
        }
        
        <form onSubmit={this.newTodo}>
          <input
            type='text'
            name='newTodoText'
            value={this.state.newTodoText}
            onChange={this.handleChange}
            ref={(input) => { this.newTodoInput = input; }}
          />
          <input type='submit' value='Add' />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));