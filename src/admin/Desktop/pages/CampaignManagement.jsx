import React, { useState, useEffect } from 'react';
import { getStoredData, setStoredData } from '../../../utils/mockData';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiClock } from 'react-icons/fi';
import Modal from '../../../components/Modal';

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    participants: []
  });
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null
  });

  useEffect(() => {
    const allCampaigns = getStoredData('campaigns', []);
    setCampaigns(allCampaigns);
  }, []);

  const showModal = (title, message, type = 'info', showConfirm = false, onConfirm = null) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      showConfirm,
      onConfirm
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'info',
      showConfirm: false,
      onConfirm: null
    });
  };

  const getCampaignStatus = (campaign) => {
    const now = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    
    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'expired';
    return 'active';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (endDate <= startDate) {
      showModal(
        'Invalid Date Range',
        'End date must be after start date',
        'error'
      );
      return;
    }
    
    const newCampaign = {
      id: editingCampaign ? editingCampaign.id : Date.now(),
      ...formData,
      status: getCampaignStatus({ startDate: formData.startDate, endDate: formData.endDate }),
      createdAt: editingCampaign ? editingCampaign.createdAt : new Date().toISOString()
    };

    let updatedCampaigns;
    if (editingCampaign) {
      updatedCampaigns = campaigns.map(c => c.id === editingCampaign.id ? newCampaign : c);
      showModal(
        'Campaign Updated',
        `Campaign "${newCampaign.name}" has been updated successfully.`,
        'success'
      );
    } else {
      updatedCampaigns = [...campaigns, newCampaign];
      showModal(
        'Campaign Created',
        `Campaign "${newCampaign.name}" has been created successfully.`,
        'success'
      );
    }

    setCampaigns(updatedCampaigns);
    setStoredData('campaigns', updatedCampaigns);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      participants: []
    });
    setShowForm(false);
    setEditingCampaign(null);
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      description: campaign.description,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      participants: campaign.participants || []
    });
    setShowForm(true);
  };

  const handleDelete = (campaign) => {
    showModal(
      'Delete Campaign',
      `Are you sure you want to delete "${campaign.name}"? This action cannot be undone and will remove all associated data.`,
      'error',
      true,
      () => {
        const updatedCampaigns = campaigns.filter(c => c.id !== campaign.id);
        setCampaigns(updatedCampaigns);
        setStoredData('campaigns', updatedCampaigns);
        showModal(
          'Campaign Deleted',
          `Campaign "${campaign.name}" has been deleted successfully.`,
          'success'
        );
      }
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'upcoming': return '🔵';
      case 'expired': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
          <p className="text-gray-600 text-sm">Create and manage voting campaigns</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiPlus size={20} />
          <span>Create Campaign</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter campaign name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Describe the campaign"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {campaigns.map((campaign) => {
          const status = getCampaignStatus(campaign);
          return (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <span className="text-lg">{getStatusIcon(status)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{campaign.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="p-1 text-gray-400 hover:text-indigo-600"
                    title="Edit campaign"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(campaign)}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete campaign"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FiCalendar size={14} />
                  <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiUsers size={14} />
                  <span>{campaign.participants?.length || 0} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiClock size={14} />
                  <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <FiCalendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-500">Create your first voting campaign to get started.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        showConfirm={modal.showConfirm}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};

export default CampaignManagement;