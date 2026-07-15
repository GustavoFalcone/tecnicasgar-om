import { techniqueVisualMap } from '../../data/techniqueVisualMap.js';

export const EDITORIAL_FAMILIES = ['ANNOTATED_HERO','CORRECT_VS_WRONG','STEP_SEQUENCE','DETAIL_ZOOM','TOP_VIEW','SERVICE_ROUTE','REAL_SITUATION','VISUAL_CHECKLIST'];

export const editorialTechniqueConfigs = [
  { id:'tech-001', family:'ANNOTATED_HERO', theme:'light', position:'left', image:'/assets/waiter/waiter-tray.png', calls:['Centro do peso','Palma estavel','Rota conferida'], avoid:'Carga fora do eixo.' },
  { id:'tech-025', family:'CORRECT_VS_WRONG', theme:'dark', position:'right', image:'/assets/waiter/waiter-three-plates.png', calls:['Punho neutro','Prato nivelado','Dedos livres'], avoid:'Tocar a area do alimento.' },
  { id:'tech-047', family:'STEP_SEQUENCE', theme:'light', position:'top', image:'/assets/waiter/waiter-serving-drink.png', calls:['Segure pela haste','Alinhe a base','Transporte','Apoie com calma'], avoid:'Contato com a borda.' },
  { id:'tech-065', family:'DETAIL_ZOOM', theme:'dark', position:'center', image:'/assets/waiter/waiter-positioning-plate.png', calls:['Ponto de entrada','Distancia segura','Saida limpa'], avoid:'Invadir o espaco da mesa.' },
  { id:'tech-071', family:'TOP_VIEW', theme:'light', position:'right', image:'/assets/waiter/waiter-positioning-plate.png', calls:['Prato central','Copos livres','Talheres alinhados'], avoid:'Bloquear o campo do cliente.' },
  { id:'tech-087', family:'SERVICE_ROUTE', theme:'dark', position:'left', image:'/assets/waiter/waiter-tray.png', calls:['Conferir saida','Definir destino','Evitar cruzamento','Retorno produtivo'], avoid:'Caminhar sem rota.' },
  { id:'tech-183', family:'REAL_SITUATION', theme:'light', position:'center', image:'/assets/waiter/waiter-collecting-plates.png', calls:['Pare','Proteja a area','Sinalize','Retome com seguranca'], avoid:'Ampliar o risco.' },
  { id:'tech-170', family:'VISUAL_CHECKLIST', theme:'dark', position:'top', image:'/assets/waiter/waiter-posture-correct.png', calls:['Linhas alinhadas','Bordas limpas','Composicao equilibrada'], avoid:'Finalizar sem conferir.' },
  { id:'tech-149', family:'ANNOTATED_HERO', theme:'light', position:'top', image:'/assets/waiter/waiter-posture-correct.png', calls:['Observe a distancia','Leia o gesto','Aproxime no momento certo'], avoid:'Interromper sem necessidade.' },
  { id:'tech-131', family:'CORRECT_VS_WRONG', theme:'dark', position:'center', image:'/assets/waiter/waiter-posture-correct.png', compareImage:'/assets/waiter/waiter-posture-wrong.png', calls:['Eixo alinhado','Ombros soltos','Maos neutras'], avoid:'Apoiar-se nos moveis.' },
  { id:'tech-109', family:'STEP_SEQUENCE', theme:'light', position:'left', image:'/assets/waiter/waiter-collecting-plates.png', calls:['Observe a mesa','Confirme a etapa','Recolha por zona','Reorganize'], avoid:'Retirar antes do momento.' },
  { id:'tech-165', family:'DETAIL_ZOOM', theme:'dark', position:'right', image:'/assets/waiter/waiter-three-plates.png', calls:['Varredura visual','Ajuste pontual','Conferencia final'], avoid:'Corrigir tudo de uma vez.' },
  { id:'tech-005', family:'TOP_VIEW', theme:'light', position:'center', image:'/assets/waiter/waiter-tray.png', calls:['Centro preservado','Retirada alternada','Peso redistribuido'], avoid:'Esvaziar um unico lado.' },
  { id:'tech-188', family:'SERVICE_ROUTE', theme:'dark', position:'top', image:'/assets/waiter/waiter-serving-drink.png', calls:['Identifique o gargalo','Abra passagem','Priorize seguranca','Retome a sequencia'], avoid:'Disputar o corredor.' },
  { id:'tech-153', family:'REAL_SITUATION', theme:'light', position:'right', image:'/assets/waiter/waiter-positioning-plate.png', calls:['Perceba o padrao','Confirme o item','Resolva sem ruido'], avoid:'Esperar o cliente reclamar.' },
  { id:'tech-020', family:'VISUAL_CHECKLIST', theme:'dark', position:'left', image:'/assets/waiter/waiter-tray.png', calls:['Carga estavel','Itens separados','Rota livre','Apoio definido'], avoid:'Sair sem conferir.' }
];

export const editorialTechniqueIds = editorialTechniqueConfigs.map(item => item.id);
const mappedTechniqueConfigs = new Map(techniqueVisualMap.map(item => [item.techniqueId, {
  id: item.techniqueId, family: item.visualType, theme: item.lightOrDark, position: item.imagePosition,
  titlePosition: item.titlePosition, image: item.primaryAsset, diagram: item.diagram, calls: item.callouts,
  featuredVisual: item.featuredVisual, visualVariation: item.visualVariation
}]));

export function getEditorialTechniqueConfig(id) { return mappedTechniqueConfigs.get(id) || editorialTechniqueConfigs.find(item => item.id === id) || null; }
