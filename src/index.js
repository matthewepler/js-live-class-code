function onReady () {
  initUi();

  // it's a little confusing to see you do it without a state object
  // because in the first week's activities, the todo array is nested inside
  // state{}. Not a big deal, but might throw some people off. 
  let todos = [];

  function createNewTodo ( title ) {
    const newTodo = {title, complete: false}

  	todos.push(newTodo)

  	// The "state" changed, so re-draw the UI
  	renderTheUi( newTodo )
  	// I see where you're going here, esp. towards the React lifecycles. 
  	// It's useful to see it built from scratch. 
  	// Is this something that developed over time and React just formalized,
  	// or is this a pattern React is championing and is just becoming defacto?
  }

  function renderTheUi ({title, complete}) {
  	  // although this works, it may not be the smartest solve. 
  	  // it works if the only reason to render the UI is a new <li> being added,
  	  // which will likely not be the case as the app grows. See comments below for more.

  	  const newLi = document.createElement( 'li' );
   	  newLi.textContent = title; // vs newLi.innerHTML

      newLi.addEventListener( 'click', () => {
        newLi.classList.toggle( 'todo--complete' );
      });

      todoList.appendChild( newLi );
  }

  function initUi() {
  	const addTodoForm = document.getElementById( 'addTodoForm' );
  	const todoList = document.getElementById( 'todoList' );
  	const newTodoText = document.getElementById( 'newTodoText' );
  	const filterButton = document.getElementById('toggleBtn')

  	// <ul></ul>
  	todoList.textContent = '';

  	addTodoForm.addEventListener( 'submit', event => {
	    event.preventDefault();
	    createNewTodo( newTodoText.value );
	    newTodoText.value = '';
	  });
	
	// you mentioned doing this DOM query stuff was inefficient b/c the DOM is slow.
	// lookng forward to see how else we could do this.
 	filterButton.addEventListener('click', event => {
 		const items = document.querySelectorAll('.todo--complete');
 		items.forEach( item => item.classList.toggle('hide') );
 	})
  }
}

if ( document.readyState !== 'loading' ) {
  onReady();
} else {
  document.addEventListener( 'DOMContentLoaded', onReady );
}

/* 
REFLECTION

Challenges: 
	* Knowing what is already in the DOM and what is being added. in renderTheUI(), my instinct 
		is to clear the list, and loop through the todos array to make a new one. But something 
		tells me this is inefficient and not the best strategy. 

		> I see two choices. One, clear the array and refill it every time, or only update the UI 
			with new data received. I think the latter, though more efficient, may leave room for error
			if updates are made from other parts of the codebase...?

Ways to Make It Better:
	* not sure yet

Generalizations:
	* Like React, knowing what needs to be updated in the DOM and what will be the same as in the last
		render would be nice, but I guess that's why we have React, right??

*/
