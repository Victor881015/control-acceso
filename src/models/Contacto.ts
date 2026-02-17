import mongoose from 'mongoose';

const ContactoSchema = new mongoose.Schema({
  area: { type: String, required: true },
  responsable: { type: String, required: true },
  telefono: { type: String, required: true },
  extension: String,
  email: { type: String, required: true },
  icono: { type: String, required: true },
  disponibilidad: { 
    type: String, 
    enum: ['24/7', 'Horario laboral'],
    required: true 
  },
  activo: { type: Boolean, default: true }
});

export default mongoose.models.Contacto || mongoose.model('Contacto', ContactoSchema);