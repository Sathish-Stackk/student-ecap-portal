# 🎓 Student E-CAP Portal

A student-only **Educational Campus Portal** for viewing college information, departments, facilities, placements, and managing student profiles.

## 🚀 Live Demo

**Live Demo URL:** [Deploy to Vercel/Netlify](https://github.com/Sathish-Stackk/student-ecap-portal)

> The application requires a live deployment. Follow the **Deployment** section below to host it publicly.

## ✨ Features

- ✅ Student registration and JWT-based login
- ✅ Student-only protected routes
- ✅ Interactive student dashboard
- ✅ College directory with detailed information
- ✅ View departments, placements, facilities
- ✅ Hostel, sports, and clubs information
- ✅ Student profile management (view & edit)
- ✅ Secure password hashing with bcryptjs
- ✅ MongoDB data persistence
- ✅ Modern React UI with Vite
- ✅ RESTful Express API

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + React Router |
| **Backend** | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + bcryptjs |
| **Styling** | CSS3 |

## 📁 Project Structure

```
student-ecap-portal/
├── client/                          # React Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CollegeDetails.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── *.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── models/
│   │   ├── Student.js               # Student schema
│   │   └── College.js               # College schema
│   ├── routes/
│   │   ├── auth.js                  # Login/Register
│   │   ├── student.js               # Student profile
│   │   └── college.js               # College details
│   └── index.js                     # Express server
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- MongoDB locally or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free)
- Git

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Sathish-Stackk/student-ecap-portal.git
cd student-ecap-portal
```

### 2️⃣ Install dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3️⃣ Set up environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection and secret:

```env
MONGODB_URI=mongodb://localhost:27017/student-ecap
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-ecap

JWT_SECRET=your-super-secret-key-here-change-this
PORT=5000
NODE_ENV=development
```

Create `client/.env.local` for the frontend API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Start the application

```bash
# Start both client and server concurrently
npm run dev
```

**URLs:**
- 🌐 Frontend: http://localhost:5173
- ⚙️ Backend: http://localhost:5000
- ✅ Health check: http://localhost:5000/api/health

## 📝 API Documentation

All endpoints (except auth) require JWT token in headers:

```
Authorization: Bearer <your-jwt-token>
```

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new student |
| POST | `/api/auth/login` | Login student & get JWT |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "registrationNumber": "REG12345",
  "rollNumber": "A01",
  "department": "CSE",
  "semester": 3,
  "college": "college-id-here",
  "phoneNumber": "9876543210"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Student Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/profile` | Get student profile |
| PUT | `/api/student/profile` | Update student profile |
| GET | `/api/student/dashboard` | Get dashboard info |

### College Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/college/all` | Get all colleges |
| GET | `/api/college/:collegeId` | Get college details |
| GET | `/api/college/:collegeId/departments` | Get departments |
| GET | `/api/college/:collegeId/placements` | Get placements info |
| GET | `/api/college/:collegeId/facilities` | Get facilities |

## 🔒 Authentication Flow

1. Student registers with email, password, and details
2. Password is hashed with bcryptjs
3. On login, credentials are verified
4. JWT token is issued (7-day expiry)
5. Token is stored in localStorage
6. All protected routes verify token before access
7. Logout clears token and redirects to login

## 🌐 Deployment

### Deploy Backend (Express API)

**Option 1: Render** (Recommended - Free tier available)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
6. Deploy!

**Option 2: Railway**

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Add MongoDB plugin
5. Set environment variables
6. Deploy!

### Deploy Frontend (React)

**Option 1: Vercel** (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Import project from GitHub
3. Set environment variables:
   - `VITE_API_URL`: Your deployed backend URL + `/api`
4. Deploy!

**Option 2: Netlify**

1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repo
3. Build command: `cd client && npm run build`
4. Publish directory: `client/dist`
5. Set environment variables
6. Deploy!

### Configure CORS

Update your backend `server/index.js` CORS configuration:

```javascript
app.use(cors({
  origin: 'https://your-deployed-frontend.vercel.app',
  credentials: true
}));
```

### Update Live Demo Link

After deployment, update this README:

```markdown
## 🚀 Live Demo

**Frontend:** https://your-frontend-url.vercel.app  
**Backend:** https://your-backend-url.onrender.com
```

## 📸 Screenshots

### Login Page
- Clean, modern UI
- Email & password validation
- Register link

### Dashboard
- Welcome message with student info
- College listings in grid format
- Easy navigation to college details

### College Details
- Overview tab: Principal, contact, website
- Departments: HOD, descriptions
- Placements: Packages, placement rate, top recruiters
- Facilities: Hostel, sports, clubs

### Student Profile
- View all profile information
- Edit profile feature
- Update phone, address, etc.

## 🧪 Test Account

After deploying with seed data, use:

```
Email: student@example.com
Password: password123
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Check backend CORS config and origin URL |
| MongoDB connection fails | Verify connection string in `.env` |
| Token expires | Logout and login again (7-day expiry) |
| Frontend can't reach API | Ensure `VITE_API_URL` is correct |

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Tutorial](https://jwt.io/introduction)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sathish Mungi**  
GitHub: [@Sathish-Stackk](https://github.com/Sathish-Stackk)

## 🌟 Star this repository if you found it helpful!

---

**Last Updated:** September 2024
