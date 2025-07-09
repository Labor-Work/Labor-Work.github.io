// Main application logic
(function() {
    'use strict';
    
    // Global variables
    let allEmployeeData = [];
    let filteredData = [];
    let currentAgent = null;
    let refreshTimer = null;
    
    // DOM elements
    const elements = {
        authError: document.getElementById('authError'),
        mainContent: document.getElementById('mainContent'),
        agentName: document.getElementById('agentName'),
        lastUpdate: document.getElementById('lastUpdate'),
        searchInput: document.getElementById('searchInput'),
        errorMessage: document.getElementById('errorMessage'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        dataTableContainer: document.getElementById('dataTableContainer'),
        tableBody: document.getElementById('tableBody'),
        noDataMessage: document.getElementById('noDataMessage')
    };
    
    // Initialize the application
    function init() {
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const agent = urlParams.get('agent');
        const key = urlParams.get('key');
        
        // Authenticate
        if (!authenticate(agent, key)) {
            showAuthError();
            return;
        }
        
        // Set current agent
        currentAgent = agent;
        elements.agentName.textContent = agent.charAt(0).toUpperCase() + agent.slice(1);
        
        // Show main content
        elements.authError.classList.add('hidden');
        elements.mainContent.classList.remove('hidden');
        
        // Load data
        loadGoogleSheetsData();
        
        // Set up search functionality
        elements.searchInput.addEventListener('input', handleSearch);
        
        // Set up auto-refresh
        if (CONFIG.googleSheets.refreshInterval > 0) {
            refreshTimer = setInterval(loadGoogleSheetsData, CONFIG.googleSheets.refreshInterval);
        }
    }
    
    // Authenticate agent
    function authenticate(agent, key) {
        if (!agent || !key) return false;
        return CONFIG.agentKeys[agent.toLowerCase()] === key;
    }
    
    // Show authentication error
    function showAuthError() {
        elements.authError.classList.remove('hidden');
        elements.mainContent.classList.add('hidden');
    }
    
    // Load data from Google Sheets
    async function loadGoogleSheetsData() {
        try {
            showLoading(true);
            hideError();
            
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.googleSheets.spreadsheetId}/values/${CONFIG.googleSheets.range}?key=${CONFIG.googleSheets.apiKey}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.values || data.values.length === 0) {
                throw new Error('No data found in the spreadsheet');
            }
            
            // Process the data
            processSheetData(data.values);
            
            // Update last update time
            updateLastUpdateTime();
            
        } catch (error) {
            console.error('Error loading data:', error);
            showError('Failed to load data: ' + error.message);
        } finally {
            showLoading(false);
        }
    }
    
    // Process sheet data
    function processSheetData(values) {
        // Skip header row
        const headers = values[0];
        const dataRows = values.slice(1);
        
        // Convert to array of objects
        allEmployeeData = dataRows.map((row, index) => {
            return {
                index: index + 1,
                no: row[CONFIG.columns.no] || '',
                filename: row[CONFIG.columns.filename] || '',
                employerName: row[CONFIG.columns.employerName] || '',
                employeeName: row[CONFIG.columns.employeeName] || '',
                gender: row[CONFIG.columns.gender] || '',
                idNumber: row[CONFIG.columns.idNumber] || '',
                passportNumber: row[CONFIG.columns.passportNumber] || '',
                status: row[CONFIG.columns.status] || '',
                applicationNo: row[CONFIG.columns.applicationNo] || '',
                agent: row[CONFIG.columns.agent] || ''
            };
        });
        
        // Filter by current agent
        filterDataByAgent();
        
        // Display the data
        displayData();
    }
    
    // Filter data by agent
    function filterDataByAgent() {
        filteredData = allEmployeeData.filter(employee => 
            employee.agent.toLowerCase() === currentAgent.toLowerCase()
        );
    }
    
    // Display data in table
    function displayData(data = null) {
        const displayData = data || filteredData;
        
        if (displayData.length === 0) {
            elements.dataTableContainer.classList.remove('hidden');
            elements.tableBody.innerHTML = '';
            elements.noDataMessage.classList.remove('hidden');
            return;
        }
        
        elements.noDataMessage.classList.add('hidden');
        elements.tableBody.innerHTML = '';
        
        displayData.forEach(employee => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            
            row.innerHTML = `
                <td class="px-4 py-3 text-sm">${employee.no}</td>
                <td class="px-4 py-3 text-sm font-medium text-gray-900">${employee.employeeName}</td>
                <td class="px-4 py-3 text-sm">${employee.gender}</td>
                <td class="px-4 py-3 text-sm">${employee.idNumber}</td>
                <td class="px-4 py-3 text-sm">${employee.passportNumber}</td>
                <td class="px-4 py-3 text-sm">${employee.employerName}</td>
                <td class="px-4 py-3 text-sm">${employee.status}</td>
                <td class="px-4 py-3 text-sm">${employee.applicationNo}</td>
            `;
            
            elements.tableBody.appendChild(row);
        });
        
        elements.dataTableContainer.classList.remove('hidden');
    }
    
    // Handle search
    function handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        
        if (!searchTerm) {
            displayData();
            return;
        }
        
        const searchResults = filteredData.filter(employee => {
            return (
                employee.employeeName.toLowerCase().includes(searchTerm) ||
                employee.idNumber.toLowerCase().includes(searchTerm) ||
                employee.passportNumber.toLowerCase().includes(searchTerm) ||
                employee.employerName.toLowerCase().includes(searchTerm) ||
                employee.applicationNo.toLowerCase().includes(searchTerm)
            );
        });
        
        displayData(searchResults);
    }
    
    // Show/hide loading indicator
    function showLoading(show) {
        if (show) {
            elements.loadingIndicator.classList.remove('hidden');
            elements.dataTableContainer.classList.add('hidden');
        } else {
            elements.loadingIndicator.classList.add('hidden');
        }
    }
    
    // Show error message
    function showError(message) {
        elements.errorMessage.textContent = message;
        elements.errorMessage.classList.remove('hidden');
    }
    
    // Hide error message
    function hideError() {
        elements.errorMessage.classList.add('hidden');
    }
    
    // Update last update time
    function updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        elements.lastUpdate.textContent = timeString;
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (refreshTimer) {
            clearInterval(refreshTimer);
        }
    });
    
    // Start the application
    document.addEventListener('DOMContentLoaded', init);
})();