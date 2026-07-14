import { useEffect, useMemo, useState } from 'react';
import { techniques, techniqueBlocks } from './data/techniques.js';
import { serviceScripts, memoryLessons, checklists, postureLessons, postureAssessment } from './data/content.js';
import { useStudentProgress } from './hooks/useStudentProgress.js';
import { validateStudentData } from './utils/validateData.js';
import { ProgressBar, VisualDemo } from './components/VisualDemo.jsx';
import { TechniqueViewer } from './components/TechniqueViewer.jsx';
import './styles/student-area.css';

if (import.meta.env.DEV) console.info('[Área do aluno] Conteúdo validado:', validateStudentData());

const navigation = [
  ['dashboard','Início','⌂'],['tecnicas','+200 Técnicas','◫'],['roteiros','Roteiros de Serviço','↝'],['memorizacao','Memorização e Agilidade','◎'],
  ['checklists','Checklists','✓'],['postura','Postura e Presença','♙'],['certificado','Certificado','◇'],['favoritos','Favoritos','♡'],['proximo-turno','Próximo turno','◷']
];

function routeFromPath() { return new URL(window.location.href).searchParams.get('pagina') || 'dashboard'; }

function Icon({ children }) { return <span className="navIcon" aria-hidden="true">{children}</span>; }

function TechniqueCard({ item, progress, onOpen, onToggleComplete, onToggleFavorite }) {
  const complete = progress.completedTechniques.includes(item.id);
  const favorite = progress.favorites.includes(item.id);
  return <article className={`techniqueCard ${complete ? 'completed' : ''} ${item.featured ? 'featured' : ''}`}>
    <div className="techniqueCardTop"><span>TÉCNICA {String(item.number).padStart(3, '0')}</span><button className={favorite ? 'favorite active' : 'favorite'} onClick={() => onToggleFavorite(item.id)} aria-label="Favoritar">{favorite ? '♥' : '♡'}</button></div>
    <div className="miniVisual"><VisualDemo type={item.visualType} /></div>
    <span className="blockTag">{item.block}</span><h3>{item.title}</h3><p>{item.explanation}</p>
    <div className="cardMeta"><span>{item.level}</span><span>{item.environment}</span></div>
    <div className="cardActions"><button onClick={() => onOpen(item)}>Abrir técnica</button><button className={complete ? 'doneToggle complete' : 'doneToggle'} onClick={() => onToggleComplete(item.id)}>{complete ? '✓' : '○'}</button></div>
  </article>;
}

function Dashboard({ stats, progress, navigate }) {
  const modules = [
    ['memorizacao','◎','Guia de Memorização e Agilidade no Salão','Organize mentalmente mesas, pedidos e prioridades para reduzir esquecimentos e trabalhar com mais eficiência.','12 conteúdos',Math.round(progress.completedMemory.length / 12 * 100)],
    ['checklists','✓','Checklists do Serviço Profissional','Listas rápidas para conferir os detalhes importantes antes, durante e depois do turno.','15 checklists',stats.checklistPercent],
    ['postura','♙','Postura e Presença de um Garçom Profissional','Aprimore como se posicionar, caminhar e transmitir segurança e elegância no salão.','10 aulas',Math.round(progress.completedPosture.length / 10 * 100)],
    ['certificado','◇','Certificado de Conclusão','Conclua o material e gere seu certificado personalizado.','1 certificado',stats.certificateUnlocked ? 100 : 0]
  ];
  return <div className="page dashboardPage"><header className="pageIntro"><span className="eyebrow">SEU PAINEL DE CONSULTA</span><h1>Bem-vindo ao seu aprimoramento profissional</h1><p>Consulte as técnicas, marque seu progresso e aplique os aprimoramentos no próximo turno.</p></header>
    <section className="mainModuleCard"><div className="mainModuleContent"><span className="premiumBadge">MÓDULO PRINCIPAL</span><h2><em>+200</em> Técnicas para Servir como um Garçom Profissional</h2><p>Técnicas visuais para servir, transportar, organizar, recolher e se movimentar com mais agilidade, elegância e segurança.</p><div className="mainFacts"><span><b>200</b> técnicas</span><span><b>10</b> blocos</span><span><b>30</b> roteiros</span><span><b>rápida</b> consulta</span></div><ProgressBar value={stats.techniquePercent} label="Seu progresso" /><button className="goldButton" onClick={() => navigate('tecnicas')}>CONTINUAR TÉCNICAS →</button></div><div className="mainModuleArt"><VisualDemo type="tray" /><div className="artNotes"><span>BANDEJAS</span><span>PRATOS</span><span>COPOS</span><span>POSTURA</span></div></div></section>
    <div className="sectionHeading"><div><span className="eyebrow">CONTEÚDOS COMPLEMENTARES</span><h2>Seus módulos de aprimoramento</h2></div><button className="textButton" onClick={() => navigate('proximo-turno')}>{progress.nextShift.length} para o próximo turno →</button></div>
    <section className="moduleGrid">{modules.map(([route,icon,title,description,count,value]) => <article className="moduleCard" key={route}><Icon>{icon}</Icon><div><span className="moduleCount">{count}</span><h3>{title}</h3><p>{description}</p></div><ProgressBar value={value} label="Progresso" /><button onClick={() => navigate(route)}>ACESSAR MÓDULO →</button></article>)}</section>
  </div>;
}

