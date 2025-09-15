'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import { AcmeLogo } from '@/components/header/page';

const testimonials = [
  {
    id: 1,
    text: 'Achei que seria complicado, mas foi super fácil indicar! Em menos de um mês consegui ganhar R$200,00 só indicando amigos que estavam procurando uma faculdade!',
    name: 'Camila R.',
    age: 26,
    location: 'Salvador/BA',
    image: '/indicacao/user.webp',
  },
  {
    id: 2,
    text: 'Indiquei meus colegas de trabalho e em poucas semanas já estava com o valor na conta. É uma forma incrível de ajudar quem precisa estudar e ainda ser recompensado por isso!',
    name: 'Felipe T.',
    age: 31,
    location: 'São Paulo/SP',
    image: '/indicacao/user.webp',
  },
  {
    id: 3,
    text: 'Muito obrigado(a) pela indicação à Úniunica! Desde que fui apresentado a essa forma de indicar meus amigos pelo Wanderson, para meus amigos os cursos da faculdade UNIÚNICA e eu ainda ganhando um valor para poder estar indicando eles , ajuda bastante no mês.',
    name: 'Rafael Magno',
    age: 27,
    location: 'Belo Horizonte/MG',
    image: '/indicacao/user.webp',
  },
  {
    id: 4,
    text: 'Nunca pensei que algo tão simples poderia render uma renda extra real! O app facilita tudo e dá pra acompanhar direitinho o andamento das indicações.',
    name: 'Rafael C.',
    age: 23,
    location: 'Curitiba/PR',
    image: '/indicacao/user.webp',
  },
  {
    id: 5,
    text: 'O programa é transparente, fácil de usar e confiável. Hoje já sou embaixadora oficial e me sinto valorizada por cada indicação feita.',
    name: 'Patrícia S.',
    age: 34,
    location: 'Fortaleza/CE',
    image: '/indicacao/user.webp',
  },
  {
    id: 6,
    text: 'Consegui ajudar meu primo a se matricular e ainda ganhei R$50,00 pela indicação. Já estou indicando mais amigos, é dinheiro fácil e honesto!',
    name: 'Diego F.',
    age: 27,
    location: 'Recife/PE',
    image: '/indicacao/user.webp',
  },
  {
    id: 7,
    text: 'É um excelente programa, as pessoas que fecharam o curso deram feedback positivo, estão tendo todo suporte necessário, sou aluna da instituição e so tenho elogios. Da pra fazer uma renda extra sim, o pagamento cai certinho, vou continuar indicando',
    name: 'DAYANE FAGUNDES SILVA',
    age: 34,
    location: 'Coronel Fabriciano/MG  ',
    image: '/indicacao/user.webp',
  },
  {
    id: 8,
    text: 'Com poucos cliques consegui enviar minha indicação e tudo foi muito rápido! Vi meu amigo se matricular e logo depois recebi a recompensa. Simples, prático e ainda ajudo quem está começando.',
    name: 'Juliana M.',
    age: 29,
    location: 'Manaus/AM',
    image: '/indicacao/user.webp',
  },
  {
    id: 9,
    text: 'Já indiquei três colegas e todos conseguiram se matricular. A melhor parte é que acompanhei tudo pela plataforma e vi quando meu saldo foi liberado. Recomendo demais!',
    name: 'Bruno A.',
    age: 32,
    location: 'Goiânia/GO',
    image: '/indicacao/user.webp',
  },
];

