"use client";

import { Plus } from 'lucide-react';
import Link from 'next/link';

// Versão simplificada sem dependências externas
export default function PagesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Páginas</h1>
        <Link href="/admin/pages/new" className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
          <span className="mr-2">+</span> Nova Página
        </Link>
      </div>
      <div className="rounded-md border">
        <div className="p-4 bg-gray-50">
          <p>Nenhuma página encontrada. Crie uma nova página para começar.</p>
        </div>
      </div>
    </div>
  );
} 