export const checkoutLinks = {
  basic: 'CHECKOUT_BASIC_URL',
  complete: 'CHECKOUT_COMPLETE_URL',
  completePopup: 'CHECKOUT_COMPLETE_POPUP_URL',
};

export const audienceCards = [
  ['Começou a pegar serviço sozinho?', 'Você já sabe o básico, mas ainda trava quando aparece uma situação que nunca viu.'],
  ['Já trabalha como encanador?', 'Use como material de consulta quando o defeito foge do que aparece todo dia.'],
  ['Também pega pequenos reparos?', 'Torneira, sifão, vaso, registro, caixa d’água, ralo e outros pontos comuns.'],
  ['Está entrando na profissão?', 'Amplie seu repertório visual enquanto ganha experiência prática no serviço.'],
];

export const deliverablePages = Array.from(
  { length: 9 },
  (_, index) => `/assets/product-pages/page-${String(index + 1).padStart(2, '0')}.png`,
);

export const bonuses = [
  {
    title: '+80 Mapas Visuais de Instalações Hidráulicas',
    text: 'Veja visualmente banheiro, cozinha, caixa d’água, chuveiro, vaso, pia, tanque, registros e outros sistemas.',
    value: 'R$ 47,90',
    image: '/assets/bonuses/bonus-01.png',
  },
  {
    title: 'Guia Visual de Peças e Conexões Hidráulicas',
    text: 'Imagem, nome, função e aplicação das principais peças.',
    value: 'R$ 37,90',
    image: '/assets/bonuses/bonus-02.png',
  },
  {
    title: '+50 Erros Hidráulicos — Certo x Errado',
    text: 'Comparações rápidas mostrando situações incorretas e como deveriam estar.',
    value: 'R$ 32,90',
    image: '/assets/bonuses/bonus-03.png',
  },
  {
    title: 'Guia de Consulta Rápida por Sintoma',
    text: 'Pouca pressão, mau cheiro, vazamento, retorno, barulho e outros sinais organizados para localizar as páginas certas.',
    value: 'R$ 27,90',
    image: '/assets/bonuses/bonus-04.png',
  },
];

export const basicItems = [
  '180 situações hidráulicas',
  'Guia visual organizado por categorias',
  'Consulta rápida pelo celular',
  'Entrega digital imediata',
  'Acesso 100% vitalício',
];

export const completeItems = [
  '+180 Problemas Hidráulicos Explicados com Imagens',
  'Acesso 100% vitalício a todos os materiais',
  '+80 Mapas Visuais de Instalações Hidráulicas',
  'Guia Visual de Peças e Conexões',
  '+50 Erros Hidráulicos — Certo x Errado',
  'Guia de Consulta Rápida por Sintoma',
  'Mais de 300 referências visuais',
  'Consulta por problema e por sintoma',
  'Visão completa das instalações',
  'Identificação mais rápida de peças',
  'Acesso imediato aos 5 materiais',
];

export const faqs = [
  ['É um curso?', 'Não. É um material visual de consulta.'],
  ['Funciona no celular?', 'Sim. O material foi pensado para consulta rápida pelo celular.'],
  ['Como recebo?', 'Digitalmente após a confirmação da compra.'],
  ['O material serve para quem está começando?', 'Sim. Principalmente para quem já está aprendendo ou começando a pegar serviços e quer ampliar o repertório visual.'],
  ['Já sou encanador. Ainda faz sentido?', 'Pode fazer, principalmente como referência de consulta para situações menos comuns.'],
  ['O guia mostra exatamente como consertar tudo?', 'Não. Ele ajuda a reconhecer sinais, entender os componentes envolvidos e saber onde observar. Algumas situações exigem avaliação técnica específica.'],
  ['Quantos problemas existem?', 'São 180 situações no material principal.'],
  ['Qual a diferença entre Básico e Completo?', 'O Básico entrega o material principal. O Completo entrega o principal e todos os quatro materiais extras.'],
  ['Tenho garantia?', 'Sim. Você tem 7 dias para avaliar o material.'],
  ['O material substitui um profissional qualificado?', 'Não. O guia é uma referência visual. Situações com eletricidade, esgoto, gás, altura, grandes vazamentos ou outros riscos exigem cuidado e, quando necessário, profissional habilitado.'],
];
