import React from 'react';
import { familyComponents } from './EditorialFamilies.jsx';
import { getEditorialTechniqueConfig } from './editorialRegistry.js';
import { featuredHeadlines } from './featuredEditorial.js';
import './editorial.css';

const familyNames = { ANNOTATED_HERO:'Imagem anotada', CORRECT_VS_WRONG:'Certo x errado', STEP_SEQUENCE:'Sequencia visual', DETAIL_ZOOM:'Detalhes ampliados', TOP_VIEW:'Vista superior', SERVICE_ROUTE:'Rota de servico', REAL_SITUATION:'Situacao real', VISUAL_CHECKLIST:'Checklist visual' };

function EditorialFooter({ page, printMode }) {
  return <footer className="page-footer editorial-footer"><span className="editorial-brand"><b>GP</b><i>GARCOM PROFISSIONAL</i></span><span>{printMode ? 'MANUAL DE TREINAMENTO' : familyNames[getEditorialTechniqueConfig(page.id)?.family]}</span><b>{String(page.pageNumber).padStart(3, '0')}</b></footer>;
}

export default function EditorialTechniquePage({ page, progress, toggleInList, printMode = false, reviewMode = false }) {
  const config = getEditorialTechniqueConfig(page.id);
  if (!config) return null;
  const item = page.data;
  const Family = familyComponents[config.family];
  const done = progress?.completedTechniques?.includes(item.id) || false;
  const favorite = progress?.favorites?.includes(item.id) || false;
  const classes = `a4-sheet editorial-technique-sheet theme-${config.theme} position-${config.position} title-${config.titlePosition || 'top-left'} variation-${config.visualVariation || 'full-body'} ${config.featuredVisual ? 'is-featured-visual' : ''} family-${config.family.toLowerCase().replaceAll('_', '-')}`;

  return <article className={classes} data-page={page.pageNumber} data-family={config.family} data-diagram={config.diagram || ''} aria-label={`Tecnica ${item.number}: ${item.title}`}>
    <div className="a4-safe editorial-safe">
      <header className="editorial-heading"><div className="editorial-index"><span>TECNICA</span><b>{String(item.number).padStart(3,'0')}</b></div><div><small>{page.section} · {familyNames[config.family]}</small><h1>{config.featuredVisual ? featuredHeadlines[item.id] || item.title : item.title}</h1></div><span className="editorial-objective">{item.objective}</span></header>
      <Family item={item} image={config.image || page.image} compareImage={config.compareImage} calls={config.calls} position={config.position} featured={config.featuredVisual} variation={config.visualVariation} />
      <section className="editorial-summary"><div className="editorial-result"><small>RESULTADO</small><strong>{item.result}</strong></div><div className="editorial-avoid"><small>EVITE</small><span>{config.avoid || item.avoid}</span></div></section>
      {!printMode && !reviewMode && <div className="editorial-page-actions"><button className={`editorial-complete ${done ? 'is-complete' : ''}`} onClick={() => toggleInList('completedTechniques', item.id)}><i>{done ? '✓' : ''}</i>{done ? 'Tecnica praticada' : 'Marcar como praticada'}</button><button className={`editorial-favorite ${favorite ? 'is-favorite' : ''}`} onClick={() => toggleInList('favorites', item.id)} aria-pressed={favorite}>{favorite ? '★ Favoritada' : '☆ Favoritar'}</button></div>}
      {printMode && <div className="editorial-print-check"><i>{done ? '✓' : ''}</i><span>Pratiquei no turno</span><b>DATA ____ / ____ / ______</b></div>}
      {reviewMode && <div className="review-family-code">{config.family}</div>}
      <EditorialFooter page={page} printMode={printMode} />
    </div>
  </article>;
}
