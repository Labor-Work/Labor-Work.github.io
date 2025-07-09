# Employee Data Viewer - Google Sheets Integration

A simple, static HTML application that displays employee data from Google Sheets with agent-based filtering and authentication.

## Features

- Static HTML/JS - no backend required
- Direct Google Sheets API integration
- URL-based agent authentication
- Real-time search functionality
- Hourly automatic refresh
- Responsive design with Tailwind CSS
- Agent-specific data filtering

## Setup Instructions

### 1. Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click Enable
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
5. Make your Google Sheet publicly readable:
   - Open your Google Sheet
   - Click "Share" button
   - Change access to "Anyone with the link can view"
   - Copy the Sheet ID from the URL

### 2. Configuration

Edit `config.js` file:

```javascript
// Replace with your actual values
googleSheets: {
    spreadsheetId: 'YOUR_GOOGLE_SHEETS_ID_HERE',
    apiKey: 'YOUR_GOOGLE_API_KEY_HERE',
    range: 'Sheet1!A:O',  // Adjust if needed
}

// Add your agents
agentKeys: {
    charlie: 'x7y8z9',
    alice: 'a1b2c3',
    // Add more agents...
}
```

### 3. Deployment

1. Upload all files to any static hosting service:
   - GitHub Pages
   - Netlify
   - Vercel
   - Any web server

2. No build process required - just upload:
   - `index.html`
   - `config.js`
   - `app.js`

### 4. Agent Access URLs

Share these URLs with your agents:

- Charlie: `https://yoursite.com?agent=charlie&key=x7y8z9`
- Alice: `https://yoursite.com?agent=alice&key=a1b2c3`
- Bob: `https://yoursite.com?agent=bob&key=b2c3d4`

Each agent will only see their assigned employees.

## Google Sheet Format

The application expects the following columns (can be adjusted in `config.js`):

| Column | Field |
|--------|-------|
| A | No. |
| B | Filename |
| C | Employer Name |
| D | Employee Name |
| E | Gender |
| F | ID Number |
| G | Passport Number |
| H | Status |
| I | Applicant Name |
| J | Corporate ID |
| K | Employer Name (Thai) |
| L | Application No. |
| M | Agent |
| N | Urgent Approval |
| O | Data Update |

## Security Notes

- API key is visible in source code (suitable for read-only public data)
- For sensitive data, consider implementing a backend API
- Agent keys provide basic access control
- HTTPS is recommended for production use

## Customization

- Edit `config.js` to add/remove agents
- Modify column mappings in `config.js` if your sheet structure differs
- Adjust refresh interval (default: 1 hour)
- Customize Tailwind classes in `index.html` for styling