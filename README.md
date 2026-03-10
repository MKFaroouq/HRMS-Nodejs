🏢 HR Management System (Full-Stack)
A professional, full-stack web application designed to digitize and streamline core human resources operations. This system moves beyond basic CRUD by implementing real-world HR workflows, automatic calculations, and strict business rule enforcement.

<b>🚀 Key Features</b>
• Employee Lifecycle Management: Create, track, and manage employee profiles, departments, and job positions.
• Smart Leave Workflow: Multi-step approval system where employees submit requests and HR managers review with comments.
• Automatic Payroll Engine: System calculates net pay based on base salaries, deductions, and bonuses, generating monthly payslips.
• Attendance Tracking: HR can log/import daily records while employees monitor their own attendance history.
• Role-Based Access Control (RBAC): Secure environment with 3 distinct roles (Admin, HR Manager, Employee) using JWT & bcrypt.
• Interactive Dashboard: Visual summaries of total employees, pending leaves, and payroll stats.

🛠️ Technology Stack
• The project follows a structured Layered Architecture to ensure maintainability:
• Routes: API endpoints definition.
• Controllers: Request/Response handling logic.
• Services: Core business logic (Payroll & Leave rules).
• Models: Database schemas (User, Employee, Leave, etc.).
