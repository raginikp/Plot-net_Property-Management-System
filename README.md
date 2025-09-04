# PlotNet - Property Management System

A comprehensive Angular frontend application for managing property schemes, sales, and administration in the real estate industry.

## 🏢 Project Overview

PlotNet is a modern property management system built with Angular 17 that provides a complete solution for real estate businesses to manage properties, sales, and user roles efficiently.

## 🚀 Features

- **Multi-Role Authentication**: Support for Admin, Associate, and Customer roles
- **Property Management**: Complete CRUD operations for property listings
- **Sales Management**: Track and manage property sales and transactions
- **Scheme Management**: Handle various property schemes and offers
- **User Management**: Comprehensive user administration
- **Modern UI**: Built with Angular Material for a professional look

## 🛠️ Technology Stack

- **Frontend**: Angular 17
- **UI Framework**: Angular Material
- **Styling**: SCSS
- **State Management**: RxJS
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📁 Project Structure

```
plotnet-frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Feature components
│   │   │   ├── admin/          # Admin dashboard components
│   │   │   ├── associate/      # Associate portal components
│   │   │   ├── login/          # Authentication components
│   │   │   └── schemes/        # Property schemes components
│   │   ├── models/             # TypeScript interfaces
│   │   │   ├── property.model.ts
│   │   │   ├── sales.model.ts
│   │   │   └── user.model.ts
│   │   ├── services/           # Angular services
│   │   │   ├── auth.service.ts
│   │   │   ├── property.service.ts
│   │   │   ├── sales.service.ts
│   │   │   └── user.service.ts
│   │   ├── app.component.ts    # Root component
│   │   ├── app.config.ts       # Application configuration
│   │   └── app.routes.ts       # Routing configuration
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application bootstrap
│   └── styles.scss             # Global styles
├── angular.json                # Angular CLI configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🔧 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (optional but recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raginikp/Plot-net_Property-Management-System.git
   cd Plot-net_Property-Management-System/plotnet-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

1. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

2. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## 🏗️ Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Run the unit tests:
```bash
npm test
```

## 📱 User Roles

### Admin
- Complete system administration
- User management
- Property oversight
- Sales analytics

### Associate
- Property management
- Customer interaction
- Sales processing

### Customer
- Property browsing
- Scheme exploration
- Purchase inquiries

## 🎨 UI Components

The application uses Angular Material components for:
- Navigation and layout
- Forms and inputs
- Data tables
- Dialogs and modals
- Progress indicators

## 🔐 Authentication

The system implements role-based authentication with:
- JWT token management
- Route guards
- Role-based access control
- Secure login/logout functionality

## 📊 Data Models

### Property Model
- Property details and specifications
- Location information
- Pricing and availability
- Media attachments

### Sales Model
- Transaction records
- Customer information
- Payment tracking
- Commission calculations

### User Model
- User profiles and roles
- Authentication credentials
- Activity tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Developer**: Ragini KP (@raginikp)

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Happy Coding! 🚀**

*Built with ❤️ using Angular 17*
