# Task Management System (TMS)

A comprehensive full-stack task management application with role-based access control, built using React.js, Node.js, Express, and MongoDB.

## 🌟 Features

### Core Functionality
- **Multi-role authentication system** (Admin, HR, Employee)
- **Task and project management** with status tracking
- **Attendance tracking** and reporting
- **Performance appraisal system**
- **Real-time data updates**
- **Responsive web design**

### User Roles & Permissions
- **Admin**: Full system control, user management, security settings
- **HR**: Employee management, attendance tracking, performance reviews
- **Employee**: Task management, attendance marking, performance viewing

## 🛠️ Technology Stack

### Frontend
- **React.js** with Vite build tool
- **Material-UI** for component design
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment configuration

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/rahulvarmaviit/TMS.git
cd TMS
```

### 2. Environment Setup

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/tms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup

1. Ensure MongoDB is running on your system
2. The application will automatically create the required collections
3. For development, you can use MongoDB Compass or MongoDB Atlas

### 4. Start the Application

#### Development Mode

**Backend Server:**
```bash
cd backend
npm run dev
```
The server will start on http://localhost:5000

**Frontend Server:**
```bash
cd frontend
npm run dev
```
The application will open on http://localhost:5173

## 🔧 Available Scripts

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Default User Accounts

The system comes with default user accounts for testing:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin@tms.com | admin123 |
| HR | hr@tms.com | hr123456 |
| Employee | emp@tms.com | emp12345 |

*Note: Change these default credentials in production.*

## 🗂️ Project Structure

```
TMS/
├── backend/
│   ├── config/           # Database and app configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Authentication and validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   ├── hooks/       # Custom React hooks
│   │   └── utils/       # Frontend utilities
│   └── public/          # Static assets
├── .gitignore
├── README.md
└── package.json
```

## 🔐 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### HR Endpoints
- `GET /api/hr/employees` - Get all employees
- `POST /api/hr/attendance` - Mark attendance
- `GET /api/hr/attendance/:userId` - Get employee attendance
- `POST /api/hr/performance` - Add performance review
- `GET /api/hr/performance/:userId` - Get employee performance

### Employee Endpoints
- `GET /api/employee/tasks` - Get employee tasks
- `POST /api/employee/tasks` - Create new task
- `PUT /api/employee/tasks/:id` - Update task
- `DELETE /api/employee/tasks/:id` - Delete task

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB service is running
   - Check MongoDB URI in .env file
   - Verify MongoDB version compatibility

2. **CORS Issues**
   - Check backend CORS configuration
   - Ensure frontend API URL is correct

3. **Port Already in Use**
   - Change port in .env file
   - Kill existing processes on ports 5000/5173

4. **Module Not Found**
   - Run `npm install` in both backend and frontend
   - Clear npm cache: `npm cache clean --force`

### Development Tips

- Use MongoDB Compass for database visualization
- Use Postman for API testing
- Check browser developer tools for frontend issues
- Use nodemon for automatic server restart during development

## 🚀 Deployment

### Environment Variables for Production

```bash
# Backend (.env)
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret

# Frontend (.env)
VITE_API_URL=https://your-api-domain.com/api
```

### Build Commands

```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email: support@tms.com or create an issue in the GitHub repository.

---

**Happy coding! 🚀**