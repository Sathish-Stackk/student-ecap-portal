import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {
  const [student, setStudent] = useState(null)
  const [colleges, setColleges] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem('student') || '{}')
        setStudent(studentData)
        
        const response = await axios.get(`${API_URL}/college/all`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setColleges(response.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <div className="navbar">
        <h1>🎓 E-CAP Portal</h1>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/college">College Details</Link>
          <Link to="/profile">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {student?.name}! 👋</h2>
          <p>Registration: {student?.registrationNumber} | Roll: {student?.rollNumber}</p>
          <p>Department: {student?.department} | Semester: {student?.semester}</p>
        </div>

        <div className="colleges-section">
          <h3>📚 Available Colleges</h3>
          {loading ? (
            <p>Loading colleges...</p>
          ) : colleges.length === 0 ? (
            <p>No colleges available</p>
          ) : (
            <div className="colleges-grid">
              {colleges.map((college) => (
                <div key={college._id} className="college-card">
                  <h4>{college.name}</h4>
                  <p><strong>Code:</strong> {college.code}</p>
                  <p><strong>Location:</strong> {college.location?.city}, {college.location?.state}</p>
                  <p><strong>Students:</strong> {college.studentCount || 'N/A'}</p>
                  <Link to={`/college`} className="view-btn">View Details</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
