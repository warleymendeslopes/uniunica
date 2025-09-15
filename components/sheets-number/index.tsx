'use client';

import React, { useEffect, useMemo, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
      ready: (cb: () => void) => void;
    };
  }
}

type WhatsRowRaw = {
  'Nome do WhatsApp'?: string;
  'Nome do WhatsApp '?: string;
  'Número do WhatsApp'?: string;
  'Número do WhatsApp '?: string;
  Setor?: string;
  [key: string]: string | undefined;
};

type PhoneNorm = { digits: string; no55: string };

type IndexItem = {
  raw: WhatsRowRaw;
  name: string;
  phone: string;
  setor: string;
  normAll: string;
  normNo55: string;
};

function csvToJson(csv: string): Array<Record<string, string>> {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      const val =
        (cols[i]?.replace(/^"|"$/g, '').replace(/""/g, '"').trim() as string) ||
        '';
      obj[h] = val;
    });
    return obj;
  });
}

function normalizePhone(raw: string): PhoneNorm {
  const digits = (raw || '').replace(/\D+/g, '');
  const no55 = digits.startsWith('55') ? digits.slice(2) : digits;
  return { digits, no55 };
}

function variantsFromNo55(no55: string): {
  base: string;
  with9: string;
  without9: string;
} {
  // no55 = DDD + número (sem +55)
  if (no55.length < 2) return { base: no55, with9: no55, without9: no55 };

  const ddd = no55.slice(0, 2);
  const rest = no55.slice(2);

  // Versão COM 9 após o DDD
  const with9 =
    rest.length === 9 && rest.startsWith('9') ? no55 : ddd + '9' + rest;

  // Versão SEM o 9 após o DDD (apenas se existir)
  const without9 =
    rest.length === 9 && rest.startsWith('9') ? ddd + rest.slice(1) : no55;

  return { base: no55, with9, without9 };
}

