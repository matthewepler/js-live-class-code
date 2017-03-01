let state = {
  todos: [
    { title: 'First todo', complete: false },
    { title: 'Second todo', complete: true },
    { title: 'Third todo', complete: true },
  ],
};

document.onload = init();

function init() {
	const listNode = document.getElementById('list');

	const filterButton = document.getElementById('filter-button')
	filterButton.addEventListener('click', (event) => {
		const items = document.querySelectorAll('#list li.todo--complete');
		items.forEach( item => item.classList.toggle('hide') );
	})

	state.todos.forEach( item => addTodoNode(item) )

	function addTodoNode ({title, complete}) {
		let item = document.createElement('li');
		item.textContent = title;
		if (complete === true) item.classList.add('todo--complete');
		item.addEventListener('click', event => event.target.classList.toggle('todo--complete') );
		listNode.appendChild(item);
	};
}



