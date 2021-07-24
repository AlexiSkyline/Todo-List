import { Todo, TodoList } from './classes/index.js';
import { crearTodoHTML } from './js/componentes.js';
import './styles.css';

export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHTML( todo ) );
todoList.todos.forEach( crearTodoHTML );

// const newTodo = new Todo( 'Aprende JacaScript' );
// todoList.nuevoTodo( newTodo );
// todoList.todos[0].imprimirClase();
// newTodo.imprimirClase();


// console.log( 'todos', todoList.todos );

