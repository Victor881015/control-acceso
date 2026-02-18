import { NextResponse } from 'next/server';
import dbConnect from 'src/app/lib/mongodb';
import Alarma from '@/models/Alarma';

// GET - Obtener todas las alarmas
export async function GET() {
  try {
    await dbConnect();
    const alarmas = await Alarma.find({}).sort({ fecha: -1 });
    return NextResponse.json(alarmas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener alarmas' }, { status: 500 });
  }
}

// POST - Crear nueva alarma
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const nuevaAlarma = await Alarma.create(body);
    
    return NextResponse.json(nuevaAlarma, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear alarma' }, { status: 500 });
  }
}