import { useState } from 'react'
import './AddTodo.css'

function AddTodo({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        className="add-todo-input"
      />
      <button type="submit" className="add-todo-button">
        ➕ 추가
      </button>
    </form>
  )
}

export default AddTodo 