function TechniquesPage({ progress, toggleInList, update, initialFavoriteOnly = false }) {
  const [search, setSearch] = useState(''); const [block, setBlock] = useState(''); const [objective, setObjective] = useState('');
  const [environment, setEnvironment] = useState(''); const [level, setLevel] = useState(''); const [status, setStatus] = useState(initialFavoriteOnly ? 'favorites' : ''); const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => techniques.filter(item => {
    const query = search.toLocaleLowerCase('pt-BR');
    return (!query || `${item.title} ${item.explanation} ${item.block}`.toLocaleLowerCase('pt-BR').includes(query)) && (!block || item.blockId === block) && (!objective || item.objective === objective) && (!environment || item.environment === environment) && (!level || item.level === level) && (!status || (status === 'done' ? progress.completedTechniques.includes(item.id) : status === 'pending' ? !progress.completedTechniques.includes(item.id) : progress.favorites.includes(item.id)));
  }), [search,block,objective,environment,level,status,progress]);
  const clear = () => { setSearch(''); setBlock(''); setObjective(''); setEnvironment(''); setLevel(''); setStatus(initialFavoriteOnly ? 'favorites' : ''); };
  const openAt = item => { setSelected(item); update({ lastTechnique: item.id }); };
  const move = delta => { const index = techniques.findIndex(item => item.id === selected.id); openAt(techniques[(index + delta + techniques.length) % techniques.length]); };
  return <div className="page techniquesPage"><header className="pageIntro compact"><span className="eyebrow">BIBLIOTECA VISUAL</span><h1>{initialFavoriteOnly ? 'Técnicas favoritas' : '+200 Técnicas Profissionais'}</h1><p>{initialFavoriteOnly ? 'Sua coleção de técnicas para consulta rápida.' : 'Encontre o aprimoramento certo para a situação do seu turno.'}</p><ProgressBar value={Math.round(progress.completedTechniques.length / 200 * 100)} label={`${progress.completedTechniques.length} de 200 concluídas`} /></header>
    <div className="filtersPanel"><label className="searchField"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar técnica, situação ou objetivo..." /></label><div className="filterRow"><select value={block} onChange={e => setBlock(e.target.value)}><option value="">Todos os blocos</option>{techniqueBlocks.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={objective} onChange={e => setObjective(e.target.value)}><option value="">Todos os objetivos</option>{['agilidade','elegância','segurança','equilíbrio','organização','postura','serviço','recolhimento','comunicação','refinamento'].map(value => <option key={value}>{value}</option>)}</select><select value={environment} onChange={e => setEnvironment(e.target.value)}><option value="">Todos os ambientes</option>{['restaurante','bar','hotel','buffet','evento','cafeteria','churrascaria','salão movimentado','qualquer ambiente'].map(value => <option key={value}>{value}</option>)}</select><select value={level} onChange={e => setLevel(e.target.value)}><option value="">Todos os níveis</option><option>intermediário</option><option>aprimoramento</option></select><select value={status} onChange={e => setStatus(e.target.value)}><option value="">Todo o progresso</option><option value="done">Concluídas</option><option value="pending">Pendentes</option><option value="favorites">Favoritas</option></select><button onClick={clear}>Limpar</button></div></div>
    <div className="resultsBar"><strong>{filtered.length} resultados</strong>{progress.lastTechnique && <button className="primaryButton" onClick={() => openAt(techniques.find(item => item.id === progress.lastTechnique) || techniques[0])}>Continuar de onde parei →</button>}</div>
    {filtered.length ? <div className="techniqueGrid">{filtered.map(item => <TechniqueCard key={item.id} item={item} progress={progress} onOpen={openAt} onToggleComplete={id => toggleInList('completedTechniques', id)} onToggleFavorite={id => toggleInList('favorites', id)} />)}</div> : <EmptyState icon="⌕" title="Nenhuma técnica encontrada" text="Ajuste os filtros ou limpe a busca para ver outros conteúdos." action={clear} />}
    <TechniqueViewer technique={selected} isComplete={selected && progress.completedTechniques.includes(selected.id)} isFavorite={selected && progress.favorites.includes(selected.id)} isNext={selected && progress.nextShift.includes(selected.id)} onClose={() => setSelected(null)} onPrevious={() => move(-1)} onNext={() => move(1)} onToggleComplete={() => toggleInList('completedTechniques', selected.id)} onToggleFavorite={() => toggleInList('favorites', selected.id)} onToggleNext={() => toggleInList('nextShift', selected.id)} />
  </div>;
}

function ScriptsPage({ progress, toggleInList }) {
  const [open, setOpen] = useState(null);
  return <div className="page"><PageIntro eyebrow="30 ROTEIROS DO PRODUTO PRINCIPAL" title="Roteiros de Serviço" text="Sequências completas para transformar técnicas isoladas em uma execução organizada." /><ProgressBar value={Math.round(progress.completedScripts.length / 30 * 100)} label={`${progress.completedScripts.length} de 30 concluídos`} />
    <div className="scriptGrid">{serviceScripts.map((script,index) => <article className={`scriptCard ${open === script.id ? 'open' : ''}`} key={script.id}><button className="scriptSummary" onClick={() => setOpen(open === script.id ? null : script.id)}><span>{String(index + 1).padStart(2,'0')}</span><div><small>{script.category}</small><h3>{script.title}</h3><p>{script.duration} · {script.environment}</p></div><b>{open === script.id ? '−' : '+'}</b></button>{open === script.id && <div className="scriptBody"><section><small>SITUAÇÃO</small><p>{script.situation}</p></section><section><small>OBJETIVO</small><p>{script.objective}</p></section><div className="scriptColumns"><div><h4>Preparação</h4><ul>{script.preparation.map(item => <li key={item}>{item}</li>)}</ul></div><div><h4>Sequência de ações</h4><ol>{script.actions.map(item => <li key={item}>{item}</li>)}</ol></div></div><div className="attentionBox"><b>Pontos de atenção</b><p>{script.attention}</p><b>Evite</b><p>{script.avoid}</p></div><div className="miniChecklist">{script.checklist.map(item => <span key={item}>✓ {item}</span>)}</div><button className="primaryButton" onClick={() => toggleInList('completedScripts', script.id)}>{progress.completedScripts.includes(script.id) ? '✓ Roteiro concluído' : 'Marcar roteiro como concluído'}</button></div>}</article>)}</div>
  </div>;
}

function MemoryPage({ progress, toggleInList }) {
  const [answers,setAnswers] = useState({});
  return <div className="page"><PageIntro eyebrow="BÔNUS 01" title="Memorização e Agilidade no Salão" text="Organização mental e controle operacional para manter a sequência mesmo sob pressão." /><div className="lessonGrid">{memoryLessons.map((lesson,index) => <article className="lessonCard" key={lesson.id}><span className="lessonNumber">{String(index + 1).padStart(2,'0')}</span><h3>{lesson.title}</h3><p>{lesson.description}</p><div className="exerciseBox"><small>EXERCÍCIO RÁPIDO</small><p>{lesson.exercise}</p><textarea value={answers[lesson.id] || ''} onChange={e => setAnswers({...answers,[lesson.id]:e.target.value})} placeholder="Registre sua resposta ou estratégia..." /></div><button className={progress.completedMemory.includes(lesson.id) ? 'primaryButton complete' : 'primaryButton'} onClick={() => toggleInList('completedMemory',lesson.id)}>{progress.completedMemory.includes(lesson.id) ? '✓ Concluído' : 'Concluir conteúdo'}</button></article>)}</div></div>;
}

function ChecklistsPage({ progress, update }) {
  const [focus,setFocus] = useState(null);
  const toggleItem = (listId,index) => { const current = progress.checklistItems[listId] || []; const next = current.includes(index) ? current.filter(value => value !== index) : [...current,index]; update({ checklistItems: {...progress.checklistItems,[listId]:next}, startedChecklists: progress.startedChecklists.includes(listId) ? progress.startedChecklists : [...progress.startedChecklists,listId] }); };
  const clear = id => update({ checklistItems: {...progress.checklistItems,[id]:[]} });
  return <div className="page"><PageIntro eyebrow="BÔNUS 02" title="Checklists do Serviço Profissional" text="Abra no celular, marque durante o turno e mantenha os detalhes sob controle." /><div className="checklistGrid">{checklists.map(list => { const checked = progress.checklistItems[list.id] || []; const value = Math.round(checked.length / list.items.length * 100); return <article className="checklistCard" key={list.id}><div className="checklistHead"><Icon>✓</Icon><span>{list.items.length} itens</span></div><h3>{list.title}</h3><ProgressBar value={value} label={value === 100 ? 'Concluído' : 'Progresso'} /><div className="checklistPreview">{list.items.slice(0,3).map((item,index) => <label key={item}><input type="checkbox" checked={checked.includes(index)} onChange={() => toggleItem(list.id,index)} /><span>{item}</span></label>)}</div><button className="primaryButton" onClick={() => setFocus(list)}>USAR NESTE TURNO →</button></article>; })}</div>
    {focus && <div className="viewerBackdrop focusBackdrop"><article className="focusChecklist"><header><div><small>MODO FOCO</small><h2>{focus.title}</h2></div><button className="iconButton" onClick={() => setFocus(null)}>×</button></header><ProgressBar value={Math.round((progress.checklistItems[focus.id] || []).length / focus.items.length * 100)} label="Checklist do turno" /><div className="focusItems">{focus.items.map((item,index) => <label key={item}><input type="checkbox" checked={(progress.checklistItems[focus.id] || []).includes(index)} onChange={() => toggleItem(focus.id,index)} /><span>{item}</span></label>)}</div><footer><button onClick={() => clear(focus.id)}>Limpar marcações</button><button onClick={() => window.print()}>Imprimir</button><button className="primaryButton" onClick={() => setFocus(null)}>Salvar e fechar</button></footer></article></div>}
  </div>;
}

function PosturePage({ progress, toggleInList, update }) {
  const score = Object.values(progress.assessment).filter(Boolean).length;
  return <div className="page"><PageIntro eyebrow="BÔNUS 03" title="Postura e Presença Profissional" text="Refine os sinais visuais que transmitem serenidade, controle e disponibilidade." /><div className="postureGrid">{postureLessons.map((lesson,index) => <article className="postureCard" key={lesson.id}><div className="postureVisual"><span className="awkwardFigure">×</span><span className="professionalFigure">✓</span></div><span className="lessonNumber">AULA {String(index+1).padStart(2,'0')}</span><h3>{lesson.title}</h3><div className="comparison"><div><small>DESAJEITADO</small><p>{lesson.awkward}</p></div><div><small>PROFISSIONAL</small><p>{lesson.professional}</p></div></div><ul>{lesson.corrections.map(item => <li key={item}>{item}</li>)}</ul><div className="exerciseBox"><small>AUTOAVALIAÇÃO</small><p>{lesson.exercise}</p><b>Resultado: {lesson.result}</b></div><button className="primaryButton" onClick={() => toggleInList('completedPosture',lesson.id)}>{progress.completedPosture.includes(lesson.id) ? '✓ Aula concluída' : 'Concluir aula'}</button></article>)}</div>
    <section className="assessment"><div><span className="eyebrow">CHECKLIST DE AUTOAVALIAÇÃO</span><h2>Como está sua presença hoje?</h2><p>Marque o que já faz com consistência. Esta é uma referência prática, não um teste psicológico.</p></div><div className="assessmentItems">{postureAssessment.map((item,index) => <label key={item}><input type="checkbox" checked={Boolean(progress.assessment[index])} onChange={e => update({ assessment: {...progress.assessment,[index]:e.target.checked} })} /><span>{item}</span></label>)}</div><div className="scoreCard"><strong>{score}<small>/8</small></strong><p>{score >= 7 ? 'Presença consistente. Continue refinando pequenos detalhes.' : score >= 4 ? 'Boa base. Escolha dois pontos para praticar no próximo turno.' : 'Comece por postura neutra, mãos e ritmo de caminhada.'}</p></div></section>
  </div>;
}

