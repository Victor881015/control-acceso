import mongoose from 'mongoose';

const RegistroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  documento: { type: String, required: true },
  tipo: { 
    type: String, 
    enum: ['empleado', 'visitante', 'contratista', 'proveedor'],
    required: true 
  },
  estado: { 
    type: String, 
    enum: ['ingreso', 'salida'],
    required: true 
  },
  puerta: { 
    type: String, 
    enum: ['principal', 'parqueadero', 'emergencia', 'carga', 'lateral'],
    required: true 
  },
  empresa: String,
  horaIngreso: { type: Date, required: true },
  horaSalida: Date,
  foto: String,
  registradoPor: String,
  autorizadoPor: String,
  areaDestino: String,
  observaciones: String,
  temperatura: Number,
  nivelSeguridad: {
    type: String,
    enum: ['publico', 'restringido', 'confidencial', 'critico']
  },
  vehiculo: String,
  placaVehiculo: String,
  elementosIngreso: [String],
  fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.models.Registro || mongoose.model('Registro', RegistroSchema);