// Mock data for campaigns, contestants, and users
export const cameroonRegions = [
  'Adamawa',
  'Centre', 
  'East',
  'Far North',
  'Littoral',
  'North',
  'Northwest',
  'South',
  'Southwest',
  'West'
];

export const mockCampaigns = [
  {
    id: 1,
    name: '2025 Presidential Election',
    description: 'The official presidential election for Cameroon 2025',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
    participants: ['Maurice Kamto', 'Paul Biya', 'Ekere Muna'],
    createdAt: '2024-12-01'
  },
  {
    id: 2,
    name: 'Regional Governor Election - Littoral',
    description: 'Election for the Governor of Littoral Region',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    status: 'active',
    participants: ['Candidate A', 'Candidate B'],
    createdAt: '2024-12-15'
  }
];

export const mockContestants = [
  {
    id: 1,
    name: 'Maurice Kamto',
    profilePicture: '/src/components/assets/Maurice_Kamto.jpg',
    region: 'West',
    campaignId: 1,
    party: 'MRC',
    votes: 0
  },
  {
    id: 2,
    name: 'Paul Biya',
    profilePicture: '/src/components/assets/Paul_Biya.jpg',
    region: 'South',
    campaignId: 1,
    party: 'CPDM',
    votes: 0
  },
  {
    id: 3,
    name: 'Ekere Muna',
    profilePicture: '/src/components/assets/Bâtonnier_Akere_Muna.jpg',
    region: 'Southwest',
    campaignId: 1,
    party: 'Independent',
    votes: 0
  }
];

// Helper functions for localStorage operations
export const getStoredData = (key, defaultValue = []) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error getting stored data for ${key}:`, error);
    return defaultValue;
  }
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error storing data for ${key}:`, error);
  }
};

// Initialize mock data in localStorage if not exists
export const initializeMockData = () => {
  if (!localStorage.getItem('campaigns')) {
    setStoredData('campaigns', mockCampaigns);
  }
  if (!localStorage.getItem('contestants')) {
    setStoredData('contestants', mockContestants);
  }
};