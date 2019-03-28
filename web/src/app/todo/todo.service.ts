import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"

let TODOS = [
  { title: "Install Angular CLI", isDone: true },
  { title: "Style app", isDone: true },
  { title: "Finish service functionality", isDone: false },
  { title: "Setup API", isDone: false }
]
const apiUrl = "http://localhost:8000"
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) {
    this.http.get(apiUrl + "/todos").subscribe(todos => {
      console.log(todos)
    })
  }

  get(query) {
    return this.http.get(`${apiUrl}/todos?status=${query}`)
  }

  add(data) {
    return this.http.post(`${apiUrl}/todos`, data, httpOptions)
  }

  put(changed) {
    return this.http.put(`${apiUrl}/todo/${changed._id}/`, changed, httpOptions)
  }

  destroy(destroyed) {
    return this.http.delete(`${apiUrl}/todo/${destroyed._id}/`)
  }

  toggleStatus(toggled, status) {
    return this.http.put(
      `${apiUrl}/todo/${toggled._id}/`,
      { isDone: status },
      httpOptions
    )
  }

  deleteCompleted() {
    return this.http.delete(`${apiUrl}/todos`)
  }
}
