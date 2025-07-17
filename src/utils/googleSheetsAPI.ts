// Google Sheets API simulation for Climate Action Pledge
// This simulates backend functionality using Google Sheets structure

export interface GoogleSheetsRow {
  id: string;
  name: string;
  email: string;
  mobile: string;
  state: string;
  profileType: 'Student' | 'Working Professional' | 'Other';
  commitments: string;
  date: string;
  heartsRating: number;
  timestamp: string;
}

// Simulated Google Sheets data structure
const GOOGLE_SHEETS_DATA_KEY = 'climate-pledges-sheets-data';
const SHEET_CONFIG = {
  spreadsheetId: 'climate-action-pledges-2024',
  range: 'Pledges!A:I',
  apiKey: 'simulated-api-key'
};

// Initialize with sample data that mimics Google Sheets format
const initializeGoogleSheetsData = (): GoogleSheetsRow[] => {
  return [
    {
      id: 'PLD001',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      mobile: '+1234567890',
      state: 'California',
      profileType: 'Student',
      commitments: 'Reduce plastic usage by 50% in daily life|Use public transport or bike for short trips',
      date: '2024-01-15',
      heartsRating: 2,
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'PLD002',
      name: 'Michael Chen',
      email: 'michael@example.com',
      mobile: '+1234567891',
      state: 'New York',
      profileType: 'Working Professional',
      commitments: 'Switch to LED bulbs and energy-efficient appliances|Participate in local tree planting drives|Support eco-friendly businesses and products',
      date: '2024-01-14',
      heartsRating: 3,
      timestamp: '2024-01-14T14:20:00Z'
    },
    {
      id: 'PLD003',
      name: 'Emma Rodriguez',
      email: 'emma@example.com',
      mobile: '+1234567892',
      state: 'Texas',
      profileType: 'Student',
      commitments: 'Practice zero-waste cooking and meal planning',
      date: '2024-01-13',
      heartsRating: 1,
      timestamp: '2024-01-13T09:15:00Z'
    },
    {
      id: 'PLD004',
      name: 'David Kim',
      email: 'david@example.com',
      mobile: '+1234567893',
      state: 'Florida',
      profileType: 'Working Professional',
      commitments: 'Unplug electronics when not in use|Educate 5 friends about climate change',
      date: '2024-01-12',
      heartsRating: 2,
      timestamp: '2024-01-12T16:45:00Z'
    },
    {
      id: 'PLD005',
      name: 'Lisa Thompson',
      email: 'lisa@example.com',
      mobile: '+1234567894',
      state: 'Washington',
      profileType: 'Other',
      commitments: 'Use renewable energy sources where possible|Participate in local tree planting drives|Support eco-friendly businesses and products',
      date: '2024-01-11',
      heartsRating: 3,
      timestamp: '2024-01-11T11:30:00Z'
    }
  ];
};

// Simulated Google Sheets API functions
export const initializeGoogleSheets = (): void => {
  const existing = localStorage.getItem(GOOGLE_SHEETS_DATA_KEY);
  if (!existing) {
    const initialData = initializeGoogleSheetsData();
    localStorage.setItem(GOOGLE_SHEETS_DATA_KEY, JSON.stringify(initialData));
  }
};

export const fetchFromGoogleSheets = async (): Promise<GoogleSheetsRow[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const stored = localStorage.getItem(GOOGLE_SHEETS_DATA_KEY);
  return stored ? JSON.parse(stored) : initializeGoogleSheetsData();
};

export const appendToGoogleSheets = async (data: Omit<GoogleSheetsRow, 'id' | 'timestamp'>): Promise<GoogleSheetsRow> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const existing = await fetchFromGoogleSheets();
  const lastId = existing.length > 0 ? parseInt(existing[0].id.replace('PLD', '')) : 0;
  
  const newRow: GoogleSheetsRow = {
    ...data,
    id: `PLD${String(lastId + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString()
  };
  
  const updated = [newRow, ...existing];
  localStorage.setItem(GOOGLE_SHEETS_DATA_KEY, JSON.stringify(updated));
  
  return newRow;
};

export const getSheetStatistics = async () => {
  const data = await fetchFromGoogleSheets();
  
  return {
    totalPledges: data.length,
    students: data.filter(row => row.profileType === 'Student').length,
    workingProfessionals: data.filter(row => row.profileType === 'Working Professional').length,
    workshops: data.filter(row => row.profileType === 'Other').length,
    averageHearts: data.reduce((sum, row) => sum + row.heartsRating, 0) / data.length || 0
  };
};

// WordPress integration helpers
export const getWordPressEmbedCode = () => {
  return `
<!-- Climate Action Pledge Widget -->
<div id="climate-pledge-widget" style="width: 100%; min-height: 800px;"></div>
<script>
  // WordPress embed script
  (function() {
    const iframe = document.createElement('iframe');
    iframe.src = '${window.location.origin}';
    iframe.style.width = '100%';
    iframe.style.minHeight = '800px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('loading', 'lazy');
    
    const container = document.getElementById('climate-pledge-widget');
    if (container) {
      container.appendChild(iframe);
    }
  })();
</script>
  `;
};

export const getWordPressShortcode = () => {
  return '[climate_pledge_widget height="800px" responsive="true"]';
};