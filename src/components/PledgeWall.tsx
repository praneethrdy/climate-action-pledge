import React, { useEffect, useState } from 'react';
import { Heart, Clock, MapPin, User } from 'lucide-react';
import { getPledges } from '../utils/storage';
import { PledgeData } from '../types';

export const PledgeWall: React.FC = () => {
  const [pledges, setPledges] = useState<PledgeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pledgesPerPage = 10;

  useEffect(() => {
    const updatePledges = async () => {
      try {
        const allPledges = await getPledges();
        setPledges(allPledges);
      } catch (error) {
        console.error('Error fetching pledges:', error);
      }
    };

    updatePledges();
    const interval = setInterval(updatePledges, 10000); // Update every 10 seconds for Google Sheets
    return () => clearInterval(interval);
  }, []);

  const indexOfLastPledge = currentPage * pledgesPerPage;
  const indexOfFirstPledge = indexOfLastPledge - pledgesPerPage;
  const currentPledges = pledges.slice(indexOfFirstPledge, indexOfLastPledge);
  const totalPages = Math.ceil(pledges.length / pledgesPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProfileIcon = (profileType: string) => {
    switch (profileType) {
      case 'Student':
        return '🎓';
      case 'Working Professional':
        return '💼';
      default:
        return '👤';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Public Pledge Wall
          </h2>
          <p className="text-xl text-gray-600">
            See who's taking action and be inspired by their commitments
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {pledges.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pledges yet</h3>
              <p className="text-gray-600">Be the first to take the climate action pledge!</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Pledge ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">State</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Profile</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Love for Planet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentPledges.map((pledge, index) => (
                      <tr key={pledge.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-blue-600 font-semibold">
                            {pledge.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {pledge.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{pledge.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Clock className="w-4 h-4 text-gray-400 mr-1" />
                            {formatDate(pledge.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                            {pledge.state}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getProfileIcon(pledge.profileType)} {pledge.profileType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-lg">
                              {'❤️'.repeat(pledge.heartsRating)}
                              {'🤍'.repeat(5 - pledge.heartsRating)}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              ({pledge.heartsRating}/5)
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstPledge + 1} to {Math.min(indexOfLastPledge, pledges.length)} of {pledges.length} pledges
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
                          currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};