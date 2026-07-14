import React from 'react';

const palettes = {
  bandejas: ['#a8762c', '#f4ead6'], pratos: ['#405b68', '#e5eef0'], bebidas: ['#2f665e', '#dcece7'],
  mesa: ['#8a5a43', '#efe3dc'], fluxo: ['#3e5f87', '#e1e8f1'], recolhimento: ['#6c6254', '#ebe6de'],
  postura: ['#7d514c', '#eee0dd'], comunicacao: ['#516738', '#e6ecd9'], refinamento: ['#95712f', '#f1e7cf'],
  imprevistos: ['#965143', '#f0dfdc']
};

const fixedPoints = [[105,75],[190,58],[278,88],[370,62],[468,92],[558,66],[650,92],[150,180],[255,205],[365,168],[480,208],[610,180]];
const value = (seed, offset, min, max) => min + ((seed * (offset * 19 + 31) + offset * 43) % (max - min + 1));
const words = text => text.replace(/[.,:;!?]/g, '').split(/\s+/).filter(Boolean);
const compact = (text, count = 4) => words(text).slice(0, count).join(' ');

function VisualFrame({ item, label, accent, pale, children, steps = [], className = '' }) {
  const visualNumber = item.number || item.itemNumber || 1;
  return (
    <figure className={`page-visual ${className}`} style={{ '--diagram-accent': accent, '--diagram-pale': pale }}>
      <div className="visual-topline"><span>{label}</span><strong>{compact(item.title, 7)}</strong><b>{String(visualNumber).padStart(3, '0')}</b></div>
      <div className="visual-code" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} className={visualNumber & (1 << index) ? 'active' : ''} />)}</div>
      <div className="visual-canvas">{children}</div>
      <figcaption>{steps.slice(0, 3).map((step, index) => <span key={`${step}-${index}`}><b>{index + 1}</b>{compact(step, 4)}</span>)}</figcaption>
    </figure>
  );
}

function Marker({ x, y, number, active = false }) {
  return <g transform={`translate(${x} ${y})`}><circle r="16" className={active ? 'svg-marker active' : 'svg-marker'} /><text className="svg-number" y="5">{number}</text></g>;
}

function TrayScene({ seed }) {
  const count = value(seed, 1, 5, 9);
  const chosen = fixedPoints.slice(0, count).map((_, index) => fixedPoints[(index * value(seed, 2, 3, 7) + seed) % fixedPoints.length]);
  return <svg viewBox="0 0 760 280" role="img" aria-label="Diagrama superior de equilíbrio de uma bandeja">
    <path className="svg-hand" d="M318 252c5-40 21-74 61-86 40 10 59 43 63 86" />
    <ellipse className="svg-surface" cx="380" cy="138" rx="305" ry="108" />
    <ellipse className="svg-guide" cx="380" cy="138" rx={80 + seed % 48} ry={48 + seed % 22} />
    <path className="svg-axis" d="M380 38v200M80 138h600" />
    {chosen.map(([x,y], index) => index % 3 === 0
      ? <g key={index}><circle className="svg-object" cx={x} cy={y} r={value(seed,index+3,15,26)} /><circle className="svg-detail" cx={x} cy={y} r="5" /></g>
      : <rect key={index} className="svg-object" x={x-19} y={y-13} width="38" height="26" rx="8" />)}
    <Marker x="380" y="138" number="C" active />
  </svg>;
}

function PlatesScene({ seed }) {
  const shift = value(seed, 2, -25, 25);
  return <svg viewBox="0 0 760 280" role="img" aria-label="Diagrama de apoio, transporte e entrega de pratos">
    <path className="svg-route" d={`M70 224 C180 ${80+shift}, 250 ${238-shift}, 385 126 S585 ${50+shift}, 700 92`} />
    {[150,330,525].map((x,index)=><g key={x} transform={`translate(${x} ${155 + (index-1)*shift/2})`}><circle className="svg-surface" r={58-index*5}/><circle className="svg-guide" r={39-index*4}/><path className="svg-detail-stroke" d="M-28 0h56M0-28v56" /></g>)}
    <path className="svg-hand" d="M92 230c45-26 86-25 123 2M267 227c48-27 89-25 128 3" />
    <Marker x="70" y="224" number="1"/><Marker x="385" y="126" number="2" active/><Marker x="700" y="92" number="3"/>
  </svg>;
}

