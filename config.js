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
        range: 'Sheet1!A:X',
        
        // Refresh interval in milliseconds (1 hour = 3600000 ms)
        refreshInterval: 3600000
    },
    
    // Agent authentication keys
    // Format: agentName: 'secretKey'
    // Example URLs:
    // - https://yoursite.com?agent=charlie&key=x7y8z9
    // - https://yoursite.com?agent=walkin&key=w1a2l3
    agentKeys: {
        charlie: 'x7y8z9',
        walkin: 'w1a2l3',
        zml: 'z4m5l6',
        anas: 'a7n8a9',
        jamin: 'j1a2m3',
        kolay: 'k4o5l6',
        kosoe: 'k7s8o9',
        naran: 'n1a2r3',
        ram: 'r4a5m6',
        sony: 's7o8n9',
        tangmo: 't1a2n3',
        tks: 't4k5s6',
        chaithaiplastic: 'c7t8p9',
        jack: 'j1a2c3',
        mook: 'm4o5o6',
        lippy: 'l7i8p9',
        meesat: 'm1e2s3',
        arsoe: 'a4r5s6',
        koye: 'k7o8y9',
        naingmin: 'n1a2i3',
        nut: 'n4u5t6',
        chai: 'c7h8a9',
        minsoe: 'm1i2n3',
        kmt: 'k4m5t6',
        hari: 'h7a8r9',
        kosai: 'k1o2s3',
        kwk: 'k4w5k6',
        komal: 'k7o8m9',
        kyawlingas: 'k1y2l3',
        podam: 'p4o5d6',
        kosaw: 'k7o8s9',
        pepe: 'p1e2p3',
        linlin: 'l4i5n6'
    },
    
    // Column mapping for the CSV data
    // Adjust these based on your actual column positions (0-based index)
    columns: {
        no: 0,                          // No.
        filename: 1,                    // Filename
        employerName: 2,                // ชื่อนายจ้าง
        employeeName: 3,                // ชื่อคนงาน
        gender: 4,                      // เพศ
        foreignerId: 5,                 // หมายเลขประจำตัวคนต่างด้าว
        passportNumber: 6,              // เลขพาสปอร์ต
        status: 7,                      // สถานะ
        corporateIdOrNationalId: 8,     // เลขนิติบุคคล/เลขบัตรประชาชน
        applicationNo: 9,               // เลขที่แบบคำร้อง
        agent: 10,                      // Agent
        type: 11,                       // ลักษณะ
        actionType: 12,                 // ทำต่อ/ยกเลิก
        employerStatus: 13,             // นายจ้างเดิม/ใหม่
        healthCheck: 14,                // ตรวจสุขภาพ
        insuranceType: 15,              // ประเภทประกัน
        jobType: 16,                    // ประเภทงาน
        requestedDocument: 17,          // เอกสารที่ร้องขอ
        healthCheckStatus: 18,          // สถานะตรวจสุขภาพ
        medicalCertStatus: 19,          // สถานะใบรับรองเเพทย์
        workStatus: 20,                 // สถานะเวิร์ค
        callingVisaStatus: 21,          // สถานะCallingVisa
        visaStatus: 22,                 // สถานะVisa
        visaUpdate: 23                  // อัปเดตข้อมูลVisa
    },
    
    // Dropdown options for various columns
    dropdownOptions: {
        // Agent list (Column K)
        agents: [
            'Charlie', 'WALK-IN', 'ZML', 'ANAS', 'JAMIN', 'KO LAY', 'KO SOE', 
            'NARAN', 'RAM', 'SONY', 'TANGMO', 'TKS', 'Chai Thai Plastic', 
            'JACK', 'MOOK', 'LIPPY', 'MEE SAT', 'ARSOE', 'KO YE', 
            'NAINGMIN (Ratchata)', 'NUT', 'CHAI', 'MINSOE', 'KMT', 'HARI', 
            'KO SAI', 'KWK', 'KOMAL', 'KYAW LIN GAS', 'PODAM', 'KO SAW', 
            'PEPE', 'LIN LIN'
        ],
        
        // Column M: Action type
        actionType: ['ทำต่อ', 'ยกเลิก'],
        
        // Column N: Employer status
        employerStatus: ['นายจ้างเดิม', 'นายจ้างใหม่'],
        
        // Column O: Health check
        healthCheck: ['ตรวจเอง', 'ใบแพทย์', 'ตรวจสุขภาพ'],
        
        // Column P: Insurance type
        insuranceType: ['ประกันสุขภาพ', 'ประกันสังคม'],
        
        // Job types (Column Q)
        jobTypes: [
            { th: 'BT01 - ประมง', en: 'BT01 - Fisheries' },
            { th: 'BT02 - ต่อเนื่องประมงทะเล', en: 'BT02 - Marine Fisheries-Related Activities' },
            { th: 'BT03 - เกษตรและปศุสัตว์', en: 'BT03 - Agriculture and Livestock' },
            { th: 'BT04 - กิจการก่อสร้าง', en: 'BT04 - Construction Business' },
            { th: 'BT05 - งานบ้าน', en: 'BT05 - Domestic Work' },
            { th: 'BT06 - กิจการต่อเนื่องการเกษตร', en: 'BT06 - Agriculture-Related Activities' },
            { th: 'BT07 - ต่อเนื่องปศุสัตว์โรงฆ่าสัตว์ ชำแหละ', en: 'BT07 - Livestock-Related Activities, Slaughterhouse, and Meat Processing' },
            { th: 'BT08 - กิจการรีไซเคิล', en: 'BT08 - Recycling Business' },
            { th: 'BT09 - เหมืองแร่/เหมืองหิน', en: 'BT09 - Mining and Quarrying' },
            { th: 'BT10 - จำหน่ายผลิตภัณฑ์โลหะ', en: 'BT10 - Metal Products Trading' },
            { th: 'BT11 - จำหน่ายอาหารและเครื่องดื่ม', en: 'BT11 - Food and Beverage Trading' },
            { th: 'BT12 - ผลิตหรือจำหน่ายผลิตภัณฑ์จากดิน', en: 'BT12 - Production or Trading of Clay-Based Products' },
            { th: 'BT13 - ผลิตหรือจำหน่ายวัสดุก่อสร้าง', en: 'BT13 - Production or Trading of Construction Materials' },
            { th: 'BT14 - แปรรูปหิน', en: 'BT14 - Stone Processing' },
            { th: 'BT15 - ผลิตหรือจำหน่ายเสื้อผ้าสำเร็จรูป', en: 'BT15 - Production or Trading of Ready-Made Garments' },
            { th: 'BT16 - ผลิตหรือจำหน่ายผลิตภัณฑ์พลาสติก', en: 'BT16 - Production or Trading of Plastic Products' },
            { th: 'BT17 - ผลิตหรือจำหน่ายผลิตภัณฑ์กระดาษ', en: 'BT17 - Production or Trading of Paper Products' },
            { th: 'BT18 - ผลิตหรือจำหน่ายผลิตภัณฑ์อิเล็กทรอนิกส์', en: 'BT18 - Production or Trading of Electronic Products' },
            { th: 'BT19 - ขนถ่ายสินค้าทางบก น้ำ คลังสินค้า', en: 'BT19 - Land and Water Cargo Handling, Warehousing' },
            { th: 'BT20 - ค้าส่ง ค้าปลีก แผงลอย', en: 'BT20 - Wholesale, Retail, and Market Stalls' },
            { th: 'BT21 - อู่ซ่อมรถ ล้าง อัดฉีด', en: 'BT21 - Vehicle Repair, Car Wash, and Pressure Cleaning Services' },
            { th: 'BT22 - สถานีบริการน้ำมัน แก้ส เชื้อเพลิง', en: 'BT22 - Fuel Stations, Gas Stations, and Fuel Distribution' },
            { th: 'BT23 - สถานศึกษา มูลนิธิ สมาคม สถานพยาบาล', en: 'BT23 - Educational Institutions, Foundations, Associations, and Medical Facilities' },
            { th: 'BT24 - การให้บริการต่างๆ', en: 'BT24 - Service Businesses' },
            { th: 'BT25 - แปรรูปสัตว์น้ำ', en: 'BT25 - Seafood Processing' }
        ],
        
        // Status options for staff columns
        healthCheckStatus: ['เตรียมรอ', 'ตรวจแล้ว'],
        medicalCertStatus: ['ส่งเข้าระบบแล้ว', 'ยังไม่เข้าในระบบ'],
        workStatus: ['ได้อนุมัติแล้ว', 'ไม่ได้อนุมัติ'],
        callingVisaStatus: ['ยื่นแล้ว', 'ได้อนุมัติแล้ว', 'ไม่ได้อนุมัติ'],
        visaStatus: ['ยื่นแล้ว', 'ได้อนุมัติแล้ว'],
        visaUpdate: ['อัปเดตแล้ว']
    }
};

// Make config available globally
window.CONFIG = CONFIG;