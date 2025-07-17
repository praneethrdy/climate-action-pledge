import React from 'react';
import { Leaf, Heart, Globe } from 'lucide-react';

interface HeroSectionProps {
  onTakePledge: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTakePledge }) => {
  return (
    <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Globe className="w-16 h-16 text-blue-200 animate-pulse" />
              <Heart className="w-8 h-8 text-red-400 absolute -top-2 -right-2 animate-bounce" />
              <Leaf className="w-6 h-6 text-green-300 absolute -bottom-1 -left-1 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Climate Action
            <span className="block text-yellow-300">Pledge</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of individuals making a difference. Your small actions create powerful collective impact for our planet's future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onTakePledge}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Take the Pledge Now
            </button>
            <p className="text-blue-200 text-sm">
              Free • No spam • Join the movement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Leaf className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sustainable Living</h3>
              <p className="text-blue-100 text-sm">Make eco-friendly choices in your daily routine</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Globe className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Impact</h3>
              <p className="text-blue-100 text-sm">Be part of a worldwide movement for change</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Heart className="w-12 h-12 text-red-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Action</h3>
              <p className="text-blue-100 text-sm">Inspire others and create lasting change together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};