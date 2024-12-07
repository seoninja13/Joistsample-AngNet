# Application Module Structure

## Core Module
Contains application-wide singleton services and utilities that are loaded once during app initialization.

### Services
- AuthService: Handles user authentication and token management
- ClientService: Manages client data operations
- EstimateService: Handles estimate creation and management
- InvoiceService: Manages invoice operations
- PaymentService: Processes payments and refunds
- ProjectService: Handles project management operations
- StorageService: Manages file storage operations
- TaxService: Calculates and manages tax rates
- ErrorService: Centralized error handling and display
- LoggerService: Application-wide logging system
- NotificationService: Manages system notifications
- CacheService: Handles data caching

### Guards
- AuthGuard: Protects routes requiring authentication
- RoleGuard: Manages role-based access
- PermissionGuard: Handles feature-level permissions

### Interceptors
- AuthInterceptor: Adds authentication tokens to HTTP requests
- ErrorInterceptor: Handles global error catching
- CacheInterceptor: Manages HTTP response caching
- LoadingInterceptor: Handles loading states

### Models
- User: User data and authentication
- Client: Client information
- Project: Project management
- Estimate: Estimate creation
- Invoice: Invoice management
- Payment: Payment processing
- ErrorMessage: Error handling
- Notification: System notifications
- Audit: System audit logs

## Feature Modules

### Authentication Module
- Login Component
- Register Component
- Password Reset Component
- Profile Management
- Account Settings

### Dashboard Module
- Overview Component
- Stats Display
- Quick Actions
- Recent Activity
- Notifications
- Calendar View

### Projects Module
- Project List
- Project Details
- Project Creation
- Timeline View
- Task Management
- File Management

### Clients Module
- Client List
- Client Details
- Client Creation
- Communication Log
- Document Management

### Estimates Module
- Estimate List
- Estimate Creation
- Template Management
- PDF Generation
- Client Approval

### Invoices Module
- Invoice List
- Invoice Creation
- Payment Processing
- Recurring Setup
- Payment History

## Shared Module

### Components
- ValidationMessage: Form validation display
- LoadingSpinner: Loading indicators
- StatusBadge: Status displays
- DataTable: Data grid component
- PageHeader: Header layouts
- NavBar: Navigation component
- ErrorDisplay: Error messages
- Notification: System notifications
- QuickActions: Common actions
- Modal: Reusable modal
- Tooltip: Information tooltips
- FileUpload: File handling
- DatePicker: Date selection
- SearchBar: Search functionality

### Utilities
- CurrencyUtils: Currency operations
- DateUtils: Date handling
- ValidationUtils: Form validation
- FileUtils: File operations
- StringUtils: String manipulation
- NumberUtils: Number formatting
- SecurityUtils: Security helpers
- StorageUtils: Storage management

### Directives
- ClickOutside: Click detection
- Debounce: Input delay
- Permissions: Access control
- AutoFocus: Input focus
- LazyLoad: Image loading
- Tooltip: Hover information
- Mask: Input formatting

### Pipes
- Currency: Currency formatting
- Date: Date formatting
- FileSize: Size formatting
- TimeAgo: Relative time
- SafeHtml: HTML sanitization
- NumberFormat: Number display
- StatusFormat: Status display