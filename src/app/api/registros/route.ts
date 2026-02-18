import { NextResponse } from 'next/server';
import dbConnect from 'src/app/lib/mongodb';
import Registro from '@/models/Registro';

// ===============================
// GET - Obtener todos
// ===============================
export async function GET() {
  try {
    await dbConnect();

    const registros = await Registro.find({})
      .sort({ fechaRegistro: -1 })
      .lean();

    // 🔥 DEVOLVEMOS ARRAY DIRECTO
    return NextResponse.json(registros);

  } catch (error: any) {
    console.error('ERROR GET REGISTROS:', error);

    return NextResponse.json(
      { error: error.message || 'Error al obtener registros' },
      { status: 500 }
    );
  }
}

// ===============================
// POST - Crear registro
// ===============================
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const { nombre, documento, tipo, estado, puerta } = body;

    // 🔎 Validación obligatoria
    if (!nombre || !documento || !tipo || !estado || !puerta) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const nuevoRegistro = await Registro.create({
      ...body,
      horaIngreso: new Date(),
      fechaRegistro: new Date(),
    });

    return NextResponse.json(nuevoRegistro, { status: 201 });

  } catch (error: any) {
    console.error('ERROR POST REGISTRO:', error);

    return NextResponse.json(
      { error: error.message || 'Error al crear registro' },
      { status: 500 }
    );
  }
}
