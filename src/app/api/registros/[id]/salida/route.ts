import { NextResponse } from 'next/server';
import dbConnect from 'src/app/lib/mongodb';
import Registro from '@/models/Registro';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1️⃣ Conectar a la base de datos
    await dbConnect();

    // 2️⃣ Resolver params
    const { id } = await context.params;

    // 3️⃣ Buscar el registro primero
    const registroExistente = await Registro.findById(id);

    if (!registroExistente) {
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    // 4️⃣ Validar que el registro no tenga ya horaSalida
    if (registroExistente.horaSalida) {
      return NextResponse.json(
        { error: 'La salida ya fue registrada' },
        { status: 400 }
      );
    }

    // 5️⃣ Actualizar estado y horaSalida
    registroExistente.estado = 'salida';
    registroExistente.horaSalida = new Date();

    // 6️⃣ Guardar en MongoDB
    const registroActualizado = await registroExistente.save();

    // 7️⃣ Verificar que se guardó correctamente (debug)
    console.log('Registro actualizado:', registroActualizado);

    // 8️⃣ Retornar respuesta al frontend
    return NextResponse.json(registroActualizado);

  } catch (error) {
    console.error('ERROR PATCH SALIDA:', error);
    return NextResponse.json({ error: 'Error al registrar salida' }, { status: 500 });
  }
}
