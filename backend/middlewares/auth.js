const User = require('../models/User');
const generateToken = require('../config/jwt');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, motDePasse, telephone, adresse, dateNaissance, role } = req.body;
    if (!name || !email || !motDePasse || !telephone || !adresse || !dateNaissance) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
    const user = new User({ name, email, motDePasse, telephone, adresse, dateNaissance, role });
    await user.save();
    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }
    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }
    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
