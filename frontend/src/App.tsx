import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './routes/AuthGuard';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { StudentRegistration } from './pages/StudentRegistration';
import { StudentSearch } from './pages/StudentSearch';
import { StudentList } from './pages/StudentList';
import { StudentEnrollment } from './pages/StudentEnrollment';
import { CourseList } from './pages/CourseList';
import { AcademicYears } from './pages/AcademicYears';
import { Semesters } from './pages/Semesters';
import { DegreePrograms } from './pages/DegreePrograms';
import { CourseOfferings } from './pages/CourseOfferings';
import { GlobalEnrollments } from './pages/GlobalEnrollments';
import { AuditLogs } from './pages/AuditLogs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<AuthGuard />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/search" element={<StudentSearch />} />
              <Route path="/students/new" element={<StudentRegistration />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/offerings" element={<CourseOfferings />} />
              <Route path="/enrollments" element={<GlobalEnrollments />} />
              <Route path="/students/:id/enroll" element={<StudentEnrollment />} />
              <Route path="/academic-years" element={<AcademicYears />} />
              <Route path="/semesters" element={<Semesters />} />
              <Route path="/degrees" element={<DegreePrograms />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
