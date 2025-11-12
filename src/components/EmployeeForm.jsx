import React, { useEffect, useState } from 'react'
import { createEmployee, updateEmployee } from '../api'

export default function EmployeeForm({ employee, onClose }) {
  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    position: '',
    salary: '',
    department: '',
    email: '',
    phoneNumber: '',
    dateOfJoining: '',
    experience: '',
    address: ''
  })

  useEffect(() => {
    if (employee) {
      setForm({
        employeeId: employee.employeeId || '',
        name: employee.name || '',
        position: employee.position || '',
        salary: employee.salary || '',
        department: employee.department || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        dateOfJoining: employee.dateOfJoining || '',
        experience: employee.experience || '',
        address: employee.address || ''
      })
    }
  }, [employee])

  function change(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    try {
      // validate and normalize numeric fields before sending to backend
      const id = parseInt(form.employeeId, 10)
      if (isNaN(id)) {
        alert('Employee ID must be a valid number')
        return
      }

      const payload = {
        ...form,
        employeeId: id,
        salary: parseFloat(form.salary || 0),
        experience: form.experience ? parseFloat(form.experience) : null
      }

      if (employee) {
        await updateEmployee(id, payload)
        alert('Updated')
      } else {
        await createEmployee(payload)
        alert('Created')
      }

      onClose()
      // reload page to reflect changes (simple approach)
      window.location.reload()
    } catch (err) {
      alert('Save failed: ' + (err?.response?.data || err.message))
    }
  }

  return (
    <div className="modal">
      <form className="form" onSubmit={submit}>
        <h3>{employee ? 'Edit Employee' : 'New Employee'}</h3>

  <label>ID</label>
  <input name="employeeId" value={form.employeeId} onChange={change} required disabled={!!employee} type="number" />

        <label>Name</label>
        <input name="name" value={form.name} onChange={change} required />

        <label>Position</label>
        <input name="position" value={form.position} onChange={change} />

        <label>Salary</label>
        <input name="salary" value={form.salary} onChange={change} type="number" step="0.01" />

        <label>Department</label>
        <input name="department" value={form.department} onChange={change} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={change} type="email" />

        <label>Phone</label>
        <input name="phoneNumber" value={form.phoneNumber} onChange={change} />

        <label>Date of joining</label>
        <input name="dateOfJoining" value={form.dateOfJoining} onChange={change} type="date" />

        <label>Experience (years)</label>
        <input name="experience" value={form.experience} onChange={change} type="number" step="0.1" />

        <label>Address</label>
        <textarea name="address" value={form.address} onChange={change} />

        <div className="actions">
          <button type="submit" className="btn primary">Save</button>
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
