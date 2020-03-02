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
			if (this.todoList.length === 0) {
				this.showFilter = false;
			}
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