// Utility functions for campaign management
export const getCampaignStatus = (campaign) => {
  const now = new Date();
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  
  if (now < startDate) return 'upcoming';
  if (now > endDate) return 'expired';
  return 'active';
};

export const updateCampaignStatuses = (campaigns) => {
  return campaigns.map(campaign => ({
    ...campaign,
    status: getCampaignStatus(campaign)
  }));
};

export const getActiveCampaigns = (campaigns) => {
  return campaigns.filter(campaign => getCampaignStatus(campaign) === 'active');
};

export const formatDateForDisplay = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getDaysRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};