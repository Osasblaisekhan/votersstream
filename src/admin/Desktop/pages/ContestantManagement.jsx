import React, { useState, useEffect } from 'react';
import { getStoredData, setStoredData, cameroonRegions } from '../../../utils/mockData';
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiMapPin } from 'react-icons/fi';
import Modal from '../../../components/Modal';

const ContestantManagement = () => {
  const [contestants, setContestants] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContestant, setEditingContestant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    profilePicture: '',
    region: '',
    campaignId: '',
    party: ''
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
    setContestants(getStoredData('contestants', []));
    setCampaigns(getStoredData('campaigns', []));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContestant = {
      id: editingContestant ? editingContestant.id : Date.now(),
      ...formData,
      campaignId: parseInt(formData.campaignId),
      votes: editingContestant ? editingContestant.votes : 0,
      createdAt: editingContestant ? editingContestant.createdAt : new Date().toISOString()
    };

    let updatedContestants;
    if (editingContestant) {
      updatedContestants = contestants.map(c => c.id === editingContestant.id ? newContestant : c);
      showModal(
        'Contestant Updated',
        `${newContestant.name} has been updated successfully.`,
        'success'
      );
    } else {
      updatedContestants = [...contestants, newContestant];
      showModal(
        'Contestant Added',
        `${newContestant.name} has been added successfully.`,
        'success'
      );
    }

    setContestants(updatedContestants);
    setStoredData('contestants', updatedContestants);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      profilePicture: '',
      region: '',
      campaignId: '',
      party: ''
    });
    setShowForm(false);
    setEditingContestant(null);
  };

  const handleEdit = (contestant) => {
    setEditingContestant(contestant);
    setFormData({
      name: contestant.name,
      profilePicture: contestant.profilePicture,
      region: contestant.region,
      campaignId: contestant.campaignId.toString(),
      party: contestant.party
    });
    setShowForm(true);
  };

  const handleDelete = (contestant) => {
    showModal(
      'Delete Contestant',
      `Are you sure you want to delete ${contestant.name}? This action cannot be undone.`,
      'error',
      true,
      () => {
        const updatedContestants = contestants.filter(c => c.id !== contestant.id);
        setContestants(updatedContestants);
        setStoredData('contestants', updatedContestants);
        showModal(
          'Contestant Deleted',
          `${contestant.name} has been deleted successfully.`,
          'success'
        );
      }
    );
  };

  const getCampaignName = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign ? campaign.name : 'Unknown Campaign';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contestant Management</h2>
          <p className="text-gray-600 text-sm">Add and manage campaign contestants</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiPlus size={20} />
          <span>Add Contestant</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingContestant ? 'Edit Contestant' : 'Add New Contestant'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contestant Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter contestant name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Party/Affiliation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.party}
                  onChange={(e) => setFormData({...formData, party: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter party or affiliation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region of Origin *
                </label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Region</option>
                  {cameroonRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign *
                </label>
                <select
                  required
                  value={formData.campaignId}
                  onChange={(e) => setFormData({...formData, campaignId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Campaign</option>
                  {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  value={formData.profilePicture}
                  onChange={(e) => setFormData({...formData, profilePicture: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter image URL or leave blank for default"
                />
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
                  {editingContestant ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contestants.map((contestant) => (
          <div key={contestant.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {contestant.profilePicture ? (
                  <img 
                    src={contestant.profilePicture} 
                    alt={contestant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser size={24} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{contestant.name}</h3>
                <p className="text-sm text-gray-600">{contestant.party}</p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(contestant)}
                  className="p-1 text-gray-400 hover:text-indigo-600"
                  title="Edit contestant"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(contestant)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete contestant"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FiMapPin size={14} />
                <span>{contestant.region}</span>
              </div>
              <div>
                <span className="font-medium">Campaign:</span> {getCampaignName(contestant.campaignId)}
              </div>
              <div>
                <span className="font-medium">Votes:</span> {contestant.votes || 0}
              </div>
            </div>
          </div>
        ))}
        
        {contestants.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FiUser size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contestants yet</h3>
            <p className="text-gray-500">Add contestants to your campaigns to get started.</p>
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

export default ContestantManagement;