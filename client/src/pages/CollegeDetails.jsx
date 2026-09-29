import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Details.css'

const CollegeDetails = () => {
  const [college, setCollege] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('token')
  const student = JSON.parse(localStorage.getItem('student') || '{}')

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        if (student.college) {
          const response = await axios.get(`${API_URL}/college/${student.college}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setCollege(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch college details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCollege()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    navigate('/login')
  }

  if (loading) return <div className="loading">Loading college details...</div>
  if (!college) return <div className="error">College not found</div>

  return (
    <div className="details-page">
      <div className="navbar">
        <h1>🎓 E-CAP Portal</h1>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/college">College Details</Link>
          <Link to="/profile">Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="details-content">
        <div className="college-header">
          <h2>{college.name}</h2>
          <p>Code: {college.code} | Established: {college.established}</p>
          <p>{college.location?.address}, {college.location?.city}, {college.location?.state}</p>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`tab ${activeTab === 'departments' ? 'active' : ''}`} onClick={() => setActiveTab('departments')}>Departments</button>
          <button className={`tab ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>Placements</button>
          <button className={`tab ${activeTab === 'facilities' ? 'active' : ''}`} onClick={() => setActiveTab('facilities')}>Facilities</button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview">
              <p><strong>Description:</strong> {college.description || 'N/A'}</p>
              <p><strong>Principal:</strong> {college.principal || 'N/A'}</p>
              <p><strong>Students:</strong> {college.studentCount || 'N/A'}</p>
              <p><strong>Staff:</strong> {college.staffCount || 'N/A'}</p>
              <p><strong>Contact:</strong> {college.contactInfo?.email} | {college.contactInfo?.phone}</p>
              <p><strong>Website:</strong> {college.contactInfo?.website}</p>
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="departments">
              {college.departments && college.departments.length > 0 ? (
                <div className="dept-grid">
                  {college.departments.map((dept, idx) => (
                    <div key={idx} className="dept-card">
                      <h4>{dept.name}</h4>
                      <p><strong>HOD:</strong> {dept.hod || 'N/A'}</p>
                      <p>{dept.description || 'No description available'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No departments available</p>
              )}
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="placements">
              {college.placements ? (
                <div>
                  <p><strong>Average Package:</strong> {college.placements.averagePackage || 'N/A'}</p>
                  <p><strong>Highest Package:</strong> {college.placements.highestPackage || 'N/A'}</p>
                  <p><strong>Placement Rate:</strong> {college.placements.placementRate || 'N/A'}%</p>
                  <p><strong>Top Recruiters:</strong></p>
                  <ul>
                    {college.placements.topRecruiters?.map((recruiter, idx) => (
                      <li key={idx}>{recruiter}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Placement data not available</p>
              )}
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="facilities">
              <h4>Campus Facilities</h4>
              <ul>
                {college.facilities?.map((facility, idx) => (
                  <li key={idx}>{facility}</li>
                ))}
              </ul>
              {college.hostel && (
                <div className="hostel-info">
                  <h4>Hostel Information</h4>
                  <p><strong>Available:</strong> {college.hostel.available ? 'Yes' : 'No'}</p>
                  <p><strong>Capacity:</strong> {college.hostel.capacity || 'N/A'}</p>
                  <p><strong>Fee per Semester:</strong> ${college.hostel.feePerSemester || 'N/A'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollegeDetails
