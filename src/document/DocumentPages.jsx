import React, { useEffect, useRef } from 'react';
import { chapterNavigationSections, navigationSections } from './documentManifest.js';
import { techniqueBlocks } from '../data/techniques.js';
import { ChecklistBoardVisual, MemoryMapVisual, PostureCoachVisual, ScriptRouteVisual, TechniqueVisual } from './PageVisuals.jsx';
import EditorialTechniquePage from './editorial/EditorialTechniquePage.jsx';
import { getEditorialTechniqueConfig } from './editorial/editorialRegistry.js';

const brand = <span className="document-brand"><b>GP</b><i>GARÇOM PROFISSIONAL</i></span>;

function PageShell({ page, children, className = '', printMode = false }) {
  return (
    <article className={`a4-sheet page-${page.type} ${className}`} data-page={page.pageNumber} aria-label={`Página ${page.pageNumber}: ${page.title}`}>
      <div className="a4-safe">
        {children}
        <footer className="page-footer">
          {brand}
          <span>{printMode ? 'MANUAL DE TREINAMENTO' : page.section}</span>
          <b>{String(page.pageNumber).padStart(3, '0')}</b>
        </footer>
      </div>
    </article>
  );
}

function PageHeader({ page, kicker, title = page.title, description }) {
  return (
    <header className="page-heading">
      <div>
        <span className="page-kicker">{kicker || page.section}</span>
        <h1>{title}</h1>
      </div>
      {description && <p>{description}</p>}
    </header>
  );
}

function EditorialImage({ src, alt, badges = [], className = '' }) {
  return (
    <figure className={`editorial-image ${className}`}>
      <img src={src} alt={alt} loading="eager" decoding="async" />
      {badges.length > 0 && <figcaption>{badges.map((badge, index) => <span key={badge}><b>{String(index + 1).padStart(2, '0')}</b>{badge}</span>)}</figcaption>}
    </figure>
  );
}

function CheckMark({ checked = false }) {
  return <span className={`print-check ${checked ? 'is-checked' : ''}`} aria-hidden="true">{checked ? '✓' : ''}</span>;
}

