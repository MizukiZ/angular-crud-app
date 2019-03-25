import { Injectable } from "@angular/core"

let TODOS = [
  { title: "Install Angular CLI", isDone: true },
  { title: "Style app", isDone: true },
  { title: "Finish service functionality", isDone: false },
  { title: "Setup API", isDone: false }
]

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor() {}

  get(query) {
    return new Promise(resolve => {
      let data

      if (query === "active" || query === "completed") {
        const isCompleted = query === "completed"
        data = TODOS.filter(todo => todo.isDone == isCompleted)
      } else {
        data = TODOS
      }
      resolve(data)
    })
  }

  add(data) {
    return new Promise(resolve => {
      TODOS.push(data)
      resolve(data)
    })
  }

  put(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed)
      TODOS[index].title = changed.title
      resolve(changed)
    })
  }

  destroy(destroyed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === destroyed)
      TODOS.splice(index, 1)
      resolve(true)
    })
  }

  toggleStatus(toggled, status) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === toggled)
      const boolStatus = status === "true" ? true : false
      TODOS[index].isDone = boolStatus
      resolve(toggled)
    })
  }

  deleteCompleted() {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.isDone)
      resolve(TODOS)
    })
  }
}
