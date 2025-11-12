import React, { useEffect, useState } from 'react'
import { fetchEmployees, deleteEmployee } from '../api'

export default function EmployeeList({ onEdit }) {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchEmployees()
      console.log('Employees fetched:', data)
      setEmployees(data)
    } catch (err) {
      console.error('Failed to fetch employees', err)
      setError(err.message || 'Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete employee id ' + id + '?')) return
    try {
      await deleteEmployee(id)
      await load()
    } catch (err) {
      alert('Delete failed: ' + (err?.response?.data || err.message))
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length ? (
            employees.map(emp => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.salary}</td>
                <td>{emp.department}</td>
                <td>{emp.email}</td>
                <td>
                  <button className="btn" onClick={() => onEdit(emp)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDelete(emp.employeeId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={7}>No employees found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
