import { NextResponse } from 'next/server';
import dbConnect from 'src/app/lib/mongodb';
import Alarma from '@/models/Alarma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const alarma = await Alarma.findByIdAndUpdate(
      params.id,
      {
        atendida: true,
        accionTomada: body.accionTomada,
        fechaAtencion: new Date()
      },
      { new: true }
    );
    
    if (!alarma) {
      return NextResponse.json({ error: 'Alarma no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(alarma);
  } catch (error) {
    return NextResponse.json({ error: 'Error al atender alarma' }, { status: 500 });
  }
}