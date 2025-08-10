# 🚀 CivicFix Quick Start Guide

Get CivicFix running in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy environment template
cp env.example .env

# Edit .env and add your Google Maps API key
# Get one from: https://console.cloud.google.com/
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to `http://localhost:5173`

## 🔑 Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Copy key to `.env` file

## 🧪 Test the App

1. **Register** a new account
2. **Login** with your credentials  
3. **Report** a test issue
4. **View** issues on the map
5. **Explore** the dashboard

## 📱 Features to Try

- ✅ User authentication
- ✅ Issue reporting with images
- ✅ Interactive Google Maps
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Real-time updates

## 🚨 Troubleshooting

**Map not loading?** Check your Google Maps API key in `.env`

**Can't register/login?** Backend API needs to be running on port 3001

**Images not uploading?** Check file size limits (5MB max)

## 📚 Need More Help?

- Check `README.md` for detailed documentation
- See `INTEGRATION.md` for component details
- Run `npm run setup` for automated setup

---

**🎉 You're all set! CivicFix is ready to help your community.** 