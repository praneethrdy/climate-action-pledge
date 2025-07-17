import React, { useState } from 'react';
import { X, Download, Share2, Heart, FileText, Image } from 'lucide-react';
import { PledgeData } from '../types';

interface CertificateModalProps {
  pledge: PledgeData;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ pledge, onClose }) => {
  const generateCertificateContent = () => {
    const hearts = '❤️'.repeat(pledge.heartsRating) + '🤍'.repeat(5 - pledge.heartsRating);
    return `
      <div style="
        width: 800px;
        height: 600px;
        background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%);
        border: 8px solid #10b981;
        border-radius: 16px;
        padding: 60px;
        font-family: 'Inter', Arial, sans-serif;
        text-align: center;
        position: relative;
      ">
        <div style="
          width: 80px;
          height: 80px;
          background: #dcfce7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        ">
          <svg width="40" height="40" fill="#16a34a" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 style="font-size: 36px; font-weight: bold; color: #111827; margin-bottom: 16px;">Climate Action Certificate</h1>
        <p style="color: #6b7280; margin-bottom: 24px; font-size: 18px;">This certifies that</p>
        <h2 style="font-size: 48px; font-weight: bold; color: #16a34a; margin-bottom: 16px;">${pledge.name}</h2>
        <p style="font-size: 24px; color: #374151; margin-bottom: 24px; font-weight: 600;">is Cool Enough to Care!</p>
        <div style="font-size: 32px; margin-bottom: 24px;">${hearts}</div>
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: left;">
          <h3 style="font-weight: 600; color: #111827; margin-bottom: 12px; text-align: center;">Pledged Commitments:</h3>
          <ul style="color: #6b7280; font-size: 14px; line-height: 1.6; list-style: none; padding: 0;">
            ${pledge.commitments.map(commitment => `<li style="margin-bottom: 8px;">• ${commitment}</li>`).join('')}
          </ul>
        </div>
        <div style="color: #9ca3af; font-size: 12px;">
          <p>Certificate ID: ${pledge.id}</p>
          <p>Date: ${new Date(pledge.date).toLocaleDateString()}</p>
          <p>State: ${pledge.state}</p>
        </div>
      </div>
    `;
  };

  const handleDownloadPDF = async () => {
    try {
      // Create a new window with the certificate content
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Climate Action Certificate - ${pledge.name}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
              body { margin: 0; padding: 20px; background: white; }
              @media print {
                body { margin: 0; padding: 0; }
                @page { margin: 0; size: A4 landscape; }
              }
            </style>
          </head>
          <body>
            ${generateCertificateContent()}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for content to load then trigger print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleDownloadPNG = async () => {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set high resolution
      const scale = 2;
      canvas.width = 800 * scale;
      canvas.height = 600 * scale;
      ctx.scale(scale, scale);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      gradient.addColorStop(0, '#f0fdf4');
      gradient.addColorStop(1, '#dbeafe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);
      
      // Draw border
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, 792, 592);
      
      // Set text properties
      ctx.textAlign = 'center';
      ctx.fillStyle = '#111827';
      
      // Draw title
      ctx.font = 'bold 36px Inter, Arial, sans-serif';
      ctx.fillText('Climate Action Certificate', 400, 120);
      
      // Draw subtitle
      ctx.font = '18px Inter, Arial, sans-serif';
      ctx.fillStyle = '#6b7280';
      ctx.fillText('This certifies that', 400, 160);
      
      // Draw name
      ctx.font = 'bold 48px Inter, Arial, sans-serif';
      ctx.fillStyle = '#16a34a';
      ctx.fillText(pledge.name, 400, 220);
      
      // Draw statement
      ctx.font = '600 24px Inter, Arial, sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText('is Cool Enough to Care!', 400, 260);
      
      // Draw hearts
      ctx.font = '32px Arial, sans-serif';
      const hearts = '❤️'.repeat(pledge.heartsRating) + '🤍'.repeat(5 - pledge.heartsRating);
      ctx.fillText(hearts, 400, 310);
      
      // Draw commitments box background
      ctx.fillStyle = 'white';
      ctx.fillRect(100, 340, 600, 120);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.strokeRect(100, 340, 600, 120);
      
      // Draw commitments title
      ctx.font = '600 16px Inter, Arial, sans-serif';
      ctx.fillStyle = '#111827';
      ctx.fillText('Pledged Commitments:', 400, 365);
      
      // Draw commitments
      ctx.font = '14px Inter, Arial, sans-serif';
      ctx.fillStyle = '#6b7280';
      ctx.textAlign = 'left';
      pledge.commitments.forEach((commitment, index) => {
        const y = 385 + (index * 20);
        ctx.fillText(`• ${commitment}`, 120, y);
      });
      
      // Draw certificate details
      ctx.font = '12px Inter, Arial, sans-serif';
      ctx.fillStyle = '#9ca3af';
      ctx.textAlign = 'center';
      ctx.fillText(`Certificate ID: ${pledge.id}`, 400, 500);
      ctx.fillText(`Date: ${new Date(pledge.date).toLocaleDateString()}`, 400, 520);
      ctx.fillText(`State: ${pledge.state}`, 400, 540);
      
      // Download the image
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `climate-certificate-${pledge.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
      
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Error generating PNG. Please try again.');
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareToSocial = (platform: string) => {
    const shareText = `I just took a climate action pledge and earned ${pledge.heartsRating} hearts! 💚 Join me in making a difference for our planet. #ClimateAction #CoolEnoughToCare`;
    const shareUrl = window.location.href;
    
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Climate Action Pledge Certificate')}&summary=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const copyShareLink = async () => {
    const shareText = `I just took a climate action pledge and earned ${pledge.heartsRating} hearts! 💚 Join me in making a difference for our planet. ${window.location.href}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Share text copied to clipboard!');
    }
    setShowShareOptions(false);
  };

  const [showShareOptions, setShowShareOptions] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Climate Action Certificate</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-200 rounded-xl p-8 mb-6">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Climate Action Certificate</h3>
                <p className="text-gray-600 mb-6">This certifies that</p>
                <h4 className="text-4xl font-bold text-green-600 mb-4">{pledge.name}</h4>
                <p className="text-xl text-gray-700 mb-6 font-semibold">
                  is Cool Enough to Care!
                </p>
                
                <div className="flex justify-center items-center mb-6">
                  <div className="text-4xl">
                    {'❤️'.repeat(pledge.heartsRating)}
                    {'🤍'.repeat(5 - pledge.heartsRating)}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">Pledged Commitments:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pledge.commitments.map((commitment, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {commitment}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Certificate ID: {pledge.id}</p>
                  <p>Date: {new Date(pledge.date).toLocaleDateString()}</p>
                  <p>State: {pledge.state}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button
              onClick={handleDownloadPNG}
              className="flex items-center justify-center bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Image className="w-5 h-5 mr-2" />
              Download as PNG
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <button
              onClick={handleShare}
              className="flex items-center justify-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share My Achievement
            </button>
            
            {showShareOptions && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4 w-full max-w-md">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">Share on:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => shareToSocial('whatsapp')}
                    className="flex items-center justify-center bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('linkedin')}
                    className="flex items-center justify-center bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('twitter')}
                    className="flex items-center justify-center bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('facebook')}
                    className="flex items-center justify-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
                
                <button
                  onClick={copyShareLink}
                  className="w-full mt-3 flex items-center justify-center bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Share Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};