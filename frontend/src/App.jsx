import React, { useState } from 'react'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'

export default function App() {
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function handleCreate() {
    setEditingEmployee(null)
    setShowForm(true)
  }

  function handleEdit(employee) {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  function handleClose() {
    setShowForm(false)
    setEditingEmployee(null)
  }

  return (
    <div className="container">
      <header>
        <h1>Employee Manager</h1>
        <p>Simple frontend for the Spring Boot Employee service</p>
      </header>

      <main>
        <div className="toolbar">
          <button className="btn primary" onClick={handleCreate}>Add Employee</button>
        </div>

        <EmployeeList onEdit={handleEdit} />

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onClose={handleClose}
          />
        )}
      </main>

      <footer>
        <small>Uses backend at http://localhost:8080</small>
      </footer>
    </div>
  )
}
