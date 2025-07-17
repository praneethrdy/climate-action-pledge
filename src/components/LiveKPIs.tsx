import React, { useEffect, useState } from 'react';
import { Target, Users, Briefcase, BookOpen } from 'lucide-react';
import { getPledges } from '../utils/storage';
import { getSheetStatistics } from '../utils/googleSheetsAPI';
import { KPIData } from '../types';

export const LiveKPIs: React.FC = () => {
  const [kpiData, setKpiData] = useState<KPIData>({
    targetPledges: 1000000,
    achievedPledges: 0,
    students: 0,
    workingProfessionals: 0,
    workshops: 0
  });

  useEffect(() => {
    const updateKPIs = async () => {
      try {
        const stats = await getSheetStatistics();
        
        setKpiData({
          targetPledges: 1000000,
          achievedPledges: stats.totalPledges,
          students: stats.students,
          workingProfessionals: stats.workingProfessionals,
          workshops: stats.workshops
        });
      } catch (error) {
        console.error('Error fetching KPI data:', error);
        // Fallback to local data
        const pledges = await getPledges();
        const students = pledges.filter(p => p.profileType === 'Student').length;
        const workingProfessionals = pledges.filter(p => p.profileType === 'Working Professional').length;
        const workshops = pledges.filter(p => p.profileType === 'Other').length;

        setKpiData({
          targetPledges: 1000000,
          achievedPledges: pledges.length,
          students,
          workingProfessionals,
          workshops
        });
      }
    };

    updateKPIs();
    const interval = setInterval(updateKPIs, 5000); // Update every 5 seconds for Google Sheets
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (kpiData.achievedPledges / kpiData.targetPledges) * 100;

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Live Impact Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Real-time progress of our climate action community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Target Pledges</h3>
            <p className="text-3xl font-bold text-blue-600">{kpiData.targetPledges.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Achieved Pledges</h3>
            <p className="text-3xl font-bold text-green-600">{kpiData.achievedPledges.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
            <p className="text-3xl font-bold text-purple-600">{kpiData.students.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <Briefcase className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Professionals</h3>
            <p className="text-3xl font-bold text-orange-600">{kpiData.workingProfessionals.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Progress to Target</h3>
            <span className="text-sm text-gray-600">{progressPercentage.toFixed(4)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};