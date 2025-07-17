import React from 'react';
import { TreePine, Users, Zap, Globe2 } from 'lucide-react';

export const WhyTakeAction: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Take Climate Action?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Climate change is the defining challenge of our time, but individual actions create powerful collective impact. 
            Every pledge matters, every commitment counts, and together we can create the change our planet needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
              <TreePine className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Individual Responsibility</h3>
            <p className="text-gray-600 leading-relaxed">
              Each of us has the power to make a difference. Your daily choices ripple through communities and inspire others to act.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Movement</h3>
            <p className="text-gray-600 leading-relaxed">
              Join millions worldwide who are taking action. Together, we're building a sustainable future for generations to come.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors duration-300">
              <Zap className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Immediate Impact</h3>
            <p className="text-gray-600 leading-relaxed">
              Small changes today create big results tomorrow. Every action you take helps reduce carbon footprint and saves resources.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-300">
              <Globe2 className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Future Generations</h3>
            <p className="text-gray-600 leading-relaxed">
              The choices we make today determine the world we leave behind. Act now for a healthier, more sustainable planet.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-xl mb-6">
            Your commitment matters. Join thousands who have already pledged to create positive change.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div>
              <span className="text-2xl font-bold block">1M+</span>
              <span>Target Pledges</span>
            </div>
            <div>
              <span className="text-2xl font-bold block">50+</span>
              <span>States Participating</span>
            </div>
            <div>
              <span className="text-2xl font-bold block">24/7</span>
              <span>Community Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};