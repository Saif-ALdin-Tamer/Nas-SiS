# Student Information System ERP Architecture
**Project:** Nas-SiS Educational ERP

This document defines a secure, clean, and maintainable MERN backend architecture for the Student Information System. It includes backend structure, data model design, API contracts, security controls, and frontend integration guidance.

---

## 1. Architecture Summary

The ERP is built as a modern MERN application:
* **Frontend:** React + Vite + React Router.
* **Backend:** Node.js + Express.
* **Database:** MongoDB.
* **Deployment:** Container-ready, environment-driven, ready for CI/CD.

Key goals:
* **Security first:** authentication, authorization, input validation, secure headers, rate limiting.
* **Clean code:** modular controllers, services, middleware, and models.
* **Scalability:** versioned APIs, separate feature modules, reusable utilities.
* **Observability:** structured logging, centralized error handling, metrics-ready.

---

## 2. Backend Folder Structure

Recommended backend layout:

```text
Backend/
├── server.js
├── config/
│   ├── db.js
│   └── env.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── students.js
│   ├── finance.js
│   ├── attendance.js
│   ├── academic.js
│   └── index.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── studentController.js
│   ├── financeController.js
│   ├── attendanceController.js
│   └── academicController.js
├── services/
│   ├── authService.js
│   ├── userService.js
│   ├── studentService.js
│   └── financeService.js
├── models/
│   ├── User.js
│   ├── StudentProfile.js
│   ├── Class.js
│   ├── Attendance.js
│   ├── Fee.js
│   ├── Exam.js
│   └── Notice.js
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   ├── errorMiddleware.js
│   └── rateLimiter.js
├── utils/
│   ├── apiResponse.js
│   ├── logger.js
│   ├── constants.js
│   └── validators.js
└── tests/
    ├── unit/
    └── integration/
```

This structure keeps responsibilities separated and ensures clean, maintainable code.

---

## 3. Backend Design Principles

### 3.1 Clean Code
* Each module has a single responsibility.
* Controllers handle request/response and delegate business rules to services.
* Services contain reusable business logic.
* Models define schemas and indexes.
* Middleware handles cross-cutting concerns.
* Use consistent naming: `getStudent`, `createInvoice`, `authorizeRole`.
* Use `async/await` and a common error wrapper for promise safety.

### 3.2 Security Best Practices
* **Authentication:** JWT access tokens, refresh tokens, secure cookie option for browsers.
* **Authorization:** Role-based access control (RBAC) via middleware.
* **Password security:** bcrypt hashing with a strong salt rounds value.
* **Input validation:** Joi or express-validator for all incoming payloads.
* **Sanitization:** prevent NoSQL injection and XSS by sanitizing request inputs.
* **HTTP security:** helmet, CORS whitelist, HSTS, CSP when applicable.
* **Rate limiting:** throttle public endpoints like login and registration.
* **Environment secrets:** store secrets in `.env`; never commit them.
* **Error handling:** do not expose stack traces in production.
* **Logging:** structured logs with request context and error details.

### 3.3 Maintainability
* Version APIs: `/api/v1/...`.
* Use config modules for environment, database, and third-party keys.
* Keep routes thin and reusable.
* Document endpoints and data contracts.
* Add tests for critical flows.

---

## 4. Core Models

### `User`
Properties:
* `_id`: ObjectId
* `name`: String
* `email`: String, unique, lowercase
* `password`: String, hashed
* `role`: Enum ['superAdmin','admin','teacher','student','parent','accountant','hr']
* `status`: Enum ['active','inactive','pending']
* `lastLogin`: Date
* `createdAt`, `updatedAt`

Security:
* Hash passwords before save.
* Use `select: false` for password.
* Keep role names stable.

### `StudentProfile`
Properties:
* `_id`: ObjectId
* `userId`: ObjectId ref User
* `studentId`: String, unique
* `dateOfBirth`: Date
* `gender`: Enum ['male','female','other']
* `address`: { street, city, state, zip, country }
* `parentId`: ObjectId ref User
* `enrollmentDate`: Date
* `currentClass`: ObjectId ref Class
* `gradeLevel`: String
* `emergencyContact`: { name, relation, phone }

### `Class`
Properties:
* `_id`: ObjectId
* `name`: String
* `section`: String
* `academicYear`: String
* `classTeacher`: ObjectId ref User
* `subjects`: [String]

### `Attendance`
Properties:
* `_id`: ObjectId
* `date`: Date
* `classId`: ObjectId ref Class
* `records`: [{ studentId: ObjectId ref StudentProfile, status: Enum ['present','absent','late','excused'], remarks: String }]
* `createdBy`: ObjectId ref User

### `Fee`
Properties:
* `_id`: ObjectId
* `studentId`: ObjectId ref StudentProfile
* `invoiceNumber`: String, unique
* `amountDue`: Number
* `amountPaid`: Number
* `dueDate`: Date
* `status`: Enum ['paid','unpaid','partial','overdue']
* `payments`: [{ amount, date, method, reference }]

