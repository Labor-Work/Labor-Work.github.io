// Configuration for Google Sheets API and Agent Authentication
const CONFIG = {
    // Google Sheets API settings
    googleSheets: {
        // Replace with your Google Sheets ID
        spreadsheetId: 'YOUR_SPREADSHEET_ID_PLACEHOLDER',
        
        // Replace with your Google API Key
        // To get an API key: 
        // 1. Go to https://console.cloud.google.com/
        // 2. Create a new project or select existing
        // 3. Enable Google Sheets API
        // 4. Create credentials (API Key)
        // 5. Restrict the key to Google Sheets API
        apiKey: 'YOUR_API_KEY_PLACEHOLDER',
        
        // The range of cells to fetch (adjust based on your sheet)
        range: 'Sheet1!A:O',
        
        // Refresh interval in milliseconds (1 hour = 3600000 ms)
        refreshInterval: 3600000
    },
    
    // Agent authentication keys
    // Format: agentName: 'secretKey'
    // Example URLs:
    // - https://yoursite.com?agent=charlie&key=x7y8z9
    // - https://yoursite.com?agent=alice&key=a1b2c3
    agentKeys: {
        charlie: 'x7y8z9',
        alice: 'a1b2c3',
        bob: 'b2c3d4',
        david: 'd4e5f6',
        emma: 'e5f6g7',
        frank: 'f6g7h8',
        grace: 'g7h8i9',
        henry: 'h8i9j0',
        isabel: 'i9j0k1',
        jack: 'j0k1l2',
        // Add more agents as needed
        // agentname: 'uniquekey',
    },
    
    // Column mapping for the CSV data
    // Adjust these based on your actual column positions (0-based index)
    columns: {
        no: 0,
        filename: 1,
        employerName: 2,
        employeeName: 3,
        gender: 4,
        idNumber: 5,
        passportNumber: 6,
        status: 7,
        applicantName: 8,
        corporateId: 9,
        employerNameThai: 10,
        applicationNo: 11,
        agent: 12,
        urgentApproval: 13,
        dataUpdate: 14
    }
};

// Make config available globally
window.CONFIG = CONFIG;