const faqData = [
  {
    question: '1. O que é o Programa de Embaixadores?',
    answer:
      'É uma iniciativa do Centro Universitário UNIÚNICA que recompensa você por indicar novos alunos para nossos cursos! A cada indicação válida, você recebe R$ 50,00.',
  },
  {
    question: '2. O que é uma indicação válida?',
    answer:
      'Uma indicação é considerada válida quando o indicado realiza o pagamento da taxa de matrícula e não cancela o curso dentro de 7 dias, conforme prevê o Código de Defesa do Consumidor.',
  },
  {
    question: '3. Como cadastrar meus dados bancários?',
    answer: (
      <>
        Acesse a plataforma. <br />
        No topo da tela, clique no ícone "...". <br />
        Selecione "Meu Perfil". <br />
        <Image src="/indicacao/faq-1.png" alt="teste" width={300} height={300} />
        Role até a seção "Dados Bancários" e preencha com atenção, pois essas
        informações serão usadas para o pagamento da sua recompensa.
        <Image src="/indicacao/faq-2.png" alt="teste" width={400} height={400} />
      </>
    ),
  },
  {
    question: '4. Quais cursos posso indicar?',
    answer: (
      <>
        Você pode indicar alunos para as seguintes modalidades:
        <br />- Graduação EaD <br />- Graduação Presencial <br />- Pós-Graduação
        EaD <br />- Segunda Graduação EaD <br />- Disciplina Isolada EaD
      </>
    ),
  },
  {
    question: '5. Qual o valor da premiação?',
    answer: 'Você recebe R$ 50,00 por cada indicação válida.',
  },
  {
    question: '6. Como recebo minha recompensa?',
    answer: (
      <>
        Siga o passo a passo:
        <br />
        1. Acesse a plataforma:{' '}
        <a
          href="https://uniunica.edu.br/indicacao"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://uniunica.edu.br/indicacao
        </a>
        <br />
        2. Cadastre seus dados bancários <br />
        <Image src="/indicacao/faq-3.png" alt="teste" width={500} height={500} />
        3. Acompanhe o status da sua indicação pela aba Notificações <br />
        <Image src="/indicacao/faq-4.png" alt="teste" width={500} height={500} />
        4. Quando o status mudar para "Pago", o valor será transferido para sua
        conta e você receberá o comprovante de pagamento.
      </>
    ),
  },
  {
    question: '7. Em quanto tempo o pagamento é feito?',
    answer:
      'O pagamento é realizado em até 10 dias úteis, considerando: 7 dias corridos para o prazo de Cancelamento (CDC) e até 3 dias úteis para o processamento do pagamento.',
  },
  {
    question: '8. Onde vejo se meu pagamento foi negado?',
    answer: (
      <>
        Você será notificado na plataforma. Basta acessar o ícone do sino de
        notificações. O status da indicação também será atualizado para
        "Recusado"
        <Image src="/indicacao/faq-4.png" alt="teste" width={500} height={500} />
      </>
    ),
  },
  {
    question: '9. Como alterar meu endereço?',
    answer: (
      <>
        Clique no ícone "..." no topo da tela. Acesse "Meu Perfil"
        <br />
        <br />
        <Image src="/indicacao/faq-1.png" alt="teste" width={300} height={300} />
        <br />e role até a opção "Endereço" para atualizar.
        <br />
        <br />
        <Image src="/indicacao/faq-9.png" alt="teste" width={600} height={500} />
      </>
    ),
  },
  {
    question: '10. Como alterar meus dados bancários?',
    answer: (
      <>
        Siga o mesmo processo: acesse o ícone "...", clique em "Meu Perfil"
        <br />
        <Image src="/indicacao/faq-1.png" alt="teste" width={300} height={300} />
        <br />e vá até a seção "Dados Bancários" para atualizar.
        <br />
        <br />
        <Image src="/indicacao/faq-5.png" alt="teste" width={500} height={500} />
      </>
    ),
  },
  {
    question: '11. Onde encontro o comprovante de pagamento?',
    answer: (
      <>
        No ícone do sino de notificações, localize a notificação com o status
        "Pago". Ao clicar nela, você terá acesso ao comprovante.
        <Image src="/indicacao/faq-4.png" alt="teste" width={500} height={500} />
      </>
    ),
  },
  {
    question: '12. Como indicar usando meu site personalizado?',
    answer: (
      <>
        Acesse "Meu Perfil".
        <Image src="/indicacao/faq-1.png" alt="teste" width={300} height={300} />
        Clique no ícone 🌐 abaixo da sua foto de perfil.
        <Image src="/indicacao/faq-6.png" alt="teste" width={500} height={500} />
        Copie o link do seu site e compartilhe com os seus amigos!
      </>
    ),
  },
  {
    question:
      '13. Como funcionam as indicações feitas pelo site personalizado?',
    answer:
      'Quando o indicado se matricula por meio do seu link, a indicação é automaticamente vinculada a você. Importante: Oriente o indicado a usar apenas o seu link na hora da matrícula.',
  },
  {
    question: '14. Em quais casos eu não recebo pela indicação?',
    answer: (
      <>
        Você não será elegível à recompensa no seguinte caso:
        <br />
        Se o indicado já tiver matrícula ativa na UNIÚNICA
      </>
    ),
  },
  {
    question: '15. Como ganhar meu kit personalizado? 🎁',
    answer:
      'Ao completar 10 indicações bem-sucedidas, entre em contato com o Suporte do Programa de Embaixadores para solicitar o seu kit.',
  },
  {
    question: '16. Onde acompanho minhas indicações?',
    answer: (
      <>
        Acesse:{' '}
        <a
          href="https://indicacao.uniunica.edu.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://indicacao.uniunica.edu.br/
        </a>
        <br />
        Lá você pode acompanhar todas as indicações feitas e o status de cada
        uma.
        <Image src="/indicacao/faq-7.png" alt="teste" width={500} height={500} />
      </>
    ),
  },
  {
    question: '17. Onde realizar novas indicações?',
    answer: (
      <>
        No mesmo link da plataforma:{' '}
        <a
          href="https://indicacao.uniunica.edu.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://indicacao.uniunica.edu.br/
        </a>
        <br />
        Depois é só clicar em "Nova Indicação", preencher os dados do indicado e
        acompanhar o status.
        <Image src="/indicacao/faq-8.png" alt="teste" width={500} height={500} />
      </>
    ),
  },
  {
    question:
      '18. Se eu indicar um aluno, recebo por todos os cursos que ele se matricular ou apenas por uma matrícula?',
    answer:
      'Você receberá apenas uma premiação por CPF, independentemente da quantidade de cursos que o indicado realizar a matrícula. Exemplo: se o seu indicado se matricular em dois ou mais cursos ao mesmo tempo, você receberá apenas uma vez a recompensa referente a esse aluno.',
  },
  {
    question: '19. Contato de Suporte ao Embaixador',
    answer: (
      <>
        Se tiver qualquer dúvida não respondida neste FAQ, entre em contato
        pelos números:
        <br />
        📞 (31) 7560-0076 <br />
        📞 (31) 9429-0130
      </>
    ),
  },
];

