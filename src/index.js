let state = {
  todos: [
    { title: 'First todo', complete: false },
    { title: 'Second todo', complete: true },
    { title: 'Third todo', complete: true },
  ],
  filtered: false
};

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener( 'DOMContentLoaded', init() );
}

function init() {
	const listNode = document.getElementById('list');
  const inputForm = document.getElementById('input-form');
  const inputBox = document.getElementById('input-box');
  const submitButton = document.getElementById('submit-button');

  inputForm.addEventListener( 'submit', (event) => {
    event.preventDefault();
    createNewTodo(inputBox.value);
  })

	const filterButton = document.getElementById('filter-button');
	filterButton.addEventListener('click', (event) => {
    state.filtered = !state.filtered;
    state.filtered ?
      this.textContent = "Show Completed" :
      this.textContent = "Hide Completed";
    const items = document.querySelectorAll('#list li.todo--complete');
	  items.forEach( item => item.classList.toggle('hide') );
  })

  function createNewTodo ( title ) {
    state.todos.push({
      title,
      complete: false 
    })
    renderTheUi( state.todos );
  }

  function renderTheUi ( todos ) {
    clearList();
    todos.forEach( item => createNewNode( item ) );
  }

  function clearList () {
    while (listNode.firstChild) {
        listNode.removeChild(listNode.firstChild);
    }
  }

  function createNewNode ( todo ) {
    const newTodo = document.createElement( 'li' );
    newTodo.textContent = todo.title;
    if (todo.complete === true) newTodo.classList.add('todo--complete');
    newTodo.addEventListener( 'click', event => {
      changeCompleteValue(event.target) 
    })
    listNode.appendChild(newTodo);
  }

  function changeCompleteValue ( node ) {
    state.todos.forEach( (element, index, array) => {
      if ( element.title === node.textContent ) {
        array[index].complete = !array[index].complete;
      }
    })
    renderTheUi( state.todos );
  }
  
  renderTheUi( state.todos );
}





