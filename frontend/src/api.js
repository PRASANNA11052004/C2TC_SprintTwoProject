import axios from 'axios'

const BASE = ''

export async function fetchEmployees() {
  const res = await axios.get(`${BASE}/employeeservice`)
  return res.data
}

export async function fetchEmployee(id) {
  const res = await axios.get(`${BASE}/employeeservice/${id}`)
  return res.data
}

export async function createEmployee(employee) {
  const res = await axios.post(`${BASE}/employeeservice`, employee)
  return res.data
}

export async function updateEmployee(id, employee) {
  const res = await axios.put(`${BASE}/employeeservice/${id}`, employee)
  return res.data
}

export async function deleteEmployee(id) {
  const res = await axios.delete(`${BASE}/employeeservice/${id}`)
  return res.data
}
