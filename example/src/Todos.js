/** @format */

import { Component } from 'inferno';
import { mapStatesToProps } from './lib';
import { getStore, updateStore } from 'fluxible-js';

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
                  onClick={() => {
                    updateStore({
                      todos: getStore().todos.filter((_, index) => index !== i)
                    });
                  }}
                  style="cursor: pointer; color: white; padding: 2px; border-radius: 4px; background-color: red; margin-right: 5px;">
                  x
                </span>
                <input
                  type="checkbox"
                  style="margin-right: 5px;"
                  checked={todo.isDone}
                  onChange={ev => {
                    updateStore({
                      todos: getStore().todos.map((todo, index) => {
                        if (index !== i) return todo;

                        return {
                          ...todo,
                          isDone: ev.target.checked
                        };
                      })
                    });
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

export default mapStatesToProps(Todos, state => ({
  todos: state.todos
}));