function formatPhoneMask(digits: string): string {
  const d = digits.slice(0, 11);
  const len = d.length;

  if (len === 0) return '';
  if (len <= 2) return `(${d}`;
  if (len <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (len <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function SheetsNumber(): JSX.Element {
  const [rows, setRows] = useState<WhatsRowRaw[]>([]);
  const [searchMasked, setSearchMasked] = useState<string>('');
  const [searchDigits, setSearchDigits] = useState<string>('');
  const [result, setResult] = useState<WhatsRowRaw | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const googleSheetUrl =
      'https://docs.google.com/spreadsheets/d/19ukDrfahbCPXpihPxSwhcJqyXIIsbw12_bGE8_Arnpk/edit?gid=0#gid=0';

    const idMatch = googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = googleSheetUrl.match(/gid=(\d+)/);
    if (!idMatch) return;

    const id = idMatch[1];
    const gid = gidMatch ? gidMatch[1] : '0';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;

    fetch(csvUrl)
      .then((res) => res.text())
      .then((csv) => {
        const parsed = csvToJson(csv);
        const typedRows: WhatsRowRaw[] = parsed.map((r) => r as WhatsRowRaw);
        setRows(typedRows);
      })
      .catch(console.error);
  }, []);

  const index: IndexItem[] = useMemo(() => {
    return rows.map((r): IndexItem => {
      const name = r['Nome do WhatsApp'] ?? r['Nome do WhatsApp '] ?? '';
      const phone = r['Número do WhatsApp'] ?? r['Número do WhatsApp '] ?? '';
      const setor = r.Setor ?? r.Setor ?? '';
      const norm = normalizePhone(phone);
      return {
        raw: r,
        name,
        phone,
        setor,
        normAll: norm.digits,
        normNo55: norm.no55,
      };
    });
  }, [rows]);

  function handleInputChange(value: string): void {
    let digits = value.replace(/\D+/g, '');
    if (digits.startsWith('55')) digits = digits.slice(2);
    digits = digits.slice(0, 11);

    const isDeletion = digits.length < searchDigits.length;

    setSearchDigits(digits);
    setSearchMasked(formatPhoneMask(digits));
    setHasSearched(false);

    if (isDeletion) {
      setResult(null);
    }
  }

  async function handleSearch(): Promise<void> {
    if (!searchDigits) return;

    /*  if (!window.grecaptcha) {
      console.log(
        'Verificação de segurança ainda carregando, tente novamente.',
      );
      return;
    } */

    const token = await window.grecaptcha.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
      { action: 'search_whatsapp' },
    );
    if (!token) {
      alert('Falha ao executar verificação de segurança.');
      return;
    }

    // searchDigits já está sem +55 (pelo seu handleInputChange)
    const { base, with9, without9 } = variantsFromNo55(searchDigits);

    const candidatesNo55 = new Set([base, with9, without9]);
    const candidatesAll = new Set(
      Array.from(candidatesNo55).map((v) => `55${v}`),
    );

    const found =
      // match exato sem +55
      index.find((it) => candidatesNo55.has(it.normNo55)) ??
      // match exato com +55
      index.find((it) => candidatesAll.has(it.normAll)) ??
      index.find((it) =>
        Array.from(candidatesNo55).some((c) => it.normNo55.endsWith(c)),
      ) ??
      index.find((it) =>
        Array.from(candidatesAll).some((c) => it.normAll.endsWith(c)),
      ) ??
      null;

    setResult(found ? found.raw : null);
    setHasSearched(true);
  }

  return (
    <section className="relative bg-[url('/fimEADdesktop.webp')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 text-center gap-10 md:grid-cols-2 font-poppins justify-center items-center">
          <div className="space-y-5 flex items-center justify-center flex-col">
            <h1 className="lg:text-2xl text-xl max-w-[18rem] text-center lg:max-w-3xl font-bold leading-tight">
              Sua jornada acadêmica com segurança
            </h1>
            <p className="text-base/7 md:text-lg/8 text-white/90 lg:block hidden">
              Invista no seu futuro com nossas <strong>Pós-Graduações</strong>,{' '}
              <strong>Segunda Graduação</strong>, <strong>Graduação</strong> e{' '}
              <strong>Disciplinas Isoladas</strong>. Qualidade, reconhecimento e
              suporte de uma equipe dedicada para transformar sua carreira.
            </p>

            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <h2 className="text-xl font-medium">⚠️ Atenção: evite golpes</h2>
              <p className="mt-2 text-white/90">
                Temos vendedores autorizados, mas golpistas podem tentar se
                passar por eles usando números falsos. Antes de confiar ou
                enviar dados,{' '}
                <strong>confira o número no validador ao lado</strong>. É rápido
                e garante sua segurança.
              </p>
            </div>
            <div className="md:justify-self-end lg:hidden">
              <div className="w-full max-w-md rounded-2xl bg-white/90 p-6 text-black shadow-xl backdrop-blur">
                <h3 className="mb-4 text-xl font-semibold">
                  Buscar por número do WhatsApp
                </h3>

                <label className="mb-2 block text-sm text-left font-medium text-gray-700">
                  Digite o número:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    inputMode="numeric"
                    aria-label="Número do WhatsApp"
                    placeholder="(11) 98765-4321"
                    value={searchMasked}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                    maxLength={15}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none ring-0 focus:border-gray-400"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={!searchDigits}
                    className="rounded-lg cta-button-color px-4 py-2 text-black font-bold transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Buscar
                  </button>
                </div>

                {result && (
                  <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
                    <p className="mb-1 text-sm font-semibold">
                      ✅ Número validado com sucesso!
                    </p>
                    <p>
                      <span className="font-semibold">Nome:</span>{' '}
                      {result['Nome do WhatsApp'] ??
                        result['Nome do WhatsApp ']}
                    </p>
                    <p>
                      <span className="font-semibold">Setor:</span>{' '}
                      {result.Setor ?? result.Setor ?? '-'}
                    </p>
                    <a
                      href={`https://wa.me/${
                        normalizePhone(
                          result['Número do WhatsApp'] ??
                            result['Número do WhatsApp '] ??
                            '',
                        ).digits
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 transition"
                    >
                      💬 Chamar no WhatsApp
                    </a>
                  </div>
                )}

                {hasSearched && !result && (
                  <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                    <p className="text-sm">Nenhum resultado encontrado.</p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-white/80">
              Estude com tranquilidade, falando com quem realmente faz parte da
              nossa instituição.
            </p>
          </div>

          <div className="md:justify-self-end hidden lg:block">
            <div className="w-full max-w-md rounded-2xl bg-white/90 p-6 text-black shadow-xl backdrop-blur">
              <h3 className="mb-4 text-xl font-semibold">
                Buscar por número do WhatsApp
              </h3>

              <label className="mb-2 block text-sm font-medium text-left text-gray-700">
                Digite o número:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="tel"
                  inputMode="numeric"
                  aria-label="Número do WhatsApp"
                  placeholder="(11) 98765-4321"
                  value={searchMasked}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  maxLength={15}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none ring-0 focus:border-gray-400"
                />
                <button
                  onClick={handleSearch}
                  disabled={!searchDigits}
                  className="rounded-lg cta-button-color px-4 py-2 font-bold text-whblackite transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Buscar
                </button>
              </div>

              {result && (
                <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
                  <p className="mb-1 text-sm font-semibold">
                    ✅ Número validado com sucesso!
                  </p>
                  <p>
                    <span className="font-semibold">Nome:</span>{' '}
                    {result['Nome do WhatsApp'] ?? result['Nome do WhatsApp ']}
                  </p>
                  <p>
                    <span className="font-semibold">Setor:</span>{' '}
                    {result.Setor ?? result.Setor ?? '-'}
                  </p>
                  <a
                    href={`https://wa.me/${
                      normalizePhone(
                        result['Número do WhatsApp'] ??
                          result['Número do WhatsApp '] ??
                          '',
                      ).digits
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 transition"
                  >
                    💬 Chamar no WhatsApp
                  </a>
                </div>
              )}

              {hasSearched && !result && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                  <p className="text-sm">Nenhum resultado encontrado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
