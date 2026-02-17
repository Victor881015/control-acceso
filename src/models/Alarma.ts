import mongoose from 'mongoose';

const AlarmaSchema = new mongoose.Schema({
  tipo: { 
    type: String, 
    enum: ['acceso_denegado', 'puerta_forzada', 'tiempo_excedido', 'zona_restringida', 'temperatura_alta', 'intrusion', 'objeto_sospechoso'],
    required: true 
  },
  descripcion: { type: String, required: true },
  ubicacion: { type: String, required: true },
  coordenadas: {
    lat: Number,
    lng: Number
  },
  fecha: { type: Date, required: true },
  severidad: { 
    type: String, 
    enum: ['baja', 'media', 'alta', 'critica'],
    required: true 
  },
  atendida: { type: Boolean, default: false },
  personaInvolucrada: String,
  accionTomada: String,
  camaraAsociada: String,
  atendidaPor: String,
  fechaAtencion: Date
});

export default mongoose.models.Alarma || mongoose.model('Alarma', AlarmaSchema);