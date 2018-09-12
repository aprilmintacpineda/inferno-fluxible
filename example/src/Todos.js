/** @format */

import { Component } from 'inferno';
import { connect } from './lib';

class Todos extends Component {
  render () {
    return (
      <div>
        <h3>Todos component: Your todos (managed by inferno-fluxible)</h3>
        {this.props.todos.length ? (
          this.props.todos.map((todo, i) => {
            return (
              <p key={i} className="done">
                <span
                  onClick={() => this.props.deleteTodo(i)}
                  style="cursor: pointer; color: white; padding: 2px; border-radius: 4px; background-color: red; margin-right: 5px;">
                  x
                </span>
                <input
                  type="checkbox"
                  style="margin-right: 5px;"
                  checked={todo.isDone}
                  onChange={ev => {
                    this.props.updateIsDone(ev.target.checked, i);
                  }}
                />
                {todo.isDone ? <s>{todo.value}</s> : todo.value}
              </p>
            );
          })
        ) : (
          <p>You have no todos.</p>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    todos: state.todos
  }),
  {
    updateIsDone (store, isDone, targetIndex) {
      store.updateStore({
        todos: store.getStore().todos.map((todo, i) => {
          if (i !== targetIndex) return todo;
          return {
            ...todo,
            isDone
          };
        })
      });
    },
    deleteTodo (store, targetIndex) {
      store.updateStore({
        todos: store.getStore().todos.filter((_, i) => i !== targetIndex)
      });
    }
  }
)(Todos);
