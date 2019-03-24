import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { TodoService } from "./todo.service"

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  private todos
  public activeTasks
  private newTodo
  private path

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  getTodos(query = "") {
    return this.todoService.get(query).then(todos => {
      console.log(`Current todo objects ${JSON.stringify(todos)}`)
      this.todos = todos
      this.activeTasks = this.todos.filter(todo => todo.isDone).length
    })
  }

  addTodo() {
    this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
      this.getTodos(this.path).then(() => {
        this.newTodo = ""
      })
    })
  }

  statusToggle(todo, e) {
    status = e.target.checked
    this.todoService.toggleStatus(todo, status).then(() => {
      this.getTodos(this.path)
    })
  }

  updateTodo(todo, newValue) {
    todo.title = newValue
    return this.todoService.put(todo).then(() => {
      todo.editing = false
      return this.getTodos(this.path)
    })
  }

  destroyTodo(todo) {
    this.todoService.destroy(todo).then(() => {
      this.getTodos(this.path)
    })
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      this.getTodos(this.path)
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params["status"]
      this.getTodos(this.path)
    })
  }
}
