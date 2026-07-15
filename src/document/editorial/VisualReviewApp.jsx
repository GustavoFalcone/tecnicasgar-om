import React, { useEffect, useMemo, useState } from 'react';
import { buildDocumentManifest } from '../documentManifest.js';
import { useStudentProgress } from '../../hooks/useStudentProgress.js';
import EditorialTechniquePage from './EditorialTechniquePage.jsx';
import { editorialTechniqueConfigs } from './editorialRegistry.js';
import '../document.css';
import './visual-review.css';

export default function VisualReviewApp() {
  const allPages = useMemo(() => buildDocumentManifest(), []);
  const reviewPages = useMemo(() => editorialTechniqueConfigs.map(config => ({ config, page: allPages.find(page => page.id === config.id) })).filter(item => item.page), [allPages]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { progress } = useStudentProgress();
  const selected = selectedIndex === null ? null : reviewPages[selectedIndex];

  useEffect(() => {
    if (!selected) return undefined;
    const onKey = event => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowRight') setSelectedIndex(index => (index + 1) % reviewPages.length);
      if (event.key === 'ArrowLeft') setSelectedIndex(index => (index - 1 + reviewPages.length) % reviewPages.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, reviewPages.length]);

  return (
    <main className="visual-review-app">
      <header className="review-header">
        <div><span>EDITORIAL SYSTEM · V2</span><h1>Revisão visual</h1><p>Oito famílias, dezesseis páginas-piloto. As outras 184 técnicas permanecem no sistema atual.</p></div>
        <aside><b>16</b><span>PÁGINAS-PILOTO</span><i>8 famílias · 2 aplicações</i></aside>
        <a href="/#modules">← Voltar ao material</a>
      </header>

      <section className="review-family-legend" aria-label="Famílias visuais">
        {editorialTechniqueConfigs.slice(0, 8).map((item, index) => <span key={item.family}><b>{String(index + 1).padStart(2, '0')}</b>{item.family.replaceAll('_', ' ')}</span>)}
      </section>

      <section className="review-gallery">
        {reviewPages.map(({ page, config }, index) => <article className="review-card" key={page.id} style={{ '--review-order': index }}>
          <button className="review-page-button" onClick={() => setSelectedIndex(index)} aria-label={`Abrir técnica ${page.data.number}: ${page.title}`}>
            <div className="review-page-canvas"><EditorialTechniquePage page={page} progress={progress} reviewMode /></div>
            <span className="review-open">ABRIR EM TAMANHO GRANDE ↗</span>
          </button>
          <footer><div><small>{config.family}</small><strong>{page.title}</strong></div><b>{String(index + 1).padStart(2, '0')}</b></footer>
        </article>)}
      </section>

      {selected && <div className="review-modal" role="dialog" aria-modal="true" aria-label={`Visualização ampliada: ${selected.page.title}`} onMouseDown={event => event.target === event.currentTarget && setSelectedIndex(null)}>
        <header><div><small>{selected.config.family}</small><strong>{selected.page.title}</strong></div><span>{String(selectedIndex + 1).padStart(2, '0')} / {reviewPages.length}</span><button onClick={() => setSelectedIndex(null)} aria-label="Fechar">×</button></header>
        <button className="review-arrow previous" onClick={() => setSelectedIndex(index => (index - 1 + reviewPages.length) % reviewPages.length)} aria-label="Página anterior">←</button>
        <div className="review-modal-sheet"><EditorialTechniquePage page={selected.page} progress={progress} reviewMode /></div>
        <button className="review-arrow next" onClick={() => setSelectedIndex(index => (index + 1) % reviewPages.length)} aria-label="Próxima página">→</button>
      </div>}
    </main>
  );
}
