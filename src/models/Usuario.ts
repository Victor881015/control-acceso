import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['admin', 'operador', 'supervisor', 'guardia'],
    required: true 
  },
  documento: String,
  telefono: String,
  foto: String,
  activo: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now },
  ultimoAcceso: Date
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);