'use client';
import React from 'react';
import Image from 'next/image';
import ListingCourse from '../listingCourses/listingCourses';

type Area = {
  qtd: number;
  areaName: string;
  miniature: string;
  areaAlias: string;
};

type Props = {
  modality: 'pos-graduacao' | 'graduacao' | 'segunda-graduacao' | 'disciplinas-isoladas';
};

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

/* endpoints de listagens de cursos */
const ENDPOINTS = {
  areasPos: 'https://api-lyratec.institutoprominas.com.br/course_areas/list',
  proxy: 'https://faculdadeunica.com.br/api/area',
};

export default function CursosPorModalidade({ modality }: Props) {
  const [areas, setAreas] = React.useState<Area[]>([]);
  const [selectedAreaAlias, setSelectedAreaAlias] = React.useState<string>('');
  const [coursesOther, setCoursesOther] = React.useState<Course[]>([]);
  const [gradTag, setGradTag] = React.useState<'ead' | 'presencial'>('ead');
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');

  const normalizeCourses = React.useCallback((json: any): Course[] => {
    const raw: RawCourse[] =
      json?.results ??
      json?.data?.items ??
      json?.items ??
      (Array.isArray(json) ? json : []);
    return (raw || []).map((c, i) => ({
      id: String(c._id ?? c.id ?? i),
      name: (c.name ?? c.title ?? 'Curso').trim(),
      objective: c.objective ?? c.description ?? c.resume ?? c.about ?? '',
      thumb: c.thumbnail ?? c.image ?? c.cover ?? '',
    }));
  }, []);

/* carrega as áreas */
  React.useEffect(() => {
    // reset geral ao trocar modalidade
    setSelectedAreaAlias('');
    setCoursesOther([]);
    setErr('');

    if (modality !== 'pos-graduacao') {
      setAreas([]);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        console.log('🔹 Carregando áreas de pós:', ENDPOINTS.areasPos);
        const res = await fetch(ENDPOINTS.areasPos, { cache: 'no-store' });
        const json = await res.json();
        console.log('Áreas (pós) resposta:', json);
        setAreas(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        console.error('Falha ao carregar áreas (pós):', e);
        setErr('Falha ao carregar áreas.');
      } finally {
        setLoading(false);
      }
    })();
  }, [modality]);


/* aqui eu faço o fetch para verificar a listagens das outras modalidades */
const fetchOtherModalities = React.useCallback(async () => {
  try {
    setLoading(true);
    setErr('');
    let url = ENDPOINTS.proxy;

    if (modality === 'graduacao') {
      const params = new URLSearchParams({
        modality: 'graduacao',
        tag: gradTag,
        page: '1',
        perPage: '8',
      });
      url += `?${params.toString()}`;
    } else if (modality === 'segunda-graduacao') {
      const params = new URLSearchParams({
        modality: 'segunda-graduacao',
        page: '1',
        perPage: '8',
      });
      url += `?${params.toString()}`;
    } else if (modality === 'disciplinas-isoladas') {
      const params = new URLSearchParams({
        modality: 'disciplinas-isoladas',
        page: '1',
        perPage: '8',
      });
      url += `?${params.toString()}`;
    } else {
      return;
    }

    console.log('Buscando cursos (outras modalidades):', url);
    const res = await fetch(url, { cache: 'no-store' });
    console.log('Status (outras modalidades):', res.status);
    const json = await res.json();
    console.log('Resposta (outras modalidades):', json);

    setCoursesOther(normalizeCourses(json));
  } catch (e) {
    console.error('Erro ao carregar cursos (outras modalidades):', e);
    setErr('Não foi possível carregar os cursos.');
  } finally {
    setLoading(false);
  }
}, [gradTag, modality, normalizeCourses]);

/* aqui eu exibo as aŕeas de pós-graduação */
  React.useEffect(() => {
    if (modality === 'pos-graduacao') return;
    fetchOtherModalities();
  }, [modality, gradTag, fetchOtherModalities]);

  const handleClickArea = (alias: string) => {
    console.log('verificando a area clicada', alias);
    setSelectedAreaAlias(alias);
  };

  const handleBack = () => setSelectedAreaAlias('');

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 items-center justify-center flex flex-col">
     {/* exibindo as areas de pos-graduação */}
      {modality === 'pos-graduacao' && (
        <>
          {!selectedAreaAlias ? (
            <>
              <h2 className="text-xl lg:text-2xl text-center py-16 font-bold uppercase font-krona mb-4">
                escolha sua área de estudos
              </h2>

              {loading && <p>Carregando áreas…</p>}
              {err && <p className="text-red-500 mb-2">{err}</p>}

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
                {areas.map((a) => (
                  <button
                    key={a.areaAlias}
                    onClick={() => handleClickArea(a.areaAlias)}
                    className="relative group  text-center rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="relative w-[200px] h-[260px] lg:w-[280px] lg:h-[346px]">
                      <Image
                        src={a.miniature}
                        alt={a.areaName}
                        width={280}
                        height={350}
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute -left-3 bottom-0 lg:left-0 w-full p-3 font-krona flex flex-col items-center justify-center text-center">
                        <p className="text-white uppercase mb-3 text-xs lg:text-base drop-shadow-md">
                          {a.areaName}
                        </p>
                        <span className="uppercase rounded-lg text-[10px] lg:text-base border-1 p-2 mb-3">
                          ESCOLHER CURSO
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <ListingCourse alias={selectedAreaAlias} onBack={handleBack} />
          )}
        </>
      )}

     {/* restante das áreas diferente de pós-graduação */}
      {modality !== 'pos-graduacao' && (
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl lg:text-2xl font-bold uppercase font-krona">
              {modality.replace('-', ' ')}
            </h2>

            {modality === 'graduacao' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setGradTag('ead')}
                  className={`px-3 py-1 rounded border ${
                    gradTag === 'ead' ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  EAD
                </button>
                <button
                  onClick={() => setGradTag('presencial')}
                  className={`px-3 py-1 rounded border ${
                    gradTag === 'presencial' ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  Presencial
                </button>
              </div>
            )}
          </div>

          {loading && coursesOther.length === 0 && <p>Carregando cursos…</p>}
          {err && <p className="text-red-500 mb-2">{err}</p>}
          {!loading && coursesOther.length === 0 && !err && (
            <p>Nenhum curso encontrado.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesOther.map((c) => (
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
      )}
    </section>
  );
}
