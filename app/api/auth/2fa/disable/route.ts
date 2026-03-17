import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
export async function POST() { const session = await getServerSession();

if (!session?.user?.id) { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

await prisma.user.update({ where: { id: session.user.id }, data: { twoFactorEnabled: false, twoFactorSecret: null, } as any, });

return NextResponse.json({ success: true }); }

