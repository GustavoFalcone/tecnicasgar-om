import { techniques } from './techniques.js';

export const VISUAL_TYPES = ['ANNOTATED_HERO','CORRECT_VS_WRONG','STEP_SEQUENCE','DETAIL_ZOOM','TOP_VIEW','SERVICE_ROUTE','REAL_SITUATION','VISUAL_CHECKLIST'];

const assetByBlock = {
  bandejas: '/assets/waiter/waiter-tray.png',
  pratos: '/assets/waiter/waiter-three-plates.png',
  bebidas: '/assets/waiter/waiter-serving-drink.png',
  mesa: '/assets/waiter/waiter-positioning-plate.png',
  fluxo: '/assets/waiter/waiter-tray.png',
  recolhimento: '/assets/waiter/waiter-collecting-plates.png',
  postura: '/assets/waiter/waiter-posture-correct.png',
  comunicacao: '/assets/waiter/waiter-positioning-plate.png',
  refinamento: '/assets/waiter/waiter-posture-correct.png',
  imprevistos: '/assets/waiter/waiter-serving-drink.png'
};

const diagramByVisual = {
  ANNOTATED_HERO: 'AnnotationConnector', CORRECT_VS_WRONG: 'CorrectWrongMarker', STEP_SEQUENCE: 'MovementArrows', DETAIL_ZOOM: 'DetailMagnifier',
  TOP_VIEW: 'TablePositionMap', SERVICE_ROUTE: 'ServiceRouteMap', REAL_SITUATION: 'CollectionOrderDiagram', VISUAL_CHECKLIST: 'PostureAlignmentGuide'
};

const calloutsByVisual = {
  ANNOTATED_HERO: ['Centro do gesto','Ponto de apoio','Linha de seguranca'],
  CORRECT_VS_WRONG: ['Evite tensao','Mantenha o eixo','Finalize com controle'],
  STEP_SEQUENCE: ['Prepare','Execute','Confira'],
  DETAIL_ZOOM: ['Detalhe de apoio','Area segura','Acabamento'],
  TOP_VIEW: ['Centro livre','Posicao clara','Area de uso'],
  SERVICE_ROUTE: ['Saida','Prioridade','Retorno'],
  REAL_SITUATION: ['Perceba','Proteja','Retome'],
  VISUAL_CHECKLIST: ['Alinhamento','Higiene','Estabilidade']
};

const featuredTechniqueNumbers = new Set([
  1, 8, 16, 25, 32, 45, 47, 64, 65, 73, 86, 87,
  96, 108, 109, 130, 131, 148, 149, 164, 165, 182, 183, 200
]);

const imagePositions = ['left','right','top','center'];
const titlePositions = ['top-left','top-right','bottom-left','bottom-right'];
const variations = ['full-body','hands','wrist','plates','tray','posture','service-detail','table-detail'];

// This is data only. It intentionally does not alter document or review rendering.
export const techniqueVisualMap = techniques.map((technique, index) => {
  const visualType = VISUAL_TYPES[(index + Math.floor(index / 18)) % VISUAL_TYPES.length];
  const baseDiagram = diagramByVisual[visualType];
  const diagram = technique.blockId === 'bandejas' && visualType === 'TOP_VIEW' ? 'TrayDistributionDiagram'
    : technique.blockId === 'bandejas' && visualType === 'ANNOTATED_HERO' ? 'TrayWeightMap'
    : technique.blockId === 'pratos' ? (visualType === 'TOP_VIEW' ? 'PlateSupportDiagram' : baseDiagram)
    : technique.blockId === 'bebidas' && visualType === 'TOP_VIEW' ? 'GlassPlacementDiagram'
    : baseDiagram;

  return {
    techniqueId: technique.id,
    visualType,
    primaryAsset: assetByBlock[technique.blockId],
    diagram,
    titlePosition: titlePositions[(index + Math.floor(index / 8)) % titlePositions.length],
    imagePosition: imagePositions[(index + Math.floor(index / 5)) % imagePositions.length],
    lightOrDark: (index + Math.floor(index / 11)) % 2 === 0 ? 'light' : 'dark',
    callouts: calloutsByVisual[visualType],
    featuredVisual: featuredTechniqueNumbers.has(technique.number),
    visualVariation: variations[(index + Math.floor(index / 7)) % variations.length]
  };
});
