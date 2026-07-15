import React, { useEffect, useMemo, useState } from 'react';
import { buildDocumentManifest } from '../documentManifest.js';
import { techniqueVisualMap } from '../../data/techniqueVisualMap.js';
import { useStudentProgress } from '../../hooks/useStudentProgress.js';
import EditorialTechniquePage from './EditorialTechniquePage.jsx';
import { featuredHeadlines } from './featuredEditorial.js';
import '../document.css';
import './featured-showcase.css';

const featuredConfigs = techniqueVisualMap.filter(item => item.featuredVisual);

export default function FeaturedShowcaseApp({ presentation = false }) {
  const allPages = useMemo(() => buildDocumentManifest(), []);
  const pages = useMemo(() => featuredConfigs.map(config => ({ config, page: allPages.find(page => page.id === config.techniqueId) })).filter(item => item.page), [allPages]);
  const hashId = window.location.hash.replace('#', '');
  const initial = Math.max(0, pages.findIndex(item => item.page.id === hashId));
  const [index, setIndex] = useState(initial);
  const { progress } = useStudentProgress();

  useEffect(() => {
    if (!presentation) return undefined;
    const onKey = event => {
      if (event.key === 'ArrowRight') setIndex(value => (value + 1) % pages.length);
      if (event.key === 'ArrowLeft') setIndex(value => (value - 1 + pages.length) % pages.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [presentation, pages.length]);

  useEffect(() => {
    if (presentation && pages[index]) history.replaceState(null, '', `#${pages[index].page.id}`);
  }, [index, pages, presentation]);

  if (presentation) {
    const selected = pages[index];
    return <main className="featured-presentation">
      <div className="presentation-sheet"><EditorialTechniquePage page={selected.page} progress={progress} reviewMode /></div>
      <button className="presentation-arrow is-previous" onClick={() => setIndex(value => (value - 1 + pages.length) % pages.length)} aria-label="Destaque anterior">←</button>
      <button className="presentation-arrow is-next" onClick={() => setIndex(value => (value + 1) % pages.length)} aria-label="Próximo destaque">→</button>
      <span className="presentation-counter">{String(index + 1).padStart(2, '0')} / {pages.length}</span>
    </main>;
  }

  return <main className="featured-gallery-app">
    <header className="featured-gallery-header"><div><span>SELEÇÃO EDITORIAL · 24 PÁGINAS</span><h1>Destaques visuais</h1><p>Páginas selecionadas para demonstrações, mockups e criativos.</p></div><a href="/area-do-aluno/destaques/apresentacao">Iniciar apresentação →</a></header>
    <section className="featured-gallery-grid">{pages.map(({ page, config }, itemIndex) => <article key={page.id} className="featured-gallery-card" style={{ '--order': itemIndex }}>
      <a href={`/area-do-aluno/destaques/apresentacao#${page.id}`} aria-label={`Apresentar ${page.title}`}><div className="featured-gallery-page"><EditorialTechniquePage page={page} progress={progress} reviewMode /></div></a>
      <footer><span>{config.visualType.replaceAll('_', ' ')}</span><strong>{featuredHeadlines[page.id] || page.title}</strong><b>{String(itemIndex + 1).padStart(2, '0')}</b></footer>
    </article>)}</section>
  </main>;
}
