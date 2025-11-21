import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Shield, Clock } from 'lucide-react';
import WashingMachineForm from './components/WashingMachineForm';
import WashingMachineRecommendations from './components/WashingMachineRecommendations';
import { CATEGORIES } from './config/categories';

function HomePage() {
  const navigate = useNavigate();
  const enabledCategories = CATEGORIES.filter(cat => cat.enabled);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl text-white font-bold">P</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">POWER Produktguide</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find det perfekte produkt til dine behov
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Svar på et par simple spørgsmål, og få personlige anbefalinger baseret på dine specifikke ønsker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {enabledCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/${category.id}`)}
              className="group p-8 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all bg-white"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl mb-4">{category.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-orange-600 flex items-center group-hover:text-orange-700">
                  Start guide <ChevronRight className="w-4 h-4 ml-1" />
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <ShoppingCart className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Skræddersyede anbefalinger</h3>
            <p className="text-gray-600">
              Vi anbefaler produkter baseret på dine specifikke behov og præferencer.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Clock className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Hurtig og nem</h3>
            <p className="text-gray-600">
              Få anbefalinger på under 2 minutter ved at svare på simple spørgsmål.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Shield className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Ekspert vejledning</h3>
            <p className="text-gray-600">
              Vores system er udviklet med input fra erfarne produkteksperter.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Klar til at finde dit perfekte produkt?</h3>
          <p className="text-xl mb-8 opacity-90">
            Vælg en kategori ovenfor og kom i gang
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="text-lg opacity-90">Samarbejdspartnere:</span>
            <span className="font-semibold">POWER</span>
            <span className="opacity-50">|</span>
            <span className="font-semibold">Elgiganten</span>
            <span className="opacity-50">|</span>
            <span className="font-semibold">Expert</span>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            POWER Produktguide - Din vejviser til det rigtige valg
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/washing_machines" element={<WashingMachineForm />} />
      <Route path="/washing_machines/recommendations" element={<WashingMachineRecommendations />} />
    </Routes>
  );
}

export default App;
