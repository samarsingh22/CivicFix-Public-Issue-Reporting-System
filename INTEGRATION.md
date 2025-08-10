# CivicFix Integration Guide

This document explains how all the components of CivicFix work together and how to test the application.

## 🔗 Component Integration

### 1. Application Flow

```
App.jsx (Router Setup)
├── Header (Navigation + Theme Toggle)
├── Main Content (Routes)
│   ├── Home (Landing Page)
│   ├── Login/Register (Authentication)
│   ├── Dashboard (User Dashboard)
│   ├── Complaints (List + Map View)
│   ├── Report (Issue Submission)
│   ├── Map (Full Map View)
│   └── ComplaintDetail (Individual Issue)
└── Footer
```

### 2. State Management (Redux)

```
Store (store.js)
├── authSlice (User authentication state)
├── complaintsSlice (Complaints data and operations)
└── uiSlice (UI state like dark mode)
```

### 3. Data Flow

```
User Action → Component → Redux Action → API Service → Backend → Response → Redux State → UI Update
```

## 🧪 Testing the Application

### 1. Start the Development Server

```bash
cd civicfix
npm run setup    # First time setup
npm run dev      # Start development server
```

### 2. Test User Registration

1. Navigate to `/register`
2. Fill out the registration form
3. Submit and verify user is created
4. Check Redux state in browser dev tools

### 3. Test User Login

1. Navigate to `/login`
2. Use credentials from registration
3. Verify successful login and redirect to dashboard
4. Check authentication state in Redux

### 4. Test Issue Reporting

1. Login as a user
2. Navigate to `/report`
3. Fill out the complaint form
4. Upload test images
5. Submit and verify complaint is created
6. Check complaints list

### 5. Test Map Integration

1. Navigate to `/map`
2. Verify Google Maps loads (requires API key)
3. Check if complaints appear as markers
4. Test map controls and filters

### 6. Test Complaint Management

1. View complaints in `/complaints`
2. Test filtering and search
3. View individual complaint details
4. Test edit/delete functionality (if user owns complaint)

## 🔧 Configuration Requirements

### 1. Google Maps API

- **Required**: Google Maps JavaScript API key
- **Setup**: 
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Enable Maps JavaScript API
  3. Create API key
  4. Add to `.env` file

### 2. Backend API

- **Required**: Backend server running on port 3001
- **Endpoints**: 
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `GET /api/complaints` - Fetch complaints
  - `POST /api/complaints` - Create complaint
  - `PUT /api/complaints/:id` - Update complaint
  - `DELETE /api/complaints/:id` - Delete complaint

### 3. Environment Variables

```bash
# Required
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

# Optional
VITE_API_BASE_URL=http://localhost:3001/api
VITE_BACKEND_URL=http://localhost:3001
```

## 🚨 Common Issues & Solutions

### 1. Google Maps Not Loading

**Problem**: Map shows gray area or error
**Solution**: 
- Check API key in `.env` file
- Verify Maps JavaScript API is enabled
- Check browser console for errors

### 2. API Calls Failing

**Problem**: Registration/login not working
**Solution**:
- Ensure backend server is running
- Check API_BASE_URL in constants
- Verify CORS configuration on backend

### 3. Images Not Uploading

**Problem**: Image upload fails or shows error
**Solution**:
- Check file size limits in constants
- Verify allowed file types
- Ensure backend handles multipart/form-data

### 4. Dark Mode Not Working

**Problem**: Theme toggle doesn't persist
**Solution**:
- Check localStorage implementation in uiSlice
- Verify theme toggle in Header component
- Check CSS variables in index.css

## 📱 Responsive Testing

### 1. Desktop (1200px+)
- Full navigation menu
- Sidebar filters
- Multi-column layouts

### 2. Tablet (768px - 1199px)
- Collapsible navigation
- Adjusted grid layouts
- Touch-friendly controls

### 3. Mobile (< 768px)
- Hamburger menu
- Single column layouts
- Touch-optimized forms

## 🔍 Debugging Tips

### 1. Redux DevTools

1. Install Redux DevTools browser extension
2. Open browser dev tools
3. Go to Redux tab
4. Monitor state changes and actions

### 2. Console Logging

Key components have console.log statements for debugging:
- API calls in services
- State changes in Redux slices
- Component lifecycle events

### 3. Network Tab

Check API requests in browser Network tab:
- Verify request/response format
- Check for CORS errors
- Monitor API response times

## 🚀 Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Environment Configuration

- Set production API URLs
- Configure Google Maps API key
- Set NODE_ENV=production

### 3. Deploy Options

- **Vercel**: `vercel --prod`
- **Netlify**: Upload `dist` folder
- **AWS S3**: Upload and configure static hosting
- **Custom Server**: Serve `dist` folder

## 📊 Performance Monitoring

### 1. Bundle Analysis

```bash
npm run build
# Check dist folder size
# Use bundle analyzer if needed
```

### 2. Lighthouse Scores

- Run Lighthouse audit in Chrome DevTools
- Focus on Performance, Accessibility, Best Practices
- Optimize images and bundle size

### 3. Core Web Vitals

- Monitor LCP (Largest Contentful Paint)
- Track FID (First Input Delay)
- Measure CLS (Cumulative Layout Shift)

## 🔐 Security Considerations

### 1. API Key Protection

- Never commit API keys to version control
- Use environment variables
- Restrict API key usage in Google Cloud Console

### 2. Input Validation

- All form inputs are validated
- File uploads have type and size restrictions
- XSS protection through React's built-in escaping

### 3. Authentication

- JWT tokens for session management
- Protected routes for authenticated users
- Role-based access control

---

**Next Steps**: After testing, consider implementing additional features like:
- Push notifications
- Offline support
- Advanced analytics
- Social media integration
- Mobile app development 