export default function NewIndication() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [modalContent, setModalContent] = useState<null | {
    name: string;
    text: string;
  }>(null);
  const { theme } = useTheme();
  const bgTheme = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openModal = (testimonial: { name: string; text: string }) => {
    setModalContent(testimonial);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleOpenModal = () => {
    onOpen();
  };

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerSlide(1);
      } else if (width < 1024) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);

    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  function toggleIndex(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % totalSlides);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, totalSlides]);

  const handleSlideChange = (newSlide: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(newSlide);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    handleSlideChange(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    handleSlideChange(newSlide);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    const newSlide = (currentSlide + 1) % totalSlides;
    handleSlideChange(newSlide);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return testimonials.slice(startIndex, startIndex + cardsPerSlide);
  };
  return (
    <>
      <section className="relative w-full">
  <div className="block md:hidden relative w-full h-[500px]">
   <Image src="/indicacao/bg-indicacao-mobile.webp" alt="Imagem mobile" className="w-full h-full object-cover object-[0_30%]" fill priority />
    <div className="absolute bottom-0 left-0 w-full h-[80vh] bg-gradient-to-t from-[#391466] to-transparent z-10 pointer-events-none" />
  </div>

  <div className="hidden md:block relative w-full h-[80vh]">
    <Image src="/indicacao/bg-indicacao.webp" alt="Imagem de fundo desktop" className="w-full h-full object-cover object-left" fill priority />
    <div className="absolute inset-0 bg-gradient-to-r from-[#391466] via-[#7228cc]/75" />
  </div>

<div className="absolute inset-0 z-20 flex items-center justify-center">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-6 text-white">
    <div className="lg:col-span-12 col-span-5 flex flex-col justify-center font-poppins">
      <div className="flex justify-center md:justify-start">
        <AcmeLogo />
      </div>

      <p className="text-4xl hidden lg:block lg:text-6xl mt-3 font-krona leading-tight">
        Indicação <br /> Premiada
      </p>
      <p className="text-[27px] mt-3 mb-3 lg:hidden font-krona">
        Indicação Premiada
      </p>

      <span className="fontPoppinsONDAROXA text-xl block mt-2">
        Realize indicações e receba <b>R$ 50,00</b> por cada matrícula.
      </span>

      <button
        onClick={handleOpenModal}
        className="w-full md:w-[430px] h-12 md:h-14 mt-5 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full"
      >
        QUERO INDICAR
      </button>
    </div>
  </div>
</div>

      </section>
      <section className="w-full py-16 bg-[#391466]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12 font-Krona">
            Benefícios Exclusivos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div
              className="relative w-full min-h-[350px] lg:min-h-[500px] rounded-2xl overflow-hidden flex flex-col items-start justify-start p-6"
              style={{
                backgroundImage: "url('/indicacao/card.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h3 className="text-[15px] lg:text-[18px] hidden lg:block mt-10 font-bold text-white fontPoppinsONDAROXA mb-4">
                GANHOS POR <br /> INDICAÇÃO
              </h3>
              <h3 className="block lg:hidden text-[15px] lg:text-[18px] mt-10 font-bold text-white fontPoppinsONDAROXA mb-4">
                GANHOS POR INDICAÇÃO
              </h3>
              <p className="text-white text-start text-lg fontPoppinsONDAROXA">
                Ganhe R$ 50,00 por indicação e faça uma renda extra com
                liberdade e autonomia!
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="relative w-full min-h-[350px] lg:min-h-[500px] rounded-2xl overflow-hidden flex flex-col items-start justify-start p-6"
              style={{
                backgroundImage: "url('/indicacao/card.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h3 className="text-[15px] lg:text-[18px] mt-10 font-bold text-white fontPoppinsONDAROXA mb-4">
                KIT EXCLUSIVO DA INSTITUIÇÃO
              </h3>
              <p className="text-white text-start text-lg fontPoppinsONDAROXA">
                Ao acumular 10 indicações bem-sucedidas, você ganha um kit
                exclusivo!
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="relative w-full min-h-[350px] lg:min-h-[500px] rounded-2xl overflow-hidden flex flex-col items-start justify-start p-6"
              style={{
                backgroundImage: "url('/indicacao/card.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h3 className="text-[15px] lg:text-[18px] mt-10 font-bold text-white fontPoppinsONDAROXA mb-4">
                SUPORTE PERSONALIZADO
              </h3>
              <p className="text-white text-start text-lg fontPoppinsONDAROXA">
                Conte com um suporte personalizado, com dicas práticas,
                orientações e acompanhamento para você se tornar um verdadeiro
                Embaixador de Sucesso!
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="relative w-full min-h-[350px] lg:min-h-[500px] rounded-2xl overflow-hidden flex flex-col items-start justify-start p-6"
              style={{
                backgroundImage: "url('/indicacao/card.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h3 className="text-[15px] lg:text-[18px] mt-10 font-bold text-white fontPoppinsONDAROXA mb-4">
                PLATAFORMA DE ACOMPANHAMENTO
              </h3>
              <p className="text-white  text-start text-lg fontPoppinsONDAROXA">
                Tenha acesso a uma plataforma prática onde você pode acompanhar,
                em tempo real, o status de cada uma das suas indicações.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <button
            onClick={handleOpenModal}
            className="w-[400px] h-12 md:h-14 text-[17px] lg:text-lg mt-5 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full flex items-center justify-center"
          >
            QUERO INDICAR
          </button>
        </div>
      </section>
      <section className="w-full py-16 px-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/30 to-purple-600/30 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-800/50 rounded-full p-3 flex items-center space-x-2">
                    <div className="w-8 h-4 bg-purple-400 rounded-full relative">
                      <div className="w-4 h-4 bg-purple-200 rounded-full absolute right-0"></div>
                    </div>
                  </div>
                </div>
                <div className="text-white text-xl fontPoppinsONDAROXA">
                  Mais de <b>5,700</b> embaixadores já foram recompensados
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-800/50 rounded-full p-3 flex items-center space-x-2">
                    <div className="w-8 h-4 bg-purple-400 rounded-full relative">
                      <div className="w-4 h-4 bg-purple-200 rounded-full absolute right-0"></div>
                    </div>
                  </div>
                </div>
                <div className="text-white text-xl fontPoppinsONDAROXA">
                  Plataforma para acompanhar as indicações
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-8 h-8 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-white fontPoppinsONDAROXA">
                  <p className="text-lg md:text-xl font-medium">
                    <span className="font-bold text-2xl">4.9/5</span>
                  </p>
                  <p className="text-lg md:text-xl font-medium">
                    Mais de <span className="font-bold">1000</span> avaliações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleOpenModal}
            className="w-full md:w-[430px] h-12 md:h-14 text-[17px] lg:text-lg mt-5 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full flex items-center justify-center"
          >
            QUERO INDICAR
          </button>
        </div>
      </section>
      <section className="w-full py-16 px-4 bg-gradient-to-br bg-[#391466]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ">
            <div className="flex flex-col items-center  text-left leading-tight">
              <h2 className="text-xl lg:text-3xl font-Krona font-bold text-white">
                Como se cadastrar no
              </h2>
              <span className="text-[#8f33ff] font-Krona text-xl lg:text-3xl font-bold text-center lg:text-left">
                Programa de Indicação
              </span>

              <div className="w-full mt-3 flex flex-col items-center">
                <div className="max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg w-full flex justify-center items-center">
                  <iframe
                    src="https://player.vimeo.com/video/1092605535?h=85d15174bb"
                    width="95%"
                    height="95%"
                    allow="autoplay; picture-in-picture"
                    allowFullScreen
                    className="w-[91%] h-[95%] items-center justify-center flex text-center"
                  ></iframe>
                </div>

                <button
                  onClick={handleOpenModal}
                  className="w-full md:w-[430px] hidden h-12 md:h-14 text-lg mt-4 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full lg:flex items-center justify-center"
                >
                  QUERO INDICAR
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full gap-4">
                <div className="border-2 lg:hidden border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex items-start gap-4 min-w-[170px]">
                      <Image src="/indicacao/u1.webp" alt="u1" width={65} height={65} />
                      <h3 className="text-[15px] items-center lg:text-2xl font-bold text-white">
                        Cadastre-se gratuitamente
                      </h3>
                    </div>
                    <p className="text-purple-100 text-base lg:text-lg text-center mt-2 lg:mt-0">
                      <Link
                        href="https://front-indication-mkt.vercel.app/signup"
                        className="cursor-pointer border-b-2"
                        target="_blank"
                      >
                        Crie sua conta de forma rápida
                      </Link>{' '}
                      e comece a acompanhar suas indicações em tempo real.
                    </p>
                  </div>
                </div>

                <div className="border-2 hidden lg:block border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 items-center justify-center ">
                      <Image src="/indicacao/u1.webp" alt="u1" width={100} height={100} />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        Cadastre-se gratuitamente
                      </h3>
                      <p className="text-purple-100 text-base lg:text-lg">
                        <Link
                          href="https://indicacao.uniunica.edu.br/signin"
                          className="cursor-pointer border-b-2"
                          target="_blank"
                        >
                          Crie sua conta de forma rápida
                        </Link>{' '}
                        e comece a acompanhar suas indicações em tempo real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="border-2 lg:hidden border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Imagem + título alinhados ao topo e à esquerda */}
                    <div className="flex items-start gap-4 min-w-[170px]">
                      <Image src="/indicacao/u2.webp" alt="u1" width={65} height={65} />
                      <h3 className="text-[16px] lg:text-2xl font-bold text-white">
                        Complete seus dados
                      </h3>
                    </div>
                    {/* Parágrafo justificado e abaixo */}
                    <p className="text-purple-100 text-base lg:text-lg text-center mt-2 lg:mt-0">
                      Preencha suas informações pessoais para que o pagamento da
                      sua recompensa seja feito com segurança e sucesso.
                    </p>
                  </div>
                </div>
                <div className="border-2 hidden lg:block border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image src="/indicacao/u2.webp" alt="u2" width={100} height={100} />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        Complete seus dados
                      </h3>
                      <p className="text-purple-100 text-base lg:text-lg">
                        Preencha suas informações pessoais para que o pagamento
                        da sua recompensa seja feito com segurança e sucesso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="border-2 lg:hidden border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Imagem + título alinhados ao topo e à esquerda */}
                    <div className="flex items-start gap-4 min-w-[170px]">
                      <Image src="/indicacao/u3.webp" alt="u1" width={65} height={65} />
                      <h3 className="text-[15px] lg:text-2xl font-bold text-white">
                        Faça sua primeira indicação
                      </h3>
                    </div>
                    {/* Parágrafo justificado e abaixo */}
                    <p className="text-purple-100 text-base lg:text-lg text-center mt-2 lg:mt-0">
                      Acesse a opção "Nova indicação", informe os dados do
                      indicado e o curso de interesse. Quanto mais indicar, mais
                      recompensas você ganha!
                    </p>
                  </div>
                </div>
                <div className="border-2 hidden lg:block border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image src="/indicacao/u3.webp" alt="u3" width={100} height={100} />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        Faça sua primeira indicação
                      </h3>
                      <p className="text-purple-100 text-base lg:text-lg mb-3">
                        Acesse a opção "Nova indicação", informe os dados do
                        indicado e o curso de interesse. Quanto mais indicar,
                        mais recompensas você ganha!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="border-2 lg:hidden border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Imagem + título alinhados ao topo e à esquerda */}
                    <div className="flex items-start gap-4 min-w-[170px]">
                      <Image src="/indicacao/u4.webp" alt="u1" width={65} height={65} />
                      <h3 className="text-[16px] lg:text-2xl font-bold text-white">
                        Receba sua recompensa
                      </h3>
                    </div>
                    {/* Parágrafo justificado e abaixo */}
                    <p className="text-purple-100 text-base lg:text-lg text-center mt-2 lg:mt-0">
                      Acompanhe o status da sua indicação e veja quando os
                      R$50,00 serão depositados diretamente na sua conta.
                    </p>
                  </div>
                </div>
                <div className="border-2 hidden lg:block border-purple-400/30 rounded-2xl p-6 bg-purple-800/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image src="/indicacao/u4.webp" alt="u4" width={100} height={100} />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        Receba sua recompensa
                      </h3>
                      <p className="text-purple-100 text-base lg:text-lg mb-3">
                        Acompanhe o status da sua indicação e veja quando os
                        R$50,00 serão depositados diretamente na sua conta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="w-full md:w-[430px] lg:hidden h-12 md:h-14 text-[17px] lg:text-lg mt-4 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full flex items-center justify-center"
        >
          QUERO INDICAR
        </button>
      </section>
      <section className="w-full py-16 px-4 bg-gradient-to-br from-[#391466] via-purple-700 to-purple-800">
        <div className="max-w-7xl w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-Krona">
              O que nossos usuários dizem
            </h2>
            <p className="text-lg md:text-xl text-purple-100 fontPoppinsONDAROXA">
              Histórias reais de quem já está ganhando com indicações
            </p>
          </div>
          <div className="relative">
            <div className="mx-4 md:mx-16 overflow-hidden">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? 'opacity-0 transform translate-y-4'
                    : 'opacity-100 transform translate-y-0'
                }`}
              >
                {getCurrentTestimonials().map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`bg-white rounded-2xl p-6 shadow-2xl transform transition-all duration-500 ease-in-out border-2 border-purple-400/20 hover:border-purple-400/40 hover:shadow-purple-500/20 h-full min-h-[320px] flex flex-col justify-between`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="mb-4">
                      <svg
                        className="w-8 h-8 text-[#8f33ff]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base fontPoppinsONDAROXA line-clamp-4">
                      {testimonial.text}
                    </p>

                    {testimonial.text.length > 150 && (
                      <button
                        onClick={() => openModal(testimonial)}
                        className="text-purple-700 font-semibold text-sm underline"
                      >
                        Ler mais
                      </button>
                    )}

                    <div className="flex items-center space-x-3">
                      <Image
                        src={testimonial.image || '/indicacao/user.webp'}
                        width={100}
                        height={100}
                        alt={`Foto de ${testimonial.name}`}
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#8f33ff]/30 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate fontPoppinsONDAROXA">
                          {testimonial.name}, {testimonial.age} anos
                        </p>
                        <p className="text-gray-600 text-xs truncate fontPoppinsONDAROXA">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {modalContent && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-2xl relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    >
                      ✕
                    </button>
                    <h3 className="text-lg font-bold text-purple-800 mb-4">
                      {modalContent.name} disse:
                    </h3>
                    <p className="text-gray-700 fontPoppinsONDAROXA whitespace-pre-wrap">
                      {modalContent.text}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6 space-x-8 md:hidden">
              <button
                onClick={goToPrevious}
                disabled={isAnimating}
                className="text-white p-3 rounded-full transition-all duration-200 bg-purple-700 hover:bg-purple-600"
                aria-label="Depoimentos anteriores"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                disabled={isAnimating}
                className="text-white p-3 rounded-full transition-all duration-200 bg-purple-700 hover:bg-purple-600"
                aria-label="Próximos depoimentos"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="hidden md:block absolute left-[-65px] top-1/2 -translate-y-1/2 z-10 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Depoimentos anteriores"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="hidden md:block absolute right-[-65px] top-1/2 -translate-y-1/2 z-10 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Próximos depoimentos"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 border ${
                    index === currentSlide
                      ? 'bg-[#8f33ff] border-[#8f33ff] scale-125'
                      : 'bg-white/50 border-white/50 hover:bg-white/70 hover:border-white/70'
                  }`}
                  aria-label={`Ir para grupo de depoimentos ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleOpenModal}
            className="w-full md:w-[430px] h-12 md:h-14 text-[17px] lg:text-lg mt-5 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full flex items-center justify-center"
          >
            QUERO INDICAR
          </button>
        </div>
      </section>
      <section className="bg-[#391466] text-white py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center">
            <h2 className="text-3xl font-bold mb-8 font-Krona">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-4 container">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-purple-700 rounded-md overflow-hidden transition-all duration-300 ease-in-out"
              >
                <button
                  className="w-full text-left px-3 py-3 bg-white transition-colors duration-300 ease-in-out  focus:outline-none flex justify-between items-center"
                  onClick={() => toggleIndex(index)}
                >
                  <span className="font-medium text-black">
                    {item.question}
                  </span>
                  <span className="ml-4 text-2xl text-black select-none">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`px-5 bg-gray-300 font-medium text-black whitespace-pre-line text-sm overflow-hidden transition-all duration-300 ease-in-out`}
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0',
                    opacity: openIndex === index ? 1 : 0,
                    paddingTop: openIndex === index ? '1rem' : '0',
                    paddingBottom: openIndex === index ? '1rem' : '0',
                  }}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <button
            onClick={handleOpenModal}
            className="w-full md:w-[430px] h-12 md:h-14 text-[17px] lg:text-lg mt-5 text-black font-bold p-3 bg-yellow-500 animate-jump rounded-full flex items-center justify-center"
          >
            QUERO INDICAR
          </button>
        </div>
      </section>
      <section className="w-full bg-gradient-to-br  px-4 py-8 from-[#391466] via-purple-700 to-purple-800">
          <div className=" text-white fontPoppinsONDAROXA font-medium text-lg flex items-center justify-center">
            <Link
              href="https://storage.googleapis.com/sites-grupo-prominas/faculdade-unica/_REGULAMENTO%20_%20PREMIA%C3%83%C2%87%C3%83%C2%83O%20DO%20EMBAIXADOR%20ATUALIZADO%20%20(4)_2025_06_17-17_16_07_550.pdf"
              target="_blank"
            >
              Ver regulamento
            </Link>
          </div>
      </section>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className={`${bgTheme} teste----teste`}
      >
        <ModalContent>
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
                {/* por enquanto vou deixar vazio até subir todas as branchs e ir atualizando os formulários */}
              {/* <HubSpotFormIndicacao
                cursoModalidade={'indicacao'}
                formTitle={'Dê o primeiro passo para o sucesso profissional'}
                onFormSubmit={() => {}}
                formId="aee78ec4-faac-4c62-a795-22c964062cd9"
                curso={{ modality: 'indicacao' }}
              /> */}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
