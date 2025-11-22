import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Shield, Clock, BadgeCheck, Brain, Bookmark, Percent, BarChart, Settings } from 'lucide-react';
import WashingMachineForm from './components/WashingMachineForm.tsx';
import WashingMachineRecommendations from './components/WashingMachineRecommendations.tsx';
import DishwasherForm from './components/DishwasherForm.tsx';
import DishwasherRecommendations from './components/DishwasherRecommendations.tsx';
import OvenForm from './components/OvenForm.tsx';
import OvenRecommendations from './components/OvenRecommendations.tsx';
import RefrigeratorForm from './components/RefrigeratorForm.tsx';
import RefrigeratorRecommendations from './components/RefrigeratorRecommendations.tsx';
import TVForm from './components/TVForm.tsx';
import TVRecommendations from './components/TVRecommendations.tsx';
import Analytics from './components/Analytics.tsx';
import LoginDialog from './components/LoginDialog.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

type Category = {
  id: string;
  name: string;
  icon: string;
};

const categories: Category[] = [
  { id: 'washing-machine', name: 'Vaskemaskine', icon: '🧺' },
  { id: 'dishwasher', name: 'Opvaskemaskine', icon: '🍽️' },
  { id: 'oven', name: 'Ovn', icon: '🔥' },
  { id: 'refrigerator', name: 'Køleskab', icon: '❄️' },
  { id: 'tv', name: 'TV', icon: '📺' },
  { id: 'gaming-pc', name: 'Gamer-PC', icon: '🖥️' },
  { id: 'smartphone', name: 'Smartphone', icon: '📱' },
];

function HomePage() {
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleAdminClick = () => {
    setShowLoginDialog(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginDialog(false);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Find det perfekte produkt</h1>
          <button
            onClick={() => navigate('/analytics')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <BarChart className="w-5 h-5 mr-2" />
            Se statistik
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Din personlige produktguide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vi hjælper dig med at vælge det helt rigtige produkt baseret på dine specifikke behov.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/${category.id}`)}
              className={`p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50 transition-all relative overflow-hidden ${
                category.id === 'washing-machine' ? 'min-h-[200px]' : ''
              }`}
            >
              {category.id === 'washing-machine' && (
                <div 
                  className="absolute inset-0 opacity-10 bg-cover bg-center z-0"
                  style={{
                    backgroundImage: 'url(https://www.teka.com/en-lt/wp-content/uploads/sites/127/2019/09/how-to-choose-a-washing-machine1.jpg)'
                  }}
                />
              )}
              <div className="flex items-center space-x-4 relative z-10">
                <span className="text-4xl">{category.icon}</span>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-gray-500 flex items-center mt-1">
                    Vælg kategori <ChevronRight className="w-4 h-4 ml-1" />
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ShoppingCart className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Troværdige anbefalinger</h3>
            <p className="text-gray-600">Vi vælger produkter ud fra rigtige behov, ikke kun reklamer.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Clock className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tidsbesparende</h3>
            <p className="text-gray-600">Slip for at læse utallige anmeldelser – vi gør det for dig.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Shield className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gennemsigtighed</h3>
            <p className="text-gray-600">Sponsorerede produkter bliver markeret tydeligt.</p>
          </div>
        </div>

        {/* Future Features */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Fremtidige funktioner</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Bookmark className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <p className="text-gray-700">Gem dine tidligere søgninger med en brugerprofil</p>
            </div>
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <p className="text-gray-700">AI-drevne anbefalinger for præcise matches</p>
            </div>
            <div className="flex items-start space-x-3">
              <Percent className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <p className="text-gray-700">Eksklusive rabatter gennem vores partnere</p>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-semibold mb-4">Vores partnere</h3>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <span className="text-lg font-semibold">Elgiganten</span>
            <span className="text-lg font-semibold">Power</span>
            <span className="text-lg font-semibold">WhiteAway</span>
            <span className="text-lg font-semibold">Skousen</span>
            <span className="text-lg font-semibold">Proshop</span>
            <span className="text-lg font-semibold">Bilka</span>
          </div>
        </div>

        {/* Admin Button */}
        <div className="text-center">
          <button
            onClick={handleAdminClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Settings className="w-5 h-5" />
            <span>Administrer Produkter</span>
          </button>
        </div>
      </main>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/washing-machine" element={<WashingMachineForm />} />
      <Route path="/washing-machine/recommendations" element={<WashingMachineRecommendations />} />
      <Route path="/dishwasher" element={<DishwasherForm />} />
      <Route path="/dishwasher/recommendations" element={<DishwasherRecommendations />} />
      <Route path="/oven" element={<OvenForm />} />
      <Route path="/oven/recommendations" element={<OvenRecommendations />} />
      <Route path="/refrigerator" element={<RefrigeratorForm />} />
      <Route path="/refrigerator/recommendations" element={<RefrigeratorRecommendations />} />
      <Route path="/tv" element={<TVForm />} />
      <Route path="/tv/recommendations" element={<TVRecommendations />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;