function ModulesPage({ page, onNavigate, onPrintAll, printMode, isPreparing }) {
  const revealRoot = useRef(null);
  const modules = [
    { id: 'cover', eyebrow: 'MÓDULO PRINCIPAL', title: '+200 Técnicas para Servir como um Garçom Profissional', meta: '200 técnicas · 10 capítulos', featured: true, number: '01' },
    { id: 'scripts-cover', eyebrow: 'BÔNUS 01', title: '30 Roteiros Práticos de Serviço', meta: '30 roteiros', image: '/assets/editorial/chapter-fluxo.webp', number: '02' },
    { id: 'memory-cover', eyebrow: 'BÔNUS 02', title: 'Memorização e Agilidade', meta: '12 treinos', image: '/assets/editorial/bonus-memorizacao.webp', number: '03' },
    { id: 'checklists-cover', eyebrow: 'BÔNUS 03', title: 'Checklists, Postura e Presença', meta: '25 materiais', image: '/assets/editorial/bonus-checklists.webp', number: '04' },
    { id: 'certificate', eyebrow: 'BÔNUS 04', title: 'Certificado de Conclusão', meta: 'Certificado A4', image: '/assets/editorial/chapter-refinamento.webp', number: '05' }
  ];

  useEffect(() => {
    const root = revealRoot.current;
    if (!root) return undefined;
    const items = [...root.querySelectorAll('[data-reveal]')];
    if (printMode || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [printMode]);

  return (
    <PageShell page={page} className="modules-sheet" printMode={printMode}>
      <div className="modules-content" ref={revealRoot}>
        <header className="modules-masthead reveal-item" data-reveal style={{ '--reveal-order': 0 }}><span>GARÇOM PROFISSIONAL</span><b>05 MÓDULOS</b><i>MATERIAL DIGITAL · FORMATO A4</i></header>
        <div className="modules-grid">
          {modules.map((module, index) => module.featured ? (
            <button key={module.id} className="module-entry featured reveal-item" data-reveal style={{ '--reveal-order': index + 1 }} onClick={() => !printMode && onNavigate(module.id)} disabled={printMode}>
              <div className="module-featured-copy"><span className="module-entry-number">{module.number}</span><small>{module.eyebrow}</small><h2>{module.title}</h2><i>{printMode ? 'INCLUSO NO MATERIAL' : 'ABRIR MANUAL →'}</i></div>
              <figure className="module-featured-art"><img src="/assets/editorial/module-principal.webp" alt="Apresentação visual do manual com mais de 200 técnicas para garçons" loading="eager" decoding="async" /><div className="module-page-previews"><img src="/assets/editorial/cover.webp" alt="Prévia da capa do manual" /><img src="/assets/waiter/waiter-tray.png" alt="Prévia de técnica com bandeja" /><img src="/assets/waiter/waiter-three-plates.png" alt="Prévia de técnica com pratos" /></div></figure>
            </button>
          ) : (
            <button key={module.id} className="module-entry reveal-item" data-reveal style={{ '--reveal-order': index + 1 }} onClick={() => !printMode && onNavigate(module.id)} disabled={printMode}>
              <span className="module-entry-number">{module.number}</span><div><small>{module.eyebrow}</small><h2>{module.title}</h2><strong>{module.meta}</strong></div><figure className="module-bonus-art"><img src={module.image} alt={`Prévia de ${module.title}`} loading="lazy" /></figure><i>{printMode ? 'INCLUSO' : 'ABRIR →'}</i>
            </button>
          ))}
        </div>
        {!printMode && <aside className="library-download reveal-item" data-reveal style={{ '--reveal-order': 6 }}><div><b>Material completo em A4</b><span>Baixe como PDF ou imprima as 287 páginas de uma só vez.</span></div><button onClick={onPrintAll} disabled={isPreparing}>{isPreparing ? 'Preparando material…' : 'Baixar PDF ou imprimir tudo'}</button></aside>}
      </div>
    </PageShell>
  );
}

function CoverPage({ page }) {
  return (
    <PageShell page={page} className="cover-sheet">
      <div className="cover-topline">{brand}<span>MANUAL TÉCNICO VISUAL · 2026</span></div>
      <section className="cover-blueprint">
        <div className="cover-title-block"><span className="cover-edition">EDIÇÃO PROFISSIONAL · A4</span><h1><em>+200</em><span>Técnicas para Servir como um</span><strong>Garçom Profissional</strong></h1><p>Agilidade, elegância, postura e segurança em situações reais do serviço.</p></div>
        <figure className="cover-waiter"><span>POSTURA · PRESENÇA · CONTROLE</span><img src="/assets/waiter/master-waiter.png" alt="Garçom profissional em postura segura" /></figure>
        <aside className="cover-detail cover-detail-tray"><figure><img src="/assets/waiter/waiter-tray.png" alt="Detalhe técnico de transporte de bandeja" /></figure><span><b>01</b>BANDEJA</span></aside>
        <aside className="cover-detail cover-detail-plates"><figure><img src="/assets/waiter/waiter-three-plates.png" alt="Detalhe técnico de transporte de pratos" /></figure><span><b>02</b>PRATOS</span></aside>
        <aside className="cover-detail cover-detail-posture"><figure><img src="/assets/waiter/waiter-posture-correct.png" alt="Detalhe técnico de postura profissional" /></figure><span><b>03</b>POSTURA</span></aside>
        <svg className="cover-indicators" viewBox="0 0 1000 1180" aria-hidden="true"><path d="M180 805C320 780 415 735 540 620"/><path d="M205 980C360 955 505 900 675 760"/><path d="M775 245C745 345 735 430 748 520"/><circle cx="540" cy="620" r="8"/><circle cx="675" cy="760" r="8"/><circle cx="748" cy="520" r="8"/></svg>
        <div className="cover-technical-axis"><i/><span>LEITURA VISUAL RÁPIDA</span><i/></div>
      </section>
      <div className="cover-facts"><span><b>200</b> técnicas visuais</span><span><b>30</b> roteiros práticos</span><span><b>+</b> materiais complementares</span></div>
    </PageShell>
  );
}

function HowToPage({ page }) {
  const steps = [
    ['01', 'Observe', 'Comece pela imagem e identifique postura, rota e ponto de apoio.'],
    ['02', 'Entenda', 'Leia quando usar, a sequência e o erro que deve ser evitado.'],
    ['03', 'Pratique', 'Repita em ambiente seguro antes de aplicar durante o atendimento.'],
    ['04', 'Marque', 'Conclua a folha e acompanhe sua evolução no índice do manual.']
  ];
  return (
    <PageShell page={page}>
      <PageHeader page={page} kicker="ANTES DE COMEÇAR" description="Uma folha por habilidade. Um passo claro de cada vez." />
      <EditorialImage src={page.image} alt="Demonstração de serviço profissional à mesa" badges={['olhar na rota', 'gesto compacto', 'conferência final']} className="how-image" />
      <div className="instruction-grid">{steps.map(([number, title, text]) => <article key={number}><b>{number}</b><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>
      <aside className="print-tip"><b>PDF ou papel?</b><span>Use o botão “Baixar PDF / imprimir” no leitor. Escolha papel A4, escala 100% e gráficos de fundo ativados.</span></aside>
    </PageShell>
  );
}

function ContentsPage({ page }) {
  return (
    <PageShell page={page}>
      <PageHeader page={page} kicker="NAVEGAÇÃO DO MANUAL" description="Capítulos curtos, visuais e organizados por situação real de serviço." />
      <EditorialImage src={page.image} alt="Mesa refinada pronta para o serviço" className="contents-image" />
      <div className="contents-list">
        {chapterNavigationSections.map((section, index) => <div key={section.id}><b>{String(index + 1).padStart(2, '0')}</b><span>{section.label}</span><i>{section.count} técnicas</i></div>)}
      </div>
      <div className="bonus-index">
        {navigationSections.slice(1).map(section => <div key={section.id}><small>{section.eyebrow}</small><strong>{section.label}</strong><span>{section.count ? `${section.count} materiais` : 'certificado'}</span></div>)}
      </div>
    </PageShell>
  );
}

function ProgressPage({ page, progress, stats }) {
  return (
    <PageShell page={page}>
      <PageHeader page={page} kicker="ACOMPANHAMENTO" description="Marque no leitor digital ou use esta folha impressa durante os seus turnos." />
      <div className="progress-hero">
        <EditorialImage src={page.image} alt="Fluxo profissional organizado no salão" />
        <div><strong>{stats.techniquePercent}%</strong><span>das técnicas concluídas</span><p>{progress.completedTechniques.length} de 200 folhas praticadas</p></div>
      </div>
      <div className="chapter-tracker">
        {techniqueBlocks.map((block, index) => {
          const completed = progress.completedTechniques.filter(id => {
            const value = Number(id.replace('tech-', ''));
            const start = techniqueBlocks.slice(0, index).reduce((sum, item) => sum + item.count, 0) + 1;
            return value >= start && value < start + block.count;
          }).length;
          return <div key={block.id}><CheckMark checked={completed === block.count} /><span><b>{String(index + 1).padStart(2, '0')} · {block.name}</b><i>{completed}/{block.count}</i></span><u><i style={{ width: `${Math.round(completed / block.count * 100)}%` }} /></u></div>;
        })}
      </div>
      <div className="progress-summary"><span><b>{progress.completedScripts.length}/30</b> roteiros</span><span><b>{stats.completedChecklists}/15</b> checklists</span><span><b>{progress.completedMemory.length}/12</b> memorização</span><span><b>{progress.completedPosture.length}/10</b> postura</span></div>
    </PageShell>
  );
}

function ChapterPage({ page }) {
  return (
    <PageShell page={page} className="chapter-sheet">
      <div className="chapter-number">CAPÍTULO <b>{String(page.chapterNumber).padStart(2, '0')}</b></div>
      <EditorialImage src={page.image} alt={`Demonstração visual: ${page.title}`} className="chapter-image" />
      <div className="chapter-copy"><span>{page.count} TÉCNICAS PRÁTICAS</span><h1>{page.title}</h1><p>{page.description}</p><div><i>OBSERVE</i><i>PRATIQUE</i><i>APERFEIÇOE</i></div></div>
    </PageShell>
  );
}

function TechniquePage({ page, progress, toggleInList, printMode }) {
  const item = page.data;
  if (getEditorialTechniqueConfig(item.id)) return <EditorialTechniquePage page={page} progress={progress} toggleInList={toggleInList} printMode={printMode} />;
  const done = progress.completedTechniques.includes(item.id);
  return (
    <PageShell page={page} printMode={printMode}>
      <PageHeader page={page} kicker={`TÉCNICA ${String(item.number).padStart(3, '0')} • CAPÍTULO ${String(page.chapterNumber).padStart(2, '0')}`} description={item.explanation} />
      <TechniqueVisual item={item} />
      <div className="metadata-row"><span><small>OBJETIVO</small>{item.objective}</span><span><small>NÍVEL</small>{item.level}</span><span><small>AMBIENTE</small>{item.environment}</span></div>
      <div className="technique-content">
        <section className="steps-card"><h2>Sequência prática</h2><ol>{item.steps.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></li>)}</ol></section>
        <div className="technique-notes">
          <section><small>QUANDO USAR</small><p>{item.when}</p></section>
          <section className="correct-note"><small>FAÇA ASSIM</small><p>{item.doThis}</p></section>
          <section className="wrong-note"><small>EVITE</small><p>{item.avoid}</p></section>
        </div>
      </div>
      <div className="result-strip"><span><small>RESULTADO ESPERADO</small>{item.result}</span><span><small>DICA DE 2 SEGUNDOS</small>{item.quickTip}</span></div>
      {!printMode && <button className={`complete-page ${done ? 'is-complete' : ''}`} onClick={() => toggleInList('completedTechniques', item.id)}><CheckMark checked={done} />{done ? 'Técnica concluída' : 'Marcar como praticada'}</button>}
      {printMode && <div className="print-practice"><CheckMark checked={done} /><span>Pratiquei esta técnica no turno</span><i>DATA ____ / ____ / ______</i></div>}
    </PageShell>
  );
}

function ModuleCoverPage({ page }) {
  return (
    <PageShell page={page} className="module-cover-sheet">
      <span className="module-label">{page.section}</span>
      <EditorialImage src={page.image} alt={`Demonstração visual de ${page.title}`} className="module-image" />
      <div className="module-cover-copy"><small>MATERIAL PRÁTICO</small><h1>{page.title}</h1><p>{page.description}</p><span>Use durante o treino • Leve para o turno • Imprima quando quiser</span></div>
    </PageShell>
  );
}

function ScriptPage({ page, progress, toggleInList, printMode }) {
  const item = page.data;
  const done = progress.completedScripts.includes(item.id);
  return (
    <PageShell page={page} printMode={printMode}>
      <PageHeader page={page} kicker={`ROTEIRO ${String(page.itemNumber).padStart(2, '0')} • ${item.duration}`} description={item.situation} />
      <div className="script-visual"><ScriptRouteVisual item={item} number={page.itemNumber} /><div><small>MISSÃO DO TURNO</small><p>{item.objective}</p><span>{item.environment}</span></div></div>
      <div className="script-grid">
        <section><h2>Antes de começar</h2>{item.preparation.map((text, index) => <p key={text}><b>{index + 1}</b>{text}</p>)}</section>
        <section><h2>Rota de ação</h2>{item.actions.map((text, index) => <p key={text}><b>{index + 1}</b>{text}</p>)}</section>
      </div>
      <div className="attention-strip"><b>ATENÇÃO</b><span>{item.attention}</span><b>EVITE</b><span>{item.avoid}</span></div>
      <div className="mini-checklist"><strong>Fechamento do roteiro</strong>{item.checklist.map(text => <span key={text}><CheckMark />{text}</span>)}</div>
      {!printMode && <button className={`complete-page ${done ? 'is-complete' : ''}`} onClick={() => toggleInList('completedScripts', item.id)}><CheckMark checked={done} />{done ? 'Roteiro concluído' : 'Marcar roteiro como concluído'}</button>}
    </PageShell>
  );
}

function MemoryPage({ page, progress, toggleInList, printMode }) {
  const item = page.data;
  const done = progress.completedMemory.includes(item.id);
  return (
    <PageShell page={page} printMode={printMode}>
      <PageHeader page={page} kicker={`TREINO DE MEMÓRIA ${String(page.itemNumber).padStart(2, '0')}`} description={item.description} />
      <MemoryMapVisual item={item} number={page.itemNumber} />
      <div className="memory-method"><span><b>20s</b>observe a cena</span><i>→</i><span><b>3</b>grupos mentais</span><i>→</i><span><b>1</b>rota de retorno</span></div>
      <section className="exercise-card"><small>EXERCÍCIO PRÁTICO</small><h2>{item.exercise}</h2><div className="writing-lines"><i/><i/><i/><i/><i/></div></section>
      <aside className="gold-tip"><b>ATALHO MENTAL</b><span>Use pontos fixos do salão e recupere a sequência pela última ação que você confirmou.</span></aside>
      {!printMode && <button className={`complete-page ${done ? 'is-complete' : ''}`} onClick={() => toggleInList('completedMemory', item.id)}><CheckMark checked={done} />{done ? 'Exercício concluído' : 'Marcar exercício como concluído'}</button>}
    </PageShell>
  );
}

function ChecklistPage({ page, progress, update, printMode }) {
  const item = page.data;
  const selected = progress.checklistItems[item.id] || [];
  const toggleItem = index => update({ checklistItems: { ...progress.checklistItems, [item.id]: selected.includes(index) ? selected.filter(value => value !== index) : [...selected, index] } });
  return (
    <PageShell page={page} printMode={printMode}>
      <PageHeader page={page} kicker={`CHECKLIST ${String(page.itemNumber).padStart(2, '0')}`} description="Faça a conferência com calma. Um minuto de preparação evita vários minutos de correção." />
      <ChecklistBoardVisual item={item} number={page.itemNumber} />
      <div className="checklist-box"><div className="checklist-meta"><span>DATA ____ / ____ / ______</span><span>TURNO __________________</span></div>{item.items.map((text, index) => <button key={text} onClick={() => !printMode && toggleItem(index)} disabled={printMode}><CheckMark checked={selected.includes(index)} /><span>{text}</span><small>CONFERIDO</small></button>)}</div>
      <div className="checklist-notes"><small>OBSERVAÇÕES DO TURNO</small><i/><i/><i/></div>
      <aside className="checklist-score"><strong>{selected.length}/{item.items.length}</strong><span>itens conferidos</span><p>Pronto para servir com segurança, organização e presença.</p></aside>
    </PageShell>
  );
}

function PosturePage({ page, progress, toggleInList, printMode }) {
  const item = page.data;
  const done = progress.completedPosture.includes(item.id);
  return (
    <PageShell page={page} printMode={printMode}>
      <PageHeader page={page} kicker={`POSTURA ${String(page.itemNumber).padStart(2, '0')}`} description="O cliente percebe sua segurança antes mesmo de você dizer uma palavra." />
      <PostureCoachVisual item={item} number={page.itemNumber} />
      <div className="posture-comparison"><section className="wrong-note"><small>✕ TRANSMITE INSEGURANÇA</small><p>{item.awkward}</p></section><section className="correct-note"><small>✓ TRANSMITE PROFISSIONALISMO</small><p>{item.professional}</p></section></div>
      <section className="corrections"><h2>Ajuste em três movimentos</h2>{item.corrections.map((text, index) => <span key={text}><b>{index + 1}</b>{text}</span>)}</section>
      <section className="posture-practice"><small>PRÁTICA DE 2 MINUTOS</small><p>{item.exercise}</p><strong>{item.result}</strong></section>
      {!printMode && <button className={`complete-page ${done ? 'is-complete' : ''}`} onClick={() => toggleInList('completedPosture', item.id)}><CheckMark checked={done} />{done ? 'Aula concluída' : 'Marcar aula como concluída'}</button>}
    </PageShell>
  );
}

function CertificatePage({ page, progress, stats, update, printMode }) {
  const date = new Intl.DateTimeFormat('pt-BR').format(new Date());
  return (
    <PageShell page={page} printMode={printMode} className="certificate-sheet">
      <div className="certificate-frame">
        <span className="certificate-seal">GP</span><small>CERTIFICADO DE APRIMORAMENTO</small>
        <h1>Garçom<br/><em>Profissional</em></h1>
        <p>Certificamos que</p>
        {!printMode ? <input value={progress.studentName} onChange={event => update({ studentName: event.target.value })} placeholder="Digite seu nome completo" /> : <h2>{progress.studentName || '________________________________'}</h2>}
        <p>concluiu o programa visual de aprimoramento em técnicas de salão, roteiros de serviço, memorização, checklists e presença profissional.</p>
        <div className="certificate-stats"><span><b>{progress.completedTechniques.length}</b>técnicas</span><span><b>{progress.completedScripts.length}</b>roteiros</span><span><b>{stats.bonusPercent}%</b>bônus</span></div>
        <div className="certificate-signatures"><span><b>{date}</b>data de conclusão</span><span><b>Garçom Profissional</b>programa de treinamento</span></div>
        {!stats.certificateUnlocked && <aside>Continue praticando para liberar 100% do certificado digital. A versão para impressão permanece disponível como registro de estudo.</aside>}
      </div>
    </PageShell>
  );
}

export default function DocumentPage({ page, progress, stats, toggleInList, update, printMode = false, onNavigate = () => {}, onPrintAll = () => {}, isPreparing = false }) {
  const props = { page, progress, stats, toggleInList, update, printMode, onNavigate, onPrintAll, isPreparing };
  switch (page.type) {
    case 'modules': return <ModulesPage {...props} />;
    case 'cover': return <CoverPage {...props} />;
    case 'how-to': return <HowToPage {...props} />;
    case 'contents': return <ContentsPage {...props} />;
    case 'progress': return <ProgressPage {...props} />;
    case 'chapter': return <ChapterPage {...props} />;
    case 'technique': return <TechniquePage {...props} />;
    case 'module-cover': return <ModuleCoverPage {...props} />;
    case 'script': return <ScriptPage {...props} />;
    case 'memory': return <MemoryPage {...props} />;
    case 'checklist': return <ChecklistPage {...props} />;
    case 'posture': return <PosturePage {...props} />;
    case 'certificate': return <CertificatePage {...props} />;
    default: return null;
  }
}