function NextShiftPage({ progress, toggleInList, update }) {
  const items = progress.nextShift.map(id => techniques.find(item => item.id === id)).filter(Boolean);
  return <div className="page"><PageIntro eyebrow="PLANO DE APLICAÇÃO" title="Aplicar no próximo turno" text={`Técnicas escolhidas para aplicar: ${items.length}`} />{items.length ? <><div className="nextShiftList">{items.map((item,index) => <article key={item.id}><span>{index+1}</span><div><small>{item.block}</small><h3>{item.title}</h3><p>{item.quickTip}</p></div><button onClick={() => { toggleInList('completedTechniques',item.id); toggleInList('nextShift',item.id); }}>✓ Aplicada</button><button onClick={() => toggleInList('nextShift',item.id)}>Remover</button></article>)}</div><button className="dangerLink" onClick={() => update({nextShift:[]})}>Limpar lista</button></> : <EmptyState icon="◷" title="Seu próximo turno ainda está vazio" text="Abra uma técnica e marque “Aplicar no próximo turno” para criar seu plano prático." />}</div>;
}

function CertificatePage({ progress, stats, update }) {
  const completedDate = new Intl.DateTimeFormat('pt-BR',{dateStyle:'long'}).format(new Date());
  return <div className="page certificatePage"><PageIntro eyebrow="CONCLUSÃO" title="Certificado de Aprimoramento Profissional" text="Seu certificado é liberado ao concluir 80% das técnicas, 20 roteiros e os três módulos de bônus." />
    {!stats.certificateUnlocked && <div className="lockedCard"><Icon>◇</Icon><h2>Certificado ainda bloqueado</h2><p>Continue seu aprimoramento para cumprir os requisitos.</p><div className="requirementGrid"><ProgressBar value={stats.techniquePercent} label="Técnicas: mínimo 80%" /><ProgressBar value={stats.scriptPercent} label="Roteiros: mínimo 20" /><ProgressBar value={stats.bonusPercent} label="Módulos de bônus" /></div></div>}
    <div className={`certificateControls ${!stats.certificateUnlocked ? 'disabled' : ''}`}><label>Nome no certificado<input value={progress.studentName} onChange={e => update({studentName:e.target.value})} placeholder="Digite seu nome completo" disabled={!stats.certificateUnlocked} /></label><button className="primaryButton" onClick={() => window.print()} disabled={!stats.certificateUnlocked || !progress.studentName.trim()}>Imprimir / Salvar em PDF</button></div>
    <section className={`certificate ${!stats.certificateUnlocked ? 'locked' : ''}`}><div className="certificateBorder"><div className="certificateMark">GP</div><span>CERTIFICADO DIGITAL</span><h2>Certificado de<br/>Aprimoramento Profissional</h2><p>Certificamos que</p><h3>{progress.studentName || 'NOME DO ALUNO'}</h3><p>concluiu o material <strong>“+200 Técnicas para Servir como um Garçom Profissional”</strong>, dedicado ao aprimoramento de técnicas práticas de serviço, agilidade, postura, organização, elegância e atendimento.</p><div className="certificateDate">Concluído em {completedDate}</div><small>Certificado de conclusão de material digital. Não equivale a diploma ou certificação profissional reconhecida por órgão oficial.</small></div></section>
  </div>;
}

