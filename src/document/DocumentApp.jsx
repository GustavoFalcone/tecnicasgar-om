import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildDocumentManifest, navigationSections } from './documentManifest.js';
import DocumentPage from './DocumentPages.jsx';
import { useStudentProgress } from '../hooks/useStudentProgress.js';
import './document.css';

const Icon = ({ children }) => <span aria-hidden="true">{children}</span>;

export default function DocumentApp() {
  const pages = useMemo(() => buildDocumentManifest(), []);
  const initialIndex = Math.max(0, pages.findIndex(page => page.id === window.location.hash.slice(1)));
  const [pageIndex, setPageIndex] = useState(initialIndex);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [printScope, setPrintScope] = useState(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const { progress, stats, toggleInList, update } = useStudentProgress();
  const readerRef = useRef(null);
  const currentPage = pages[pageIndex];

  const goTo = useCallback((target) => {
    const index = typeof target === 'number' ? target : pages.findIndex(page => page.id === target);
    if (index < 0) return;
    setPageIndex(Math.min(pages.length - 1, Math.max(0, index)));
    setDrawerOpen(false);
    window.history.replaceState(null, '', `#${pages[index].id}`);
    readerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pages]);

  useEffect(() => {
    const handleKeys = event => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') goTo(pageIndex + 1);
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') goTo(pageIndex - 1);
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [goTo, pageIndex]);

  useEffect(() => {
    const clearPrint = () => { setPrintScope(null); setIsPreparing(false); };
    window.addEventListener('afterprint', clearPrint);
    return () => window.removeEventListener('afterprint', clearPrint);
  }, []);

  const printPages = printScope === 'all' ? pages : printScope === 'current' ? [currentPage] : [];
  const requestPrint = async scope => {
    setIsPreparing(true);
    setPrintScope(scope);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    if (document.fonts?.ready) await document.fonts.ready;
    const images = [...document.querySelectorAll('.print-document img')];
    await Promise.all(images.map(img => img.complete ? img.decode?.().catch(() => {}) : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })));
    window.print();
  };

  const activeSectionId = [...navigationSections].reverse().find(section => pages.findIndex(page => page.id === section.id) <= pageIndex)?.id;
  const chapterLabel = currentPage.type === 'technique' ? `Técnica ${currentPage.data.number} de 200` : currentPage.section;

  return (
    <div className="document-app">
      <aside className={`document-sidebar ${drawerOpen ? 'is-open' : ''}`}>
        <header><button className="sidebar-logo" onClick={() => goTo('modules')}><b>GP</b><span>GARÇOM PROFISSIONAL<small>BIBLIOTECA DE TREINAMENTO</small></span></button><button className="close-drawer" onClick={() => setDrawerOpen(false)} aria-label="Fechar índice">×</button></header>
        <div className="sidebar-progress"><span><b>{stats.techniquePercent}%</b> do treino principal</span><i><u style={{ width: `${stats.techniquePercent}%` }} /></i><small>{progress.completedTechniques.length} de 200 técnicas praticadas</small></div>
        <button className={`library-home ${currentPage.id === 'modules' ? 'active' : ''}`} onClick={() => goTo('modules')}><span>⌂</span><div><small>INÍCIO</small><b>Meus materiais</b></div></button>
        <nav aria-label="Módulos do treinamento">
          {navigationSections.map(section => <button key={section.id} className={activeSectionId === section.id ? 'active' : ''} onClick={() => goTo(section.id)}><small>{section.eyebrow}</small><span>{section.label}</span>{section.count && <b>{section.count}</b>}</button>)}
        </nav>
        <footer><span>Use ← → para trocar de folha</span><b>{pages.length} páginas A4</b></footer>
      </aside>
      {drawerOpen && <button className="drawer-shade" aria-label="Fechar índice" onClick={() => setDrawerOpen(false)} />}

      <main className="document-main" ref={readerRef}>
        <header className="reader-toolbar">
          <button className="index-button" onClick={() => setDrawerOpen(true)}><Icon>☰</Icon><span>Índice</span></button>
          <div className="current-location"><small>{chapterLabel}</small><strong>{currentPage.title}</strong></div>
          <div className="toolbar-actions">
            <button onClick={() => requestPrint('current')} disabled={isPreparing} title="Imprimir somente esta folha"><Icon>▱</Icon><span>Imprimir página</span></button>
            <button className="download-button" onClick={() => requestPrint('all')} disabled={isPreparing}><Icon>{isPreparing ? '•••' : '↓'}</Icon><span>{isPreparing ? 'Preparando…' : 'Baixar PDF / imprimir'}</span></button>
          </div>
        </header>

        <section className="reader-stage" aria-live="polite">
          <div className="sheet-wrap"><DocumentPage page={currentPage} progress={progress} stats={stats} toggleInList={toggleInList} update={update} onNavigate={goTo} onPrintAll={() => requestPrint('all')} isPreparing={isPreparing} /></div>
          <nav className="page-controls" aria-label="Navegação entre páginas">
            <button onClick={() => goTo(pageIndex - 1)} disabled={pageIndex === 0}><Icon>←</Icon><span>Anterior</span></button>
            <div><b>{String(pageIndex + 1).padStart(3, '0')}</b><i>de</i><span>{pages.length}</span></div>
            <button onClick={() => goTo(pageIndex + 1)} disabled={pageIndex === pages.length - 1}><span>Próxima</span><Icon>→</Icon></button>
          </nav>
        </section>
      </main>

      {printScope && <div className="print-document" aria-hidden="true">{printPages.map(page => <DocumentPage key={page.id} page={page} progress={progress} stats={stats} toggleInList={toggleInList} update={update} printMode />)}</div>}
    </div>
  );
}
