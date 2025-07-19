import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  // 로컬 스토리지에서 todos 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // todos가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 할 일 목록</h1>
          <p>오늘도 화이팅! 🎯</p>
        </header>

        <AddTodo onAdd={addTodo} />

        <div className="stats">
          <span>전체: {totalCount}</span>
          <span>완료: {completedCount}</span>
          <span>남은 할 일: {totalCount - completedCount}</span>
        </div>

        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {completedCount > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
            완료된 항목 삭제 ({completedCount})
          </button>
        )}

        <footer className="footer">
          <p>🌟 매일 조금씩, 꾸준히! 🌟</p>
        </footer>
      </div>
    </div>
  )
}

export default App 