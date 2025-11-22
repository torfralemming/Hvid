import React, { useState } from 'react';
import { X } from 'lucide-react';

type PriceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPrice: number) => void;
  currentPrice: number;
  productName: string;
};

function PriceDialog({ isOpen, onClose, onSave, currentPrice, productName }: PriceDialogProps) {
  const [price, setPrice] = useState(currentPrice);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price < 0) {
      setError('Prisen kan ikke være negativ');
      return;
    }
    onSave(price);
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

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rediger pris</h2>
        <p className="text-gray-600 mb-4">{productName}</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Pris (DKK)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuller
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Gem ændringer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PriceDialog;