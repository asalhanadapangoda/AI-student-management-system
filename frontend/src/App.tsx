import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './routes/AuthGuard';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { StudentRegistration } from './pages/StudentRegistration';
import { StudentSearch } from './pages/StudentSearch';
import { AuditLogs } from './pages/AuditLogs';

// Placeholders
const Courses = () => <div>Courses Page</div>;
const CourseOfferings = () => <div>Course Offerings Page</div>;
const Enrollments = () => <div>Enrollments Page</div>;
const AcademicYears = () => <div>Academic Years Page</div>;
const Semesters = () => <div>Semesters Page</div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<AuthGuard />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentSearch />} />
              <Route path="/students/new" element={<StudentRegistration />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/offerings" element={<CourseOfferings />} />
              <Route path="/enrollments" element={<Enrollments />} />
              <Route path="/academic-years" element={<AcademicYears />} />
              <Route path="/semesters" element={<Semesters />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
