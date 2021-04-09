const app = Vue.createApp({
  data () {
    return {
      todos: [],
      newTodo: null
    }
  },
  mounted () {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'))
      } catch (e) {
        localStorage.removeItem('todos')
      }
    }
  },
  methods: {
    addTodoItem () {
      if (!this.newTodo) return
      this.todos.push(
        {
          item: this.newTodo,
          edit: false
        }
      )
      this.newTodo = ''
      this.saveTodoItem()
    },
    enableEdit (index) {
      this.todos[index].edit = true
      this.saveTodoItem()
    },
    closeEdit (index) {
      this.todos[index].edit = false
      this.saveTodoItem()
    },
    removeTodoItem (index) {
      this.todos.splice(index, 1)
      this.saveTodoItem()
    },
    saveTodoItem () {
      const parsed = JSON.stringify(this.todos)
      localStorage.setItem('todos', parsed)
    }
  }
})

app.mount('#app')