function PageIntro({ eyebrow,title,text }) { return <header className="pageIntro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>; }
function EmptyState({ icon,title,text,action }) { return <div className="emptyState"><Icon>{icon}</Icon><h2>{title}</h2><p>{text}</p>{action && <button className="primaryButton" onClick={action}>Limpar filtros</button>}</div>; }

export default function StudentArea() {
  const [route,setRoute] = useState(routeFromPath); const [drawer,setDrawer] = useState(false); const { progress,stats,toggleInList,update,reset } = useStudentProgress();
  useEffect(() => { const listener = () => setRoute(routeFromPath()); window.addEventListener('popstate',listener); return () => window.removeEventListener('popstate',listener); },[]);
  const navigate = next => { const path = next === 'dashboard' ? '/' : `/?pagina=${next}`; window.history.pushState({},'',path); setRoute(next); setDrawer(false); window.scrollTo({top:0,behavior:'smooth'}); };
  const [confirmReset,setConfirmReset] = useState(false);
  let content;
  if (route === 'tecnicas') content = <TechniquesPage progress={progress} toggleInList={toggleInList} update={update} />;
  else if (route === 'favoritos') content = <TechniquesPage progress={progress} toggleInList={toggleInList} update={update} initialFavoriteOnly />;
  else if (route === 'roteiros') content = <ScriptsPage progress={progress} toggleInList={toggleInList} />;
  else if (route === 'memorizacao') content = <MemoryPage progress={progress} toggleInList={toggleInList} />;
  else if (route === 'checklists') content = <ChecklistsPage progress={progress} update={update} />;
  else if (route === 'postura') content = <PosturePage progress={progress} toggleInList={toggleInList} update={update} />;
  else if (route === 'proximo-turno') content = <NextShiftPage progress={progress} toggleInList={toggleInList} update={update} />;
  else if (route === 'certificado') content = <CertificatePage progress={progress} stats={stats} update={update} />;
  else content = <Dashboard stats={stats} progress={progress} navigate={navigate} />;
  return <div className="studentApp"><aside className={`studentSidebar ${drawer ? 'drawerOpen' : ''}`}><div className="brand"><span>GP</span><div><strong>Garçom</strong><small>PROFISSIONAL</small></div><button className="drawerClose" onClick={() => setDrawer(false)}>×</button></div><nav>{navigation.map(([id,label,icon],index) => <button className={`${route === id || (id === 'dashboard' && !navigation.some(([item]) => item === route)) ? 'active' : ''} ${index === 1 ? 'mainNav' : ''}`} key={id} onClick={() => navigate(id)}><Icon>{icon}</Icon><span>{label}</span>{id === 'favoritos' && progress.favorites.length > 0 && <b>{progress.favorites.length}</b>}</button>)}</nav><div className="sidebarProgress"><ProgressBar value={stats.techniquePercent} label="Progresso geral" /><small>Seu avanço fica salvo neste dispositivo.</small></div><button className="resetButton" onClick={() => setConfirmReset(true)}>↺ Limpar progresso</button></aside>{drawer && <button className="drawerShade" aria-label="Fechar menu" onClick={() => setDrawer(false)} />}
    <main className="studentMain"><header className="studentTopbar"><button className="menuButton" onClick={() => setDrawer(true)}>☰</button><label className="topSearch"><span>⌕</span><input placeholder="Buscar nas 200 técnicas..." onFocus={() => navigate('tecnicas')} /></label><div className="topProgress"><span>{stats.techniquePercent}%</span><small>CONCLUÍDO</small></div><div className="avatar">GP</div></header>{content}</main>
    <nav className="mobileNav">{navigation.slice(0,5).map(([id,label,icon]) => <button className={route === id ? 'active' : ''} key={id} onClick={() => navigate(id)}><Icon>{icon}</Icon><span>{label === '+200 Técnicas' ? 'Técnicas' : label.split(' ')[0]}</span></button>)}</nav>
    {confirmReset && <div className="confirmBackdrop"><div className="confirmDialog"><Icon>↺</Icon><h2>Limpar todo o progresso?</h2><p>Técnicas, favoritos, checklists e nome do certificado serão removidos deste dispositivo.</p><div><button onClick={() => setConfirmReset(false)}>Cancelar</button><button className="dangerButton" onClick={() => { reset(); setConfirmReset(false); }}>Sim, limpar progresso</button></div></div></div>}
  </div>;
}
