import { todoList } from "../index.js";
import { Todo, TodoList } from "../classes";

// Referencias en el HTML 
const divTodoList   = document.querySelector( '.todo-list' );
const txtInput      = document.querySelector( '.new-todo' );
const btnBorrar     = document.querySelector( '.clear-completed' );
const ulFiltros     = document.querySelector( '.filters' );
const anchorFiltros = document.querySelectorAll( '.filtro' );

export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `
    <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
    
    divTodoList.append( div.firstElementChild );
    
    totalPendientes();
    return div.firstElementChild;
} 

// Eventos 
txtInput.addEventListener( 'keyup', ( event ) => {
    
    if( event.keyCode === 13 && txtInput.value.length > 0 ) {

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHTML( nuevoTodo );
        txtInput.value = '';
        totalPendientes();
    }
});

divTodoList.addEventListener( 'click', ( event ) => {
    
    const nombreElemento = event.target.localName; 
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute( 'data-id' );

    if( nombreElemento.includes( 'input' ) ) {
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle( 'completed' );
        totalPendientes();
    } else if( nombreElemento.includes( 'button' ) ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
        totalPendientes();
    }
});

btnBorrar.addEventListener( 'click', () => {
    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i > 0; i -- ) {
        const elemento = divTodoList.children[i];
        
        if( elemento.classList.contains( 'completed' ) ) {
            divTodoList.removeChild( elemento );
            totalPendientes();
        }
    }
});

ulFiltros.addEventListener( 'click', ( event ) => {
    
    const filtro = event.target.text;

    if( !filtro ) { return };

    anchorFiltros.forEach( elem => elem.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' );

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;
            case 'Completados':
                if( !completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;
        }
    }
});

const totalPendientes = () => {
    const pendientes = document.querySelectorAll( '.todo-list li' );
    const marcador = document.querySelector( '.todo-count strong'); 

    let contador = 0;
    pendientes.forEach( pediente => {
        if( pediente.classList == '' ){
            contador++;
        }
    });
gi
    marcador.textContent = contador;
}