import React, { useState } from 'react';
import { Shield, CheckCircle, Mail, Phone, MapPin, User } from 'lucide-react';
import { commitmentThemes } from '../data/commitmentThemes';
import { PledgeData } from '../types';
import { addPledge, generatePledgeId } from '../utils/storage';

interface PledgeFormProps {
  onPledgeSubmitted: (pledge: PledgeData) => void;
}

export const PledgeForm: React.FC<PledgeFormProps> = ({ onPledgeSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    state: '',
    profileType: '' as 'Student' | 'Working Professional' | 'Other' | '',
    commitments: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.mobile)) newErrors.mobile = 'Mobile number is invalid';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.profileType) newErrors.profileType = 'Profile type is required';
    if (formData.commitments.length === 0) newErrors.commitments = 'At least one commitment is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const pledgeId = await generatePledgeId();
      
      const pledge: PledgeData = {
        id: pledgeId,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        state: formData.state,
        profileType: formData.profileType as 'Student' | 'Working Professional' | 'Other',
        commitments: formData.commitments,
        date: new Date().toISOString().split('T')[0],
        heartsRating: Math.min(formData.commitments.length, 5)
      };

      const savedPledge = await addPledge(pledge);
      onPledgeSubmitted(savedPledge);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        state: '',
        profileType: '',
        commitments: []
      });
    } catch (error) {
      console.error('Error submitting pledge:', error);
      alert('There was an error submitting your pledge. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleCommitmentChange = (commitment: string) => {
    const newCommitments = formData.commitments.includes(commitment)
      ? formData.commitments.filter(c => c !== commitment)
      : [...formData.commitments, commitment];
    
    setFormData({ ...formData, commitments: newCommitments });
    if (errors.commitments) setErrors({ ...errors, commitments: '' });
  };

  return (
    <section id="pledge-form" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Take Your Climate Action Pledge
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the movement and commit to making a positive impact on our planet
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.mobile ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your state"
                    />
                  </div>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Profile Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['Student', 'Working Professional', 'Other'] as const).map((type) => (
                  <label key={type} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="profileType"
                      value={type}
                      checked={formData.profileType === type}
                      onChange={(e) => setFormData({ ...formData, profileType: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                      formData.profileType === type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <span className="font-medium">{type}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.profileType && <p className="text-red-500 text-sm mt-1">{errors.profileType}</p>}
            </div>

            {/* Commitments */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Your Climate Commitments *
              </h3>
              <div className="space-y-8">
                {commitmentThemes.map((theme, themeIndex) => (
                  <div key={themeIndex} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {theme.title}
                    </h4>
                    <div className="space-y-3">
                      {theme.commitments.map((commitment, commitmentIndex) => (
                        <label key={commitmentIndex} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.commitments.includes(commitment)}
                            onChange={() => handleCommitmentChange(commitment)}
                            className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700 leading-relaxed">{commitment}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {errors.commitments && <p className="text-red-500 text-sm mt-1">{errors.commitments}</p>}
            </div>

            {/* Privacy Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Privacy Note</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Mobile Number and Email are required for validation but never shown publicly. 
                    Data is used only for verification and engagement. We respect your privacy and 
                    will never share your personal information with third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit My Pledge
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};