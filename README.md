# CivicFix - Community Issue Reporting Platform

A modern, responsive web application for citizens to report and track civic issues in their community. Built with React, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure login/registration system
- **Issue Reporting**: Submit civic complaints with images and location
- **Interactive Map**: View all reported issues on Google Maps
- **Real-time Updates**: Track complaint status and progress
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Role-based Access**: Different permissions for users, moderators, and admins
- **Image Upload**: Support for multiple image uploads
- **Location Services**: Google Maps integration for precise location reporting

## 🛠️ Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router DOM
- **Styling**: Tailwind CSS, Lucide React Icons
- **Maps**: Google Maps JavaScript API
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with RTK Query
- **Notifications**: React Hot Toast
- **Form Handling**: React Hooks with custom validation

## 📁 Project Structure

```
civicfix/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Application footer
│   │   ├── ComplaintCard.jsx # Individual complaint display
│   │   ├── ComplaintList.jsx # List of complaints
│   │   ├── ComplaintDetail.jsx # Detailed complaint view
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── MapComponent.jsx # Google Maps integration
│   │   └── ReportForm.jsx  # Issue reporting form
│   ├── pages/              # Application pages
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # User login
│   │   ├── Register.jsx    # User registration
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── Complaints.jsx  # All complaints view
│   │   ├── Report.jsx      # Report new issue
│   │   └── Map.jsx         # Map view of issues
│   ├── store/              # Redux store configuration
│   │   ├── store.js        # Store setup
│   │   └── slices/         # Redux slices
│   │       ├── authSlice.js # Authentication state
│   │       ├── complaintsSlice.js # Complaints state
│   │       └── uiSlice.js  # UI state (dark mode, etc.)
│   ├── services/           # API service functions
│   │   ├── authAPI.js      # Authentication API calls
│   │   └── complaintsAPI.js # Complaints API calls
│   ├── utils/              # Utility functions
│   ├── constants/          # Application constants
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Google Maps API key
- Backend API server (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civicfix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment example file
   cp .env.example .env
   
   # Edit .env and add your Google Maps API key
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Configuration

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps JavaScript API
4. Create credentials (API Key)
5. Add the key to your `.env` file

### Backend API

The application expects a backend API at `http://localhost:3001/api` by default. You can configure this in the `.env` file.

## 📱 Usage

### For Citizens
1. **Register/Login**: Create an account or sign in
2. **Report Issues**: Use the "Report Issue" button to submit new complaints
3. **Track Progress**: View your reported issues in the dashboard
4. **Browse Community**: View all community issues in the complaints section
5. **Map View**: See issues geographically on the interactive map

### For Administrators
1. **Manage Complaints**: View, edit, and update complaint status
2. **Assign Issues**: Assign complaints to department staff
3. **Analytics**: View dashboard with complaint statistics
4. **User Management**: Manage user accounts and permissions

## 🎨 Customization

### Themes
The application supports both light and dark themes. Users can toggle between them using the theme switcher in the header.

### Styling
All styling is done with Tailwind CSS. You can customize colors, spacing, and components by modifying the `tailwind.config.js` file.

### Components
Components are built to be reusable and customizable. You can modify component props and styling to match your specific needs.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/civicfix/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🔮 Roadmap

- [ ] Push notifications for status updates
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with city management systems
- [ ] Multi-language support
- [ ] Offline capability
- [ ] Social media sharing
- [ ] Community voting system

---

**Built with ❤️ for better communities** 