function DrinksScene({ seed }) {
  const count = value(seed, 1, 4, 7);
  return <svg viewBox="0 0 760 280" role="img" aria-label="Diagrama de organização e serviço de bebidas">
    <ellipse className="svg-surface" cx="350" cy="210" rx="270" ry="38" />
    {Array.from({length:count},(_,index)=>{const x=125+index*(430/(count-1)); const h=value(seed,index+2,75,135); return <g key={index}><path className="svg-glass" d={`M${x-25} ${195-h}h50l-8 62c-2 18-32 18-34 0z`} /><path className="svg-liquid" d={`M${x-20} ${166-h/2}h40l-4 31h-32z`} /><path className="svg-detail-stroke" d={`M${x} 195v25m-24 0h48`} /></g>})}
    <path className="svg-route" d={`M600 ${55+seed%30}c72 5 92 72 45 120`} />
    <path className="svg-bottle" d="M588 38h45v28l18 22v92h-81V88l18-22z" />
    <Marker x="645" y="193" number="↓" active />
  </svg>;
}

function TableScene({ seed, communication = false, refinement = false }) {
  const seats = [[250,34],[380,34],[510,34],[630,110],[630,202],[510,247],[380,247],[250,247],[130,202],[130,110]];
  const target = seed % seats.length;
  const selected = seats[target];
  return <svg viewBox="0 0 760 280" role="img" aria-label={communication ? 'Mapa de leitura dos sinais da mesa' : refinement ? 'Mapa de alinhamento de uma mesa refinada' : 'Mapa de aproximação e serviço à mesa'}>
    {refinement && <g>{[220,300,380,460,540].map(x=><path key={x} className="svg-grid" d={`M${x} 52v176`}/>)}</g>}
    <rect className="svg-surface" x="185" y="57" width="390" height="166" rx={seed%2 ? 82 : 24} />
    <path className="svg-axis" d="M380 57v166M185 140h390" />
    {seats.map(([x,y],index)=><g key={index} transform={`translate(${x} ${y})`}><rect className={index===target?'svg-seat active':'svg-seat'} x="-28" y="-15" width="56" height="30" rx="10" />{communication&&index%3===seed%3&&<path className="svg-signal" d="M-8-25q8-12 16 0M-15-32q15-20 30 0"/>}</g>)}
    <path className="svg-route" d={`M52 246 C110 238, 96 150, 160 140 S${selected[0]-25} ${selected[1]+20}, ${selected[0]} ${selected[1]}`} />
    <Marker x={selected[0]} y={selected[1]} number={String(target+1)} active />
  </svg>;
}

function FlowScene({ seed }) {
  const order = [0,3,7,4,10,6].map((index,offset)=>(index+seed+offset)%fixedPoints.length);
  const route = order.map(index=>fixedPoints[index]);
  return <svg viewBox="0 0 760 280" role="img" aria-label="Mapa de rota e prioridades no salão">
    <path className="svg-wall" d="M55 45h650v190H55zM275 45v72h115m95-72v72h220M55 162h135v73m205-73v73" />
    {[110,230,345,465,585,660].map((x,index)=><rect key={x} className="svg-table" x={x-34} y={index%2?72:176} width="68" height="34" rx="9"/>)}
    <polyline className="svg-route" points={route.map(point=>point.join(',')).join(' ')} />
    {route.map(([x,y],index)=><Marker key={index} x={x} y={y} number={index+1} active={index===seed%route.length}/>)}
  </svg>;
}

