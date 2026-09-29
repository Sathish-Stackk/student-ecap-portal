import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Profile.css'

const Profile = () => {
  const [student, setStudent] = useState(null)
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/student/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStudent(response.data)
        setFormData(response.data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/student/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStudent(response.data.student)
      setEdit(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    navigate('/login')
  }

  if (loading) return <div className="loading">Loading profile...</div>
  if (!student) return <div className="error">Profile not found</div>

  return (
    <div className="profile-page">
      <div className="navbar">
        <h1>🎓 E-CAP Portal</h1>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/college">College Details</Link>
          <Link to="/profile">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Student Profile</h2>
          {edit ? (
            <div className="profile-form">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled />
              <input name="registrationNumber" placeholder="Registration" value={formData.registrationNumber} onChange={handleChange} disabled />
              <input name="phoneNumber" placeholder="Phone" value={formData.phoneNumber || ''} onChange={handleChange} />
              <input name="address" placeholder="Address" value={formData.address || ''} onChange={handleChange} />
              <div className="button-group">
                <button onClick={handleSave} className="save-btn">Save Changes</button>
                <button onClick={() => setEdit(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Registration:</strong> {student.registrationNumber}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Semester:</strong> {student.semester}</p>
              <p><strong>Phone:</strong> {student.phoneNumber || 'N/A'}</p>
              <p><strong>Address:</strong> {student.address || 'N/A'}</p>
              <button onClick={() => setEdit(true)} className="edit-btn">Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
