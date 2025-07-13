# Threat Intelligence Platform

A comprehensive threat intelligence aggregation platform providing real-time IOC monitoring, AI-powered analysis, and comprehensive historical insights for cybersecurity professionals.

## Features

- **Live Dashboard**: Real-time threat monitoring with live updates
- **Historical Analysis**: Deep insights into threat patterns and trends
- **Threat Library**: Searchable collection of IOCs with detailed metadata
- **Feed Health Monitoring**: Real-time status tracking of all integrated feeds
- **MongoDB Integration**: All data stored and retrieved from MongoDB
- **Professional UI**: Dark glassy design with modern animations

## Tech Stack

### Frontend
- React 19
- Tailwind CSS
- React Router DOM
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-web/my-project
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure MongoDB Connection

The backend is already configured to connect to your MongoDB Atlas cluster:
- URI: `mongodb+srv://admin:socgen1234@threat-intel.epiamic.mongodb.net/`
- Database: Uses the default database
- Collection: `threats`

### 5. Start the Backend Server
```bash
cd backend
npm start
```

The backend will start on `http://localhost:5000`

### 6. Start the Frontend Development Server
```bash
# In a new terminal, from the my-project directory
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/threats` - Get all threats
- `GET /api/threats/stats` - Get threat statistics
- `GET /api/threats/recent?limit=10` - Get recent threats
- `GET /api/threats/range?start=2024-01-01&end=2024-01-31` - Get threats by date range
- `GET /api/threats/severity/:severity` - Get threats by severity
- `GET /api/threats/search?q=query` - Search threats
- `GET /api/threats/trends?days=7` - Get threat trends
- `GET /api/threats/distribution` - Get threat distribution
- `GET /api/health` - Health check

## Data Structure

The MongoDB collection stores threat data with the following structure:

```javascript
{
  _id: ObjectId,
  timestamp: Date,
  input: String,        // The threat input (e.g., "172.67.155.47 – DDoS origin")
  summary: String,      // AI-generated summary
  severity: String      // "Critical", "High", "Medium", "Low"
}
```

## Features Overview

### Dashboard
- Real-time threat count and statistics
- Live threat trends visualization
- Recent threats table with severity indicators
- Auto-refresh every 30 seconds

### Historical Analysis
- Interactive time range selection (7d, 30d, 90d, 1y)
- Threat type and severity filtering
- Historical trends visualization
- Incident timeline with critical events

### Threat Library
- Searchable IOC database
- Advanced filtering by type, severity, and source
- Detailed metadata for each threat
- Real-time statistics

### Feed Health
- Real-time feed status monitoring
- Performance metrics and analytics
- Recent activity logs
- Simulated feed health data based on actual threat processing

## Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon (auto-restart)
npm start           # Start production server
```

## Environment Variables

Create a `.env` file in the backend directory if you need to customize:

```env
PORT=5000
MONGODB_URI=mongodb+srv://admin:socgen1234@threat-intel.epiamic.mongodb.net/
```

## Troubleshooting

### Common Issues

1. **Backend Connection Error**: Ensure MongoDB Atlas is accessible and credentials are correct
2. **CORS Issues**: The backend includes CORS middleware, but ensure the frontend URL is allowed
3. **Port Conflicts**: Change the backend port in `backend/server.js` if port 5000 is in use

### MongoDB Connection Issues

If you're having trouble connecting to MongoDB:
1. Check your network connection
2. Verify MongoDB Atlas cluster is running
3. Ensure IP whitelist includes your current IP
4. Verify username and password are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support or questions, please contact the development team.
