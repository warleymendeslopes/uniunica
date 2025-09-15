'use client'
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone } from "lucide-react";
import GridUniUnica from "@/template/grid";
import { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useTheme } from "next-themes";
import { IoEnterOutline } from 'react-icons/io5';
import QRcodeEMEC from "../IconsSVG/qrcodeEMEC/qrcode";
import { PageRoute, RedesSociais } from "@/utils/enum";
import { PartnerProvider, usePartner } from "@/context/PartnerContext";


interface CertificateResponse {
  code: number;
  data: {
    dataStudent: { name: string };
    dataCourse: { certifier: string; courseType: string; course: string };
    _id: string;
    type: string;
    accessCode: string;
    linkStorage: string;
    id: string;
  };
  message: string;
  metadata: { responseAt: string; method: string; route: string };
}

export default function FooterSiteUniUnica() {
  const [certificateCode, setCertificateCode] = useState('');
  const [certificate, setCertificate] = useState<CertificateResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const bgTheme = theme === 'light' ? 'bg-white' : 'bg-neutral-900';
  const textTheme = theme === 'light' ? 'text-neutral-800' : 'text-neutral-100';
  const subTextTheme = theme === 'light' ? 'text-neutral-600' : 'text-neutral-300';
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { partnerData } = usePartner();

  const handleVerifyCertificate = async () => {
    if (!certificateCode.trim()) {
      setError('Por favor, digite o código do certificado.');
      setIsOpen(true);
      return;
    }
    setIsLoading(true);
    setError('');
    setCertificate(null);
    try {
      const response = await fetch(`/api/certify/${encodeURIComponent(certificateCode)}`);
      if (!response.ok) throw new Error('Certificado não encontrado');
      const data = await response.json();
      setCertificate(data);
      setIsOpen(true);
    } catch {
      setError('Não foi possível verificar o certificado. Por favor, tente novamente.');
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleVerifyCertificate();
  };

  const onOpenChange = (open: boolean) => setIsOpen(open);

  const renderCertificateContent = () => {
    if (error) return <div className="text-red-500 mb-2" role="alert">{error}</div>;
    if (!certificate) return <div className={subTextTheme}>Nenhum certificado encontrado.</div>;
    return (
      <div className="space-y-4">
        <div>
          <h3 className={`font-semibold ${textTheme}`}>Dados do Aluno</h3>
          <p className={textTheme}>{certificate.data.dataStudent.name}</p>
        </div>
        <div>
          <h3 className={`font-semibold ${textTheme}`}>Dados do Curso</h3>
          <div className="space-y-1">
            <p className={textTheme}><span className="font-semibold">Curso:</span> {certificate.data.dataCourse.course}</p>
            <p className={textTheme}><span className="font-semibold">Tipo:</span> {certificate.data.dataCourse.courseType}</p>
            <p className={textTheme}><span className="font-semibold">Certificador:</span> {certificate.data.dataCourse.certifier}</p>
          </div>
        </div>
        <div>
          <h3 className={`font-semibold ${textTheme}`}>Informações do Certificado</h3>
          <div className="space-y-1">
            <p className={textTheme}><span className="font-semibold">Código de Acesso:</span> {certificate.data.accessCode}</p>
            <p className={textTheme}><span className="font-semibold">Tipo:</span> {certificate.data.type}</p>
          </div>
        </div>
        {certificate.data.linkStorage && (
          <div className="pt-2">
            <a
              href={certificate.data.linkStorage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#7500FF] hover:bg-[#6000CC] text-white transition"
            >
              Visualizar Certificado
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <GridUniUnica cols="12" className="bg-neutral-900 w-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-lg text-white">Baixe nosso App</h3>
                <div className="flex items-center gap-4">
                  <Link href="#" aria-label="Baixar na Google Play">
                    <Image src="/icons/google-play.svg" alt="Google Play" width={170} height={52} loading="lazy" className="rounded-lg shadow-sm" />
                  </Link>
                  <Link href="#" aria-label="Baixar na App Store">
                    <Image src="/icons/app-store.svg" alt="App Store" width={170} height={52} loading="lazy" className="rounded-lg shadow-sm" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="certificate-code" className="mb-2 block text-neutral-200">
                  Consulte se seu certificado é válido:
                </label>
                <div className="relative max-w-md">
                  <input
                    type="text"
                    id="certificate-code"
                    placeholder="Digite o código do seu certificado"
                    className="w-full rounded-xl bg-white text-neutral-900 placeholder-neutral-500 pr-12 pl-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7500FF]"
                    value={certificateCode}
                    onChange={(e) => setCertificateCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCertificate}
                    disabled={isLoading}
                    className={`absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-10 w-10 rounded-lg transition ${isLoading ? 'bg-[#7500FF]/60 cursor-not-allowed' : 'bg-[#7500FF] hover:bg-[#6000CC]'} text-white`}
                  >
                    <IoEnterOutline className="h-5 w-5" />
                  </button>
                </div>
                {error && (
                  <span className="mt-2 block text-sm text-red-400">{error}</span>
                )}
              </div>
              {
                partnerData?.agency ? (
                  null
                ) : (
                  <div className="flex flex-row gap-3 text-white mt-6 text-xs lg:text-base">
                    <Link href={RedesSociais.facebook} aria-label="Facebook" className="flex items-center gap-2 hover:text-[#6424b3] transition">
                      <Facebook className="w-5 h-5" /> Facebook
                    </Link>
                    <Link href={RedesSociais.instagram} aria-label="Instagram" className="flex items-center gap-2 hover:text-[#6424b3] transition">
                      <Instagram className="w-5 h-5" /> Instagram
                    </Link>
                    <Link href={RedesSociais.youtube} aria-label="YouTube" className="flex items-center gap-2 hover:text-[#6424b3] transition">
                      <Youtube className="w-5 h-5" /> YouTube
                    </Link>
                    <Link href="tel:+5531999999999" aria-label="Telefone" className="flex items-center gap-2 hover:text-[#6424b3] transition">
                      <Phone className="w-5 h-5" /> 0800 724 2300
                    </Link>
                  </div>
                )
              }
            </div>

            <section className="flex flex-col md:flex-row items-center justify-center  gap-6">
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <p className="text-white text-2xl font-bold leading-snug">
                  Consulte aqui o cadastro da Instituição no <br /> Sistema e-MEC
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src="/faculdade-footer-e-mec.svg"
                    alt="e-MEC"
                    width={80}
                    height={80}
                    className="h-10 w-auto md:h-12"
                  />
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="bg-neutral-800 flex flex-col items-center justify-center rounded-2xl shadow-md p-4 text-center md:min-w-[260px]">
                  <h4 className="text-white/90 font-bold text-base font-poppins leading-5 mb-3">
                    Centro Universitário Única - UNIUNICA
                  </h4>
                  <QRcodeEMEC />
                </div>
              </div>
            </section>
          </div>

          <div className="my-8 border-t border-white" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-white ">
              <li><Link href={PageRoute.teste_vocacional} target="_blank" className="hover:text-white transition">Teste vocacional</Link></li>
              <li><Link href={PageRoute.embaixador} target="_blank" className="hover:text-white transition">Seja um embaixador</Link></li>
              <li><Link href="/privacidade" className="hover:text-white transition">Privacidade</Link></li>
              <li><Link href={PageRoute.relatorio_transparencia_cf} target="_blank" className="hover:text-white transition">Transparência — CF</Link></li>
              <li><Link href={PageRoute.relatorio_transparenia_ipa} target="_blank" className="hover:text-white transition">Transparência — Ipatinga</Link></li>
              <li><Link href={PageRoute.ppc} target="_blank" className="hover:text-white transition">PPC</Link></li>
              <li><Link href="/validador-numero" className="hover:text-white transition">Validador de Número</Link></li>
            </ul>
          </div>
        </div>
      </GridUniUnica>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" className={bgTheme}>
        <ModalContent>
          <>
            <ModalHeader>
              <div className={`text-lg font-semibold ${textTheme}`}>
                {error ? 'Erro na Verificação' : 'Certificado'}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="py-2">{renderCertificateContent()}</div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
