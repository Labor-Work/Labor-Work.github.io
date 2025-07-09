## Method 1: Google Sheets API (Recommended)

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API key for public sheets, or OAuth2 for private sheets)


**For Private Sheets (OAuth2):**
```javascript
// Load Google API library
function initializeGoogleAPI() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'your-api-key',
        clientId: 'your-client-id',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });
}
```

## Filtering and Displaying Data

```javascript
function filterAndDisplayData(data, filterColumn, filterValue) {
    const headers = data[0];
    const columnIndex = headers.indexOf(filterColumn);
    
    if (columnIndex === -1) {
        console.error('Column not found');
        return;
    }
    
    // Filter data
    const filteredData = data.filter((row, index) => {
        if (index === 0) return true; // Keep headers
        return row[columnIndex] && row[columnIndex].includes(filterValue);
    });
    
    // Display in HTML
    displayTable(filteredData);
}

function displayTable(data) {
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement(index === 0 ? 'th' : 'td');
            td.textContent = cell;
            td.style.border = '1px solid #ddd';
            td.style.padding = '8px';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    
    document.getElementById('data-container').innerHTML = '';
    document.getElementById('data-container').appendChild(table);
}
```

## Complete HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Google Sheets Data Filter</title>
</head>
<body>
    <h1>Filtered Google Sheets Data</h1>
    
    <div>
        <input type="text" id="filterInput" placeholder="Enter filter value">
        <select id="columnSelect">
            <option value="">Select column</option>
        </select>
        <button onclick="applyFilter()">Filter</button>
    </div>
    
    <div id="data-container"></div>
    
    <script>
        let sheetData = [];
        
        async function loadData() {
            // Use one of the methods above
            sheetData = await fetchSheetData(); // or fetchCSVData()
            populateColumnSelect();
            displayTable(sheetData);
        }
        
        function populateColumnSelect() {
            const select = document.getElementById('columnSelect');
            const headers = sheetData[0];
            headers.forEach(header => {
                const option = document.createElement('option');
                option.value = header;
                option.textContent = header;
                select.appendChild(option);
            });
        }
        
        function applyFilter() {
            const filterValue = document.getElementById('filterInput').value;
            const filterColumn = document.getElementById('columnSelect').value;
            
            if (!filterColumn || !filterValue) {
                displayTable(sheetData);
                return;
            }
            
            filterAndDisplayData(sheetData, filterColumn, filterValue);
        }
        
        // Load data when page loads
        window.onload = loadData;
    </script>
</body>
</html>
```

## Additional Tips:

- **CORS Issues**: If you encounter CORS errors, you might need to use a proxy service or implement server-side fetching
- **Rate Limits**: Google Sheets API has quotas, so implement caching for production use
- **Security**: Never expose API keys in client-side code for production applications
- **Libraries**: Consider using libraries like Papa Parse for CSV parsing or axios for HTTP requests

The CSV method is simpler for public sheets, while the API method gives you more control and works with private sheets. Choose based on your specific needs!