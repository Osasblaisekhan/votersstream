import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinners from './loading';
import { getStoredData, setStoredData, cameroonRegions } from '../../../utils/mockData';
import { FiPlus, FiEdit2, FiTrash2, FiUser, FiMapPin } from 'react-icons/fi';
import Modal from '../../../components/modal';


//API CALLS
const API_BASE_URL = import.meta.env.VITE_API_URL;
const ContestantManagement = () => {
  const [contestants, setContestants] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const [campaigns, setCampaigns] = useState([]);
  const [regions, setRegions]= useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContestant, setEditingContestant] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null
  });
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    origin: '',
    campaignId: '',
    picture:''
  });

  console.log('yoo formdata', formData.campaignId)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContestants = async()=>{
    try{
    const response = await axios.get(`${API_BASE_URL}/contestants`);
    setContestants(response.data)
    }catch(error){
      throw new Error('unable to fetch contestants', error)
    }finally{
      setIsLoading(false);
    }
  }


    const fetchRegions = async()=>{
    try{
      const response = await axios.get(`${API_BASE_URL}/regions`);
      setRegions(response.data)
    }catch(error){
      throw new Error('unable to fetch regions', error);
    }
  };

  const fetchCampaigns = async()=>{
    try{
    const response = await axios.get(`${API_BASE_URL}/campaigns`);
    setCampaigns(response.data)
    }catch(error){
      throw new Error('unable to fetch campaigns', error)
    }finally{
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchContestants();
    fetchCampaigns();
    fetchRegions();
    // Only run once on mount
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newContestant = {
      ...formData,
      campaignId: formData.campaignId ? formData.campaignId : (editingContestant ? editingContestant.campaignId : undefined),
      votes: editingContestant ? editingContestant.votes : 0,
    };

    try {
      let contestantRes;
      if (editingContestant) {
        // Update existing contestant in DB
        contestantRes = await axios.put(`${API_BASE_URL}/contestants/${editingContestant._id}`, newContestant);
        showModal(
          'Contestant Updated',
          `${newContestant.name} has been updated successfully.`,
          'success'
        );
      } else {
        // Add new contestant to DB
        contestantRes = await axios.post(`${API_BASE_URL}/contestants`, newContestant);
        showModal(
          'Contestant Added',
          `${newContestant.name} has been added successfully.`,
          'success'
        );
      }

      // Update campaign's participants array
      const campaignId = newContestant.campaignId;
      let addedToCampaign = false;
      if (campaignId) {
        try {
          // Get the contestant's _id (new or updated)
          const contestantId = (editingContestant ? editingContestant._id : contestantRes.data._id).toString();
          // Fetch the campaign
          const campaignRes = await axios.get(`${API_BASE_URL}/campaigns/${campaignId}`);
          const campaign = campaignRes.data;
          let participants = Array.isArray(campaign.participants) ? [...campaign.participants] : [];
          participants = participants.map(id => id.toString());
          if (!participants.includes(contestantId)) {
            participants.push(contestantId);
            addedToCampaign = true;
          }
          await axios.put(`${API_BASE_URL}/campaigns/${campaignId}`, { ...campaign, participants });
        } catch (err) {
          console.error('Error updating campaign participants:', err);
        }
      }

      if (addedToCampaign) {
        // Find the campaign name for a more descriptive message
        const campaignObj = campaigns.find(c => c._id === campaignId);
        const campaignName = campaignObj ? campaignObj.name : 'the selected campaign';
        showModal(
          'Contestant Assigned to Campaign',
          `${newContestant.name} has been successfully assigned as a participant in "${campaignName}"!`,
          'success'
        );
      }

      fetchContestants(); // Refresh list from DB
      resetForm();
    } catch (error) {
      showModal('Error', 'Failed to save contestant. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      picture: '',
      origin: '',
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
      picture: contestant.picture,
      origin: contestant.origin,
      campaignId: contestant.campaignId,
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
      async () => {
        try {
          await axios.delete(`${API_BASE_URL}/contestants/${contestant._id}`);
          showModal(
            'Contestant Deleted',
            `${contestant.name} has been deleted successfully.`,
            'success'
          );
          fetchContestants(); // Refresh list from DB
        } catch (error) {
          showModal('Error', 'Failed to delete contestant. Please try again.', 'error');
        }
      }
    );
  };

  const getCampaignName = (campaignId) => {
    const campaign = campaigns.find(c => c._id === campaignId || c.id === campaignId);
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
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Region</option>
                  {regions.map(region => (
                    <option key={region._id} value={region.name}>{region.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign *
                </label>
                <select
                  required
                  value={formData.campaignId || ''}
                  onChange={(e) => setFormData({...formData, campaignId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Campaign</option>
                  {campaigns.map(campaign => (
                    <option key={campaign._id} value={campaign._id}>{campaign.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  value={formData.picture}
                  onChange={(e) => setFormData({...formData, picture: e.target.value})}
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
                  className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>
                      <svg className="animate-spin h-5 w-5 inline-block mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    editingContestant ? 'Update' : 'Add'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

         <div>
          {
            isLoading ? <div><LoadingSpinners /></div> :

             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contestants.map((contestant) => (
          <div key={contestant._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {contestant.picture ? (
                  <img 
                    src={contestant.picture} 
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
                <span>{contestant.origin}</span>
              </div>
              <div>
                <span className="font-medium">Campaign:</span> {contestant.campaign}
              </div>
              <div>
                <span className="font-medium">Votes:</span> {contestant.votes}
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
          }
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