### `Exam`
Properties:
* `_id`: ObjectId
* `name`: String
* `classId`: ObjectId ref Class
* `startDate`, `endDate`: Date
* `subjects`: [{ subjectName, maxMarks }]
* `results`: [{ studentId, marksObtained, grade }]

### `Notice`
Properties:
* `_id`: ObjectId
* `title`: String
* `message`: String
* `postedBy`: ObjectId ref User
* `audience`: Enum ['all','students','teachers','parents','staff']
* `publishDate`: Date
* `expiryDate`: Date

Additional collections can include `Payment`, `LeaveRequest`, `AuditLog`, `Notification`, and `Settings`.

---

## 5. API Endpoints

### Auth & User Management
* `POST /api/v1/auth/login` - login with email/password
* `POST /api/v1/auth/register` - register new user (admin-only / invite-only)
* `POST /api/v1/auth/refresh` - refresh access token
* `POST /api/v1/auth/logout` - revoke refresh token
* `GET /api/v1/auth/me` - current user profile
* `PUT /api/v1/users/:id` - update profile
* `GET /api/v1/users` - list users with filters (admin)

### Student & Admissions
* `GET /api/v1/students` - list students
* `POST /api/v1/students` - enroll student
* `GET /api/v1/students/:id` - student details
* `PUT /api/v1/students/:id` - update student
* `DELETE /api/v1/students/:id` - archive student

### Finance
* `GET /api/v1/finance/invoices` - list invoices
* `POST /api/v1/finance/invoices` - create invoice
* `GET /api/v1/finance/invoices/:id` - invoice details
* `POST /api/v1/finance/payments` - record payment
* `GET /api/v1/finance/reports` - fee collection summary

### Attendance
* `POST /api/v1/attendance/mark` - mark attendance
* `GET /api/v1/attendance/class/:classId` - class attendance
* `GET /api/v1/attendance/student/:studentId` - student attendance report

### Academic & Exams
* `GET /api/v1/academic/classes` - class list
* `POST /api/v1/academic/classes` - create class
* `GET /api/v1/academic/exams` - exam schedules
* `POST /api/v1/academic/exams` - create exam
* `GET /api/v1/academic/results/:studentId` - student results

### Communication & Notices
* `GET /api/v1/noticeboard` - notices
* `POST /api/v1/noticeboard` - create notice
* `POST /api/v1/messages` - send message

All endpoints should return a consistent response format:
```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

---

## 6. Security and Clean Code Checklist

### Security Controls
* Use `helmet()` for HTTP headers.
* Use `cors()` with explicit origin allowlist.
* Use `express-rate-limit` on auth endpoints.
* Validate all request bodies, params, and query values.
* Sanitize input to avoid NoSQL injection.
* Protect admin and teacher routes with RBAC middleware.
* Store JWT secrets, DB credentials, and third-party keys in `.env`.
* Rotate secrets and use secure storage for production.
* Use HTTPS in production and secure cookies when relevant.

### Clean Code Practices
* Keep routes declarative: `router.post('/login', authController.login)`.
* Avoid business logic inside route handlers.
* Isolate database access in model/service layers.
* Keep function names descriptive and small.
* Add comments only where behavior is non-obvious.
* Use a shared `ApiError` or error class for consistent error responses.
* Keep file imports relative and organized.
* Use linting and formatting, e.g. ESLint + Prettier.

---

## 7. Frontend Integration

Frontend should consume the backend through versioned APIs. Recommended React structure:

```text
frontend/src/
├── assets/
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── auth/
│   └── ui/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
│   └── api.js
├── store/
└── utils/
```

Frontend security:
* Store tokens securely; prefer in-memory or secure cookies.
* Use route guards for protected pages.
* Validate forms before submit.
* Avoid exposing API keys in client code.

---

## 8. Deployment and Operations

Recommended deployment flow:
* Use environment-specific config (`development`, `staging`, `production`).
* Run database migrations or seed scripts from a safe deploy step.
* Build frontend separately and serve it from a CDN or static site host.
* Deploy backend behind HTTPS with a reverse proxy or managed platform.
* Enable monitoring, log aggregation, and backups.

Additional recommendations:
* Use Docker for local parity and deployable containers.
* Use MongoDB Atlas or a managed cluster for production.
* Add CI checks for linting, tests, and security scanning.

---

## 9. Next Steps

1. Create backend scaffolding with `server.js`, `config/db.js`, `routes/`, `controllers/`, `models/`, `middleware/`, and `utils/`.
2. Implement authentication and RBAC first.
3. Add model schemas, validation, and database connection.
4. Build API endpoints gradually: auth → users → students → finance → attendance.
5. Add tests and secure deployment settings.
