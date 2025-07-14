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
                foreignerId: row[CONFIG.columns.foreignerId] || '',
                passportNumber: row[CONFIG.columns.passportNumber] || '',
                status: row[CONFIG.columns.status] || '',
                corporateIdOrNationalId: row[CONFIG.columns.corporateIdOrNationalId] || '',
                applicationNo: row[CONFIG.columns.applicationNo] || '',
                agent: row[CONFIG.columns.agent] || '',
                type: row[CONFIG.columns.type] || '',
                actionType: row[CONFIG.columns.actionType] || '',
                employerStatus: row[CONFIG.columns.employerStatus] || '',
                healthCheck: row[CONFIG.columns.healthCheck] || '',
                insuranceType: row[CONFIG.columns.insuranceType] || '',
                jobType: row[CONFIG.columns.jobType] || '',
                requestedDocument: row[CONFIG.columns.requestedDocument] || '',
                healthCheckStatus: row[CONFIG.columns.healthCheckStatus] || '',
                medicalCertStatus: row[CONFIG.columns.medicalCertStatus] || '',
                workStatus: row[CONFIG.columns.workStatus] || '',
                callingVisaStatus: row[CONFIG.columns.callingVisaStatus] || '',
                visaStatus: row[CONFIG.columns.visaStatus] || '',
                visaUpdate: row[CONFIG.columns.visaUpdate] || ''
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
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.no}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.filename}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.employerName}</td>
                <td class="px-2 py-2 text-xs font-medium text-gray-900 whitespace-nowrap">${employee.employeeName}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.gender}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.foreignerId}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.passportNumber}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.status}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.corporateIdOrNationalId}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.applicationNo}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.agent}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.type}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.actionType}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.employerStatus}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.healthCheck}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.insuranceType}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.jobType}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.requestedDocument}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.healthCheckStatus}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.medicalCertStatus}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.workStatus}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.callingVisaStatus}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.visaStatus}</td>
                <td class="px-2 py-2 text-xs whitespace-nowrap">${employee.visaUpdate}</td>
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
                employee.foreignerId.toLowerCase().includes(searchTerm) ||
                employee.passportNumber.toLowerCase().includes(searchTerm) ||
                employee.employerName.toLowerCase().includes(searchTerm) ||
                employee.applicationNo.toLowerCase().includes(searchTerm) ||
                employee.corporateIdOrNationalId.toLowerCase().includes(searchTerm) ||
                employee.filename.toLowerCase().includes(searchTerm) ||
                employee.type.toLowerCase().includes(searchTerm) ||
                employee.jobType.toLowerCase().includes(searchTerm)
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