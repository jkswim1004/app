import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText)
    }
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button 
        className="toggle-button"
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed ? '✅' : '⭕'}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleEdit}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="save-button">
              💾
            </button>
            <button onClick={handleCancel} className="cancel-button">
              ❌
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(todo.id)} 
              className="delete-button"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem 