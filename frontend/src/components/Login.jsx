import React, { useState } from 'react';
import Image from '../assets/1167191_ORU2DB0.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setMessage('');
    setTimeout(() => {
      setMessage('Connexion désactivée en mode démo.');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-white flex items-center justify-center px-4">
      <div 
        className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200 p-8 relative overflow-hidden"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-80"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-emerald-700">
              Connexion
            </h1>
            <p className="text-sm text-gray-600 mt-1">Accédez à votre espace citoyen</p>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-emerald-500'
                }`}
                placeholder="exemple@commune.ma"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-emerald-500'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span>Se souvenir de moi</span>
              </label>
              <a href="/forgot-password" className="text-emerald-600 hover:underline">Mot de passe oublié ?</a>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-md"
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>
            {message && (
              <div className={`text-sm text-center p-3 rounded-lg mt-4 ${
                message.includes('réussie')
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </form>
          <div className="text-center mt-6 text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-emerald-600 font-medium hover:underline">Créer un compte</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;