function CollectScene({ seed }) {
  const leftCount=value(seed,1,3,6), rightCount=Math.max(1,leftCount-2);
  return <svg viewBox="0 0 760 280" role="img" aria-label="Sequência visual de recolhimento e reorganização">
    <rect className="svg-zone" x="55" y="48" width="270" height="185" rx="20"/><rect className="svg-zone clean" x="435" y="48" width="270" height="185" rx="20"/>
    {Array.from({length:leftCount},(_,i)=><circle key={i} className="svg-object" cx={105+(i%3)*82} cy={95+Math.floor(i/3)*82} r={20+i%2*7}/>)}
    {Array.from({length:rightCount},(_,i)=><g key={i}><circle className="svg-object" cx={505+i*92} cy="140" r="25"/><circle className="svg-guide" cx={505+i*92} cy="140" r="13"/></g>)}
    <path className="svg-route" d={`M330 140h95m-28-25 28 25-28 25`} />
    <text className="svg-label" x="190" y="265">RECOLHER</text><text className="svg-label" x="570" y="265">RECOMPOR</text>
  </svg>;
}

function Figure({ x, seed, professional = false }) {
  const lean = professional ? 0 : value(seed,3,-12,12);
  return <g transform={`translate(${x} 18) rotate(${lean} 0 120)`}><circle className={professional?'svg-head active':'svg-head'} cx="0" cy="35" r="22"/><path className={professional?'svg-body active':'svg-body'} d={`M0 58v90m0-62-48 ${95+seed%22}m48-9 48 ${92-seed%15}m-4 57 24 85m-68-85-24 85`}/>{professional&&<path className="svg-axis strong" d="M0 8v238"/>}</g>;
}

function PostureScene({ seed }) {
  return <svg viewBox="0 0 760 280" role="img" aria-label="Comparação visual de postura corporal"><Figure x="220" seed={seed}/><Figure x="540" seed={seed} professional/><path className="svg-divider" d="M380 35v210"/><text className="svg-label" x="220" y="265">AJUSTAR</text><text className="svg-label active" x="540" y="265">PROFISSIONAL</text></svg>;
}

function UnexpectedScene({ seed }) {
  const labels=['PARAR','PROTEGER','COMUNICAR','RETOMAR'];
  const points=[[130,value(seed,1,95,185)],[300,value(seed,2,45,105)],[470,value(seed,3,175,235)],[640,value(seed,4,90,190)]];
  return <svg viewBox="0 0 760 280" role="img" aria-label="Fluxo de resposta segura a um imprevisto">
    <path className="svg-route" d={`M${points.map(point=>point.join(' ')).join('L')}`}/>
    {points.map(([x,y],index)=><g key={labels[index]} transform={`translate(${x} ${y})`}><rect className={index===seed%4?'svg-phase active':'svg-phase'} x="-62" y="-36" width="124" height="72" rx="18"/><text className="svg-phase-number" y="-4">0{index+1}</text><text className="svg-label" y="17">{labels[index]}</text></g>)}
  </svg>;
}

function TechniqueScene({ item }) {
  const seed=item.number;
  switch(item.blockId){
    case 'bandejas': return <TrayScene seed={seed}/>;
    case 'pratos': return <PlatesScene seed={seed}/>;
    case 'bebidas': return <DrinksScene seed={seed}/>;
    case 'mesa': return <TableScene seed={seed}/>;
    case 'fluxo': return <FlowScene seed={seed}/>;
    case 'recolhimento': return <CollectScene seed={seed}/>;
    case 'postura': return <PostureScene seed={seed}/>;
    case 'comunicacao': return <TableScene seed={seed} communication/>;
    case 'refinamento': return <TableScene seed={seed} refinement/>;
    default: return <UnexpectedScene seed={seed}/>;
  }
}

export function TechniqueVisual({ item }) {
  const [accent,pale]=palettes[item.blockId]||palettes.refinamento;
  return <VisualFrame item={item} label={`DIAGRAMA • ${item.objective}`} accent={accent} pale={pale} steps={item.steps} className={`technique-visual scene-${item.blockId} variant-${item.number%6}`}><TechniqueScene item={item}/></VisualFrame>;
}

export function ScriptRouteVisual({ item, number }) {
  const visualItem={...item,number}; const [accent,pale]=palettes.fluxo;
  const route=[80,220,365,510,680].map((x,index)=>[x,55+value(number,index+1,15,155)]);
  return <VisualFrame item={visualItem} label="MAPA DO ROTEIRO" accent={accent} pale={pale} steps={item.actions} className={`route-visual variant-${number%5}`}><svg viewBox="0 0 760 280" role="img" aria-label={`Mapa do roteiro ${item.title}`}><path className="svg-wall" d="M45 32h670v210H45zM205 32v75m165-75v75m170-75v75M45 188h120m430 0h120"/><polyline className="svg-route" points={route.map(point=>point.join(',')).join(' ')}/>{route.map(([x,y],index)=><Marker key={index} x={x} y={y} number={index+1} active={index===number%5}/>)}{[150,300,455,610].map((x,index)=><rect key={x} className="svg-table" x={x-35} y={index%2?65:175} width="70" height="36" rx="8"/>)}</svg></VisualFrame>;
}

export function MemoryMapVisual({ item, number }) {
  const [accent,pale]=palettes.comunicacao; const visualItem={...item,number};
  const cells=Array.from({length:12},(_,index)=>({x:100+(index%4)*170,y:65+Math.floor(index/4)*75,order:(index*value(number,2,3,9)+number)%12})).sort((a,b)=>a.order-b.order);
  return <VisualFrame item={visualItem} label="MAPA DE MEMÓRIA" accent={accent} pale={pale} steps={['observe o mapa','agrupe por zonas','reconstrua a ordem']} className={`memory-visual variant-${number%4}`}><svg viewBox="0 0 760 280" role="img" aria-label={`Mapa de memória: ${item.title}`}>{cells.map((cell,index)=><g key={index} transform={`translate(${cell.x} ${cell.y})`}><rect className={index<4?'svg-memory active':'svg-memory'} x="-48" y="-23" width="96" height="46" rx="12"/><text className="svg-number" y="5">{String(cell.order+1).padStart(2,'0')}</text></g>)}<path className="svg-route" d={`M${cells[0].x} ${cells[0].y} Q380 ${40+number*5%150} ${cells[3].x} ${cells[3].y}`}/></svg></VisualFrame>;
}

export function ChecklistBoardVisual({ item, number }) {
  const [accent,pale]=palettes.refinamento; const visualItem={...item,number};
  return <VisualFrame item={visualItem} label="CONFERÊNCIA VISUAL" accent={accent} pale={pale} steps={item.items} className={`checklist-visual variant-${number%4}`}><svg viewBox="0 0 760 280" role="img" aria-label={`Quadro visual do checklist ${item.title}`}>{item.items.map((text,index)=>{const x=105+(index%2)*350,y=74+Math.floor(index/2)*112; return <g key={text} transform={`translate(${x} ${y})`}><rect className="svg-check-card" x="-55" y="-40" width="310" height="80" rx="16"/><circle className="svg-check-ring" cx="-18" cy="0" r="16"/><path className="svg-check" d="m-26 0 6 7 13-17"/><text className="svg-check-text" x="18" y="-4">{compact(text,4).toUpperCase()}</text><text className="svg-check-sub" x="18" y="15">VERIFICAR ANTES DO SERVIÇO</text></g>})}</svg></VisualFrame>;
}

export function PostureCoachVisual({ item, number }) {
  const [accent,pale]=palettes.postura; const visualItem={...item,number};
  return <VisualFrame item={visualItem} label="LEITURA CORPORAL" accent={accent} pale={pale} steps={item.corrections} className={`posture-coach-visual variant-${number%5}`}><PostureScene seed={number}/></VisualFrame>;
}
