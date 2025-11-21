import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

type SignatureDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  category: string;
  responses: Array<{ question: string; answer: string }>;
};

function SignatureDialog({ isOpen, onClose, onSubmit, category, responses }: SignatureDialogProps) {
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Store each response with the signature
      const promises = responses.map(response => 
        supabase.from('survey_responses').insert({
          category,
          question: response.question,
          answer: response.answer,
          signature: signature
        })
      );

      await Promise.all(promises);
      onSubmit();
    } catch (err) {
      setError('Der opstod en fejl ved gemning af dine svar. Prøv venligst igen.');
      console.error('Error storing responses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Underskriv dine svar</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
              Dit navn
            </label>
            <input
              type="text"
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Skriv dit navn her"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !signature.trim()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Gemmer...' : 'Gem svar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignatureDialog;