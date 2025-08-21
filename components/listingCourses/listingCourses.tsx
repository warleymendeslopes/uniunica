'use client';
import React from 'react';
import Image from 'next/image';

type RawCourse = {
  _id?: string;
  id?: string | number;
  title?: string;
  name?: string;
  image?: string;
  thumbnail?: string;
  cover?: string;
  objective?: string;
  description?: string;
  resume?: string;
  about?: string;
};

type Course = {
  id: string;
  name: string;
  objective?: string;
  thumb?: string;
};

type Props = {
  alias: string;               // areaAlias recebido do pai
  onBack?: () => void;         // opcional: voltar para a grade de áreas
  page?: number;
  perPage?: number;
};

const ENDPOINT = '/api/courses'; // sua API (proxy interno)

export default function ListingCourse({ alias, onBack, page = 1, perPage = 8 }: Props) {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');

  React.useEffect(() => {
    if (!alias) return;
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const url = `${ENDPOINT}?area=${encodeURIComponent(alias)}&page=${page}&perPage=${perPage}`;
        console.log('📡 [ListingCourse] buscando cursos com alias:', alias, '->', url);
        const res = await fetch(url, { cache: 'no-store' });
        console.log('🔎 [ListingCourse] status:', res.status);

        const json = await res.json();
        console.log('📦 [ListingCourse] payload:', json);

        const raw: RawCourse[] =
          json?.results ??
          json?.data?.items ??
          json?.items ??
          (Array.isArray(json) ? json : []);

        const normalized: Course[] = (raw || []).map((c, i) => ({
          id: String(c._id ?? c.id ?? i),
          name: (c.name ?? c.title ?? 'Curso').trim(),
          objective: c.objective ?? c.description ?? c.resume ?? c.about ?? '',
          thumb: c.thumbnail ?? c.image ?? c.cover ?? '',
        }));

        setCourses(normalized);
      } catch (e) {
        console.error('❌ [ListingCourse] erro ao carregar cursos:', e);
        setErr('Não foi possível carregar os cursos desta área.');
      } finally {
        setLoading(false);
      }
    })();
  }, [alias, page, perPage]);

  if (!alias) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">
          Cursos da área: <span className="font-normal">{alias}</span>
        </h3>
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm px-3 py-1 rounded border hover:bg-gray-50 transition"
          >
            ← Voltar às áreas
          </button>
        )}
      </div>

      {loading && courses.length === 0 && <p>Carregando cursos…</p>}
      {err && <p className="text-red-500 mb-2">{err}</p>}
      {!loading && courses.length === 0 && !err && <p>Nenhum curso encontrado para esta área.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
            {c.thumb ? (
              <div className="aspect-[16/9] relative bg-gray-100">
                <Image
                  src={c.thumb}
                  alt={c.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : null}
            <div className="p-4">
              <h4 className="font-semibold mb-2">{c.name}</h4>
              {c.objective ? (
                <p className="text-sm text-gray-600 line-clamp-4">{c.objective}</p>
              ) : (
                <p className="text-sm text-gray-400 italic">Sem descrição disponível.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
