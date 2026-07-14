import { techniques, techniqueBlocks } from '../data/techniques.js';
import { serviceScripts, memoryLessons, checklists, postureLessons } from '../data/content.js';

export const chapterImages = {
  bandejas: '/assets/editorial/chapter-bandejas.webp',
  pratos: '/assets/editorial/chapter-pratos.webp',
  bebidas: '/assets/editorial/chapter-bebidas.webp',
  mesa: '/assets/editorial/chapter-mesa.webp',
  fluxo: '/assets/editorial/chapter-fluxo.webp',
  recolhimento: '/assets/editorial/chapter-recolhimento.webp',
  postura: '/assets/editorial/chapter-postura.webp',
  comunicacao: '/assets/editorial/chapter-comunicacao.webp',
  refinamento: '/assets/editorial/chapter-refinamento.webp',
  imprevistos: '/assets/editorial/chapter-imprevistos.webp'
};

const scriptImages = {
  'Restaurante movimentado': chapterImages.fluxo,
  'Buffets e eventos': chapterImages.bandejas,
  'Bares e cafeterias': chapterImages.bebidas,
  'Hotéis e café da manhã': chapterImages.refinamento,
  'Mesas grandes e grupos': chapterImages.mesa,
  'Abertura, pico e encerramento': chapterImages.recolhimento
};

const blockDescriptions = {
  bandejas: 'Equilíbrio real, punho estável e transporte seguro sem malabarismo.',
  pratos: 'Pegadas compactas, pratos nivelados e entregas que preservam a apresentação.',
  bebidas: 'Copos, taças e garrafas conduzidos com higiene, controle e discrição.',
  mesa: 'Aproximações fluidas, organização visual e movimentos que respeitam o cliente.',
  fluxo: 'Rotas inteligentes, prioridades claras e ritmo constante sem correr.',
  recolhimento: 'Retirada silenciosa, cargas seguras e preparação elegante da próxima etapa.',
  postura: 'Presença calma, deslocamento controlado e disponibilidade profissional.',
  comunicacao: 'Leitura dos sinais da mesa e comunicação objetiva sem interromper.',
  refinamento: 'Pequenos acabamentos que tornam o serviço visualmente impecável.',
  imprevistos: 'Respostas seguras e organizadas para recuperar o serviço sob pressão.'
};

export function buildDocumentManifest() {
  const pages = [
    { id: 'modules', type: 'modules', title: 'Biblioteca de treinamento', section: 'Meus materiais', image: '/assets/editorial/cover.webp' },
    { id: 'cover', type: 'cover', title: '+200 Técnicas para Servir como um Garçom Profissional', section: 'Módulo principal', image: '/assets/editorial/cover.webp' },
    { id: 'how-to', type: 'how-to', title: 'Como usar este manual', section: 'Módulo principal', image: chapterImages.mesa },
    { id: 'contents', type: 'contents', title: 'Sumário visual', section: 'Módulo principal', image: chapterImages.refinamento },
    { id: 'progress-tracker', type: 'progress', title: 'Meu progresso', section: 'Módulo principal', image: chapterImages.fluxo }
  ];

  techniqueBlocks.forEach((block, chapterIndex) => {
    pages.push({
      id: `chapter-${block.id}`,
      type: 'chapter',
      title: block.name,
      section: `Capítulo ${chapterIndex + 1}`,
      chapterNumber: chapterIndex + 1,
      count: block.count,
      description: blockDescriptions[block.id],
      image: chapterImages[block.id],
      blockId: block.id
    });
    techniques.filter(item => item.blockId === block.id).forEach(item => pages.push({
      id: item.id, type: 'technique', title: item.title, section: block.name,
      chapterNumber: chapterIndex + 1, image: chapterImages[block.id], data: item
    }));
  });

  pages.push({ id: 'scripts-cover', type: 'module-cover', title: '30 Roteiros Práticos de Serviço', section: 'Bônus 01', description: 'Sequências completas para aplicar as técnicas em situações reais.', image: chapterImages.fluxo });
  serviceScripts.forEach((item, index) => pages.push({ id: item.id, type: 'script', title: item.title, section: 'Bônus 01 · Roteiros', image: scriptImages[item.category] ?? chapterImages.fluxo, data: item, itemNumber: index + 1 }));

  pages.push({ id: 'memory-cover', type: 'module-cover', title: 'Memorização e Agilidade no Salão', section: 'Bônus 02', description: 'Organização mental, leitura do salão e retomada de sequência.', image: '/assets/editorial/bonus-memorizacao.webp' });
  memoryLessons.forEach((item, index) => pages.push({ id: item.id, type: 'memory', title: item.title, section: 'Bônus 02 · Memorização', image: '/assets/editorial/bonus-memorizacao.webp', data: item, itemNumber: index + 1 }));

  pages.push({ id: 'checklists-cover', type: 'module-cover', title: 'Checklists, Postura e Presença', section: 'Bônus 03', description: 'Ferramentas para preparar o turno e transmitir segurança no salão.', image: '/assets/editorial/bonus-checklists.webp' });
  checklists.forEach((item, index) => pages.push({ id: item.id, type: 'checklist', title: item.title, section: 'Bônus 03 · Checklists', image: '/assets/editorial/bonus-checklists.webp', data: item, itemNumber: index + 1 }));

  pages.push({ id: 'posture-cover', type: 'module-cover', title: 'Postura e Presença Profissional', section: 'Bônus 03', description: 'Uma presença visualmente segura, serena e elegante.', image: chapterImages.postura });
  postureLessons.forEach((item, index) => pages.push({ id: item.id, type: 'posture', title: item.title, section: 'Bônus 03 · Postura', image: chapterImages.postura, data: item, itemNumber: index + 1 }));
  pages.push({ id: 'certificate', type: 'certificate', title: 'Certificado de Conclusão', section: 'Bônus 04', image: chapterImages.refinamento });

  return pages.map((page, index) => ({ ...page, pageNumber: index + 1 }));
}

export const chapterNavigationSections = techniqueBlocks.map((block, index) => ({
  id: `chapter-${block.id}`,
  label: block.name,
  eyebrow: `CAPÍTULO ${String(index + 1).padStart(2, '0')}`,
  count: block.count
}));

export const navigationSections = [
  { id: 'cover', label: '+200 Técnicas para Servir', eyebrow: 'MÓDULO PRINCIPAL', count: 200 },
  { id: 'scripts-cover', label: '30 Roteiros Práticos', eyebrow: 'BÔNUS 01', count: 30 },
  { id: 'memory-cover', label: 'Memorização e Agilidade', eyebrow: 'BÔNUS 02', count: 12 },
  { id: 'checklists-cover', label: 'Checklists, Postura e Presença', eyebrow: 'BÔNUS 03', count: 25 },
  { id: 'certificate', label: 'Certificado de Conclusão', eyebrow: 'BÔNUS 04' }
];
