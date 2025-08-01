const key = 'todos'
const setTodo = value => {
    localStorage.setItem(key, JSON.stringify(value))
}
const getTodo = () => JSON.parse(localStorage.getItem(key) || "[]").filter(Boolean)

function add() {
    const input = document.getElementById('todo-field')
    if (input.value && input.value.trim()) {
        const todoList = getTodo()
        if (todoList.filter(Boolean).length === 0) {
            noRecordFound(true)
        }
        const newTodo = { id: todoList.length, do: input.value, completed: false }
        todoList.push(newTodo)
        setTodo(todoList)
        input.value = ""
        addToDoHtml(newTodo)
        refreshScore()
    }
}

let actualIndex = 0
function addToDoHtml(todo) {
    const todoListDiv = document.getElementsByClassName('todo-list')[0]
    if (todoListDiv && todo) {
        todoListDiv.insertAdjacentHTML("beforeend", `
            <div class="todo-col ${todo.completed ? "completed" : ""}">
                <p class="index">${++actualIndex}</p>
                <p class="todo-target">${todo.do}</p>
                <button class="todo-complete-btn" type="button" data-id="${todo.id}" ${todo.completed ? "disabled" : ""} onclick="completeTodo(this)">Complete</button>
                <button class="todo-delete-btn" type="button" data-id="${todo.id}" onclick="deleteTodo(this)">Delete</button>
            </div>
        `)
    }
}

function changeScore(label, value) {
    const node = document.getElementsByClassName(label)
    if (node && node[0]) {
        node[0].innerHTML = value
    }
}

function noRecordFound(clearHtml = false) {
    const todoListDiv = document.getElementsByClassName('todo-list')[0]
    if (clearHtml) {
        todoListDiv.innerHTML = ""
        return
    }
    todoListDiv.insertAdjacentHTML("beforeend", `
        <div class="todo-col">
            <p class="todo-target">No To-Do Here...</p>
        </div>
    `)
}

function findId(todoList, id) {
    return todoList?.length && todoList.map(todo => todo?.id).indexOf(parseInt(id))
}

function deleteTodo(thisitem) {
    const id = thisitem.getAttribute('data-id')
    const todoList = getTodo()
    const selectedId = findId(todoList, id)
    delete todoList[selectedId]
    setTodo(todoList)
    thisitem.parentElement.remove()
    if (todoList.filter(Boolean).length === 0) {
        noRecordFound()
    } else {
        const todoListDiv = document.getElementsByClassName('todo-list')[0]
        actualIndex = 0
        todoListDiv.childNodes.forEach(element => {
            if (element?.classList?.contains('todo-col')) {
                const index = element.getElementsByClassName('index')
                if (index && index[0]) {
                    ++actualIndex
                    index[0].innerHTML = actualIndex
                }
            }
        })
    }
    refreshScore()
}

function completeTodo(thisitem) {
    const id = thisitem.getAttribute('data-id')
    const todoList = getTodo()
    const selectedId = findId(todoList, id)
    todoList[selectedId].completed = true
    setTodo(todoList)
    thisitem.parentElement.classList.add('completed')
    refreshScore()
}

function refreshScore() {
    const todoList = getTodo()
    const totalTodo = todoList.length
    const completeTodo = todoList.reduce((carry, todo) => todo.completed ? carry + 1: carry, 0)
    const pendingTodo = totalTodo - completeTodo
    changeScore('total-todo', totalTodo)
    changeScore('todo-complete', completeTodo)
    changeScore('todo-pending', pendingTodo)
}

document.addEventListener('DOMContentLoaded', function () {
    const todoList = getTodo()
    if (todoList?.length) {
        todoList.forEach(todo => addToDoHtml(todo))
    } else {
        noRecordFound()
    }
    refreshScore()
})