// Using of Vue.js

const todoApp = new Vue({
	el: '#todo-app',
	data: {
		header: 'Things to do today',
		newTodo: '',
		beforeEditCache: '',
		todoList: [
			// {
			//  id: '',
			// 	text: '',
			// 	done: false,
			//  editing: false
						// }
		],
		userIsLoggedIn: false,
		loginForm: false,
		email: '',
		password: '',
		showFilter: false,
		filter: 'all',
	},

	directives: {
		focus: {
			inserted: function(el) {
				el.focus()
			}
		}
	},

	methods: {
		toggleLoginForm() {
			this.loginForm = !this.loginForm;
		},

		addTodo() {
			if (this.newTodo.trim().length !== 0) {
				this.todoList.push({
					text: this.newTodo,
					done: false,
					id: Date.now(),
					editing: false
				},);
				this.newTodo = '';
				this.showFilter = true;
			}
		},

		toggleDone(todo) {
			todo.done = !todo.done;
		},
		editTodo(todo) {
			this.beforeEditCache = todo.text;
			todo.editing = true;
		},
		doneEdit(todo) {
			if (todo.text.trim() === '') {
				todo.text = this.beforeEditCache;
			};
			todo.editing = false;
		},
		cancelEdit(todo) {
			todo.text = this.beforeEditCache;
			todo.editing = false;
		},
		removeTodo(id) {
			this.todoList = this.todoList.filter(todo => todo.id !== id);
		},


	},

	computed: {
		emailIsValid() {
			return this.email.includes('@');
		},
		invalidEmailStyles() {
			if (this.email && !this.emailIsValid) {
				return {
					'background-color': '#ffeded',
					'border-color': '#da5252'
				}
			}
		},
		passwordIsValid() {
			if (this.password.length >= 6) {
				return this.password;
			}
		},
		invalidPasswordStyles() {
			if (this.password && !this.passwordIsValid) {
				return {
					'background-color': '#ffeded',
					'border-color': '#da5252'
				}
			}
		},
		formIsValid() {
			return this.emailIsValid && this.passwordIsValid;
		},
		signInButtonStyles() {
			if (this.formIsValid) {
				return {
					'background-color': '#8bc34a',
					'border-color': '#5c8032',
					cursor: 'pointer'
				}
			} else {
				return {
					'background-color': '#b5b2b2',
					cursor: 'default'
				}
			}
		},
		addButtonStyles() {
			if (this.newTodo.length === 0) {
				return {
					'background-color': '#8b8e90',
					'border-color': '#8b8e90',
					cursor: 'default'
				}
			}
		},
		todoListFiltered() {
			if (this.filter === 'all') {
				return this.todoList;
			} else if (this.filter === 'done') {
				return this.todoList.filter(todo => todo.done);
			} else if (this.filter === 'undone') {
				return this.todoList.filter(todo => !todo.done);
			}
			return this.todoList;
		},

	}
})







// Using of jQuery

// $(document).ready(() => {
//
// 		$('.day-button').on('click', event => {
// 			// $('.nav-menu').toggleClass('hide');
// 			$(event.currentTarget).toggleClass('active');
// 			$('#day-dropdown').slideToggle('slow');
//
// 	});
//
// 	$('.month-button').on('click', () => {
// 		// $('.nav-menu').toggleClass('hide');
// 		$('.month-button').toggleClass('active');
// 		$('#month-dropdown').slideToggle('slow');
// 	});
//
// 	$('.login-button').on('click', () => {
// 		$('.login-form').slideToggle();
// 	});
//
//
// 	const createLi = () => {
//
// 		let active = false;
//
// 		let li = $('<li/>');
// 		let span = $('<span/>');
// 		span.text($('#myInput').val());
// 		li.append(span);
//
// 		li.append($('<span/>')
// 					.text('x')
// 					.addClass('close')
// 					.click(() => {
// 						li.remove();
// 					}))
// 					.append($('<span/>', {"class": "material-icons edit"})
// 						.text('edit'))
// 					.on('click', '.edit', (e) => {
// 						if (!active) {
// 							active = true;
// 							input = $('<input/>')
// 									.val(span.text())
// 									.on('keyup', (e) => {
// 										if (e.keyCode === 13) {
// 											span.text(e.target.value);
// 											input.hide();
// 											span.show();
// 											active = false;
// 										}
// 									});
// 							span.hide();
// 							li.append(input);
// 						}
// 					})
// 					.appendTo($('#myList'))
// 					.on('click', () => {
// 						span.toggleClass('checked')
// 					})
// 		$('#myInput').val('')
// 	}
//
// 	$('#addBtn').on('click', createLi);
//
// 	$('#myInput').on('keyup', (e) => {
// 		if (e.keyCode === 13) {
// 			createLi();
// 		}
// 	});
//
//
// 	$('#filter').on('change', function() {
// 		if (this.value === 'all') {
// 			showAll();
// 		} else if (this.value === 'checked') {
// 			showChecked();
// 		} else {
// 			showUnchecked();
// 		}
// 	});
//
// 	const showAll = () => {
// 		$('li').show();
// 	};
//
// 	const showChecked = () => {
// 		$('li').hide();
// 		$('span.checked').parent().show();
// 	};
//
// 	const showUnchecked = () => {
// 		$('li').hide();
// 		$('li span:first-child').not('.checked').parent().show();
// 	};
//
// 	const edit = event => {
// 		$(event.currentTarget).hide();
// 		$(event.currentTarget).text();
// 		console.log('test');
// 	}
//
// })







// Using of JavaScript

// const addNewElement = () => {
// 	let newToDo = document.getElementById('myInput').value;
// 	let ul = document.getElementById('myList');
// 	let li = document.createElement('li');
//
// 	li.appendChild(document.createTextNode(newToDo));
//
//
// 	ul.appendChild(li);
//
// 	document.getElementById('myInput').value = '';
//
// 	let closeButton = document.createElement('span');
// 	closeButton.appendChild(document.createTextNode('x'));
// 	closeButton.classList.add('close');
// 	li.appendChild(closeButton);
//
// 	closeButton.onclick = () => {
// 		li.remove();
// 	};
// };
// const addCheckMark = () => {
// 	let list = document.querySelector('ul');
// 	list.addEventListener('click', function(ev) {
// 	  if (ev.target.tagName === 'LI') {
// 	    ev.target.classList.toggle('checked');
// 	  }
// 	}, false);
// }
// addCheckMark();
