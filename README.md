# Plot-net_Property-Management-System
Combine Ai with Angular and here you are.

# PlotNet Frontend - Property Management System

A comprehensive Angular frontend application for managing property schemes, sales, and administration in the real estate industry.

## Features

### 🏢 Admin Dashboard
- **User Management**: Create, edit, and manage users with role-based access
- **System Settings**: Configure company settings and security options
- **Reports & Analytics**: Generate sales, user, and property reports
- **Dashboard Overview**: Real-time statistics and recent activity monitoring

### 👥 Associate Management
- **Lead Management**: Track and manage potential customers
- **Deal Pipeline**: Monitor sales deals from negotiation to completion
- **Customer Database**: Maintain comprehensive customer information
- **Performance Tracking**: Monitor conversion rates and commission earnings
- **Sales Reports**: Detailed performance analytics and lead source tracking

### 🏘️ Property Schemes Management
- **Property Overview**: Manage residential, commercial, and office properties
- **Plot Management**: Individual plot tracking with detailed information
- **Property Types**:
  - **Residential**: Family homes and residential plots
  - **Commercial**: Business spaces and retail locations
  - **Office**: Corporate office spaces and co-working areas
- **Amenities Tracking**: Comprehensive amenity management
- **Availability Status**: Real-time plot availability and pricing

## Technology Stack

- **Frontend**: Angular 17 with Standalone Components
- **UI Framework**: Angular Material Design
- **Styling**: SCSS with custom themes
- **State Management**: RxJS Observables
- **Routing**: Angular Router with lazy loading
- **Authentication**: JWT-based authentication service

## Project Structure

```
plotnet-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/           # Admin dashboard component
│   │   │   ├── associate/       # Associate management component
│   │   │   ├── schemes/         # Property schemes component
│   │   │   └── login/           # Authentication component
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── user.model.ts
│   │   │   ├── property.model.ts
│   │   │   └── sales.model.ts
│   │   ├── services/            # Business logic services
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── property.service.ts
│   │   │   └── sales.service.ts
│   │   ├── app.component.ts     # Root component with navigation
│   │   ├── app.config.ts        # Application configuration
│   │   └── app.routes.ts        # Routing configuration
│   ├── styles.scss              # Global styles
│   └── index.html               # Main HTML file
├── angular.json                 # Angular CLI configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (optional, for development)

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd plotnet-frontend
   npm install
   ```

2. **Install Angular CLI (if not already installed)**
   ```bash
   npm install -g @angular/cli
   ```

3. **Start Development Server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:4200`

## Demo Credentials

### Admin Access
- **Email**: admin@plotnet.com
- **Password**: password
- **Features**: Full system access, user management, reports

### Associate Access
- **Email**: associate@plotnet.com
- **Password**: password
- **Features**: Associate management, lead tracking, customer management

## Key Features by Role

### Admin Features
- ✅ User management (create, edit, delete users)
- ✅ System configuration and settings
- ✅ Comprehensive reporting dashboard
- ✅ Real-time activity monitoring
- ✅ Security settings management

### Associate Features
- ✅ Lead generation and tracking
- ✅ Deal pipeline management
- ✅ Customer relationship management
- ✅ Performance analytics
- ✅ Commission tracking
- ✅ Sales report generation

### Property Management Features
- ✅ Multi-type property support (Residential, Commercial, Office)
- ✅ Individual plot management
- ✅ Amenity tracking
- ✅ Pricing and availability management
- ✅ Property analytics and reporting

## API Integration

The application is designed to work with a REST API backend. Currently, it uses mock data for demonstration purposes. To integrate with a real backend:

1. Update the API URLs in the service files
2. Remove mock data implementations
3. Configure proper HTTP interceptors for authentication
4. Set up error handling for API calls

### Expected API Endpoints

```
POST /api/auth/login          # User authentication
GET  /api/users               # Get all users
POST /api/users               # Create new user
PUT  /api/users/:id           # Update user
DELETE /api/users/:id         # Delete user

GET  /api/properties          # Get all properties
POST /api/properties          # Create new property
PUT  /api/properties/:id      # Update property
GET  /api/properties/:id/plots # Get plots for property

GET  /api/sales/leads         # Get all leads
POST /api/sales/leads         # Create new lead
PUT  /api/sales/leads/:id     # Update lead
GET  /api/sales/deals         # Get all deals
POST /api/sales/deals         # Create new deal
```

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Code Linting
```bash
ng lint
```

## Customization

### Theming
- Modify `src/styles.scss` for global styles
- Update Angular Material theme in the styles file
- Customize component-specific styles in individual component files

### Adding New Features
1. Create new components in the `components/` directory
2. Add corresponding routes in `app.routes.ts`
3. Create services for data management
4. Update navigation in `app.component.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the project repository.

---

**PlotNet Frontend** - Streamlining property management with modern web technology.
