import React from 'react';

const Gold = '#c6a15b';
const Ink = '#171717';

export function AnnotationConnector({ from = '18,20', to = '50,50' }) {
  return <svg className="annotation-connector" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d={`M${from} L${to}`} /><circle cx={to.split(',')[0]} cy={to.split(',')[1]} r="2.7" /></svg>;
}

export function DetailMagnifier({ x = 50, y = 50, size = 22 }) {
  return <span className="detail-magnifier" style={{ '--x': `${x}%`, '--y': `${y}%`, '--size': `${size}%` }} aria-hidden="true" />;
}

export function MovementArrows({ variant = 'forward' }) {
  const d = variant === 'arc' ? 'M14 76C35 15 66 15 87 46' : 'M10 52H86';
  return <svg className="movement-arrows" viewBox="0 0 100 100" aria-hidden="true"><defs><marker id={`arrow-${variant}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path fill={Gold} d="M0 0L0 6L7 3z" /></marker></defs><path d={d} markerEnd={`url(#arrow-${variant})`} /></svg>;
}

export function CorrectWrongMarker({ correct = true }) {
  return <span className={`correct-wrong-marker ${correct ? 'is-correct' : 'is-wrong'}`} aria-label={correct ? 'Correto' : 'Evite'}>{correct ? '✓' : '×'}</span>;
}

export function TrayWeightMap() {
  return <svg className="service-diagram tray-weight-map" viewBox="0 0 300 160" aria-label="Mapa de peso da bandeja"><ellipse cx="150" cy="85" rx="112" ry="42" fill="none" stroke="currentColor" strokeWidth="4"/><ellipse cx="150" cy="85" rx="28" ry="12" fill={Gold}/><path d="M150 20v130M55 85h190" stroke={Gold} strokeDasharray="6 6"/><circle cx="150" cy="85" r="7" fill={Ink}/><path d="M150 150v-35" stroke="currentColor" strokeWidth="4"/></svg>;
}

export function TrayDistributionDiagram() {
  return <svg className="service-diagram tray-distribution" viewBox="0 0 300 160" aria-label="Distribuição na bandeja"><ellipse cx="150" cy="82" rx="120" ry="48" fill="none" stroke="currentColor" strokeWidth="4"/><circle cx="95" cy="75" r="16" fill="none" stroke={Gold} strokeWidth="4"/><circle cx="150" cy="62" r="16" fill="none" stroke={Gold} strokeWidth="4"/><circle cx="205" cy="75" r="16" fill="none" stroke={Gold} strokeWidth="4"/><path d="M62 126h176" stroke="currentColor" strokeWidth="3"/></svg>;
}

export function PlateSupportDiagram() {
  return <svg className="service-diagram plate-support" viewBox="0 0 300 160" aria-label="Apoio correto dos pratos"><ellipse cx="160" cy="48" rx="80" ry="22" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M52 130C95 95 116 92 152 94" fill="none" stroke={Gold} strokeWidth="13" strokeLinecap="round"/><path d="M152 94c29 3 45 18 70 25" fill="none" stroke={Gold} strokeWidth="13" strokeLinecap="round"/><circle cx="146" cy="93" r="8" fill={Ink}/></svg>;
}

export function GlassPlacementDiagram() {
  return <svg className="service-diagram glass-placement" viewBox="0 0 300 160" aria-label="Posição do copo"><circle cx="125" cy="86" r="49" fill="none" stroke="currentColor" strokeWidth="4"/><circle cx="208" cy="48" r="19" fill="none" stroke={Gold} strokeWidth="5"/><path d="M174 80L197 61" stroke={Gold} strokeDasharray="5 5" strokeWidth="3"/><path d="M60 136h185" stroke="currentColor" strokeWidth="3"/></svg>;
}

export function TablePositionMap() {
  return <svg className="service-diagram table-position" viewBox="0 0 300 160" aria-label="Mapa de posição na mesa"><rect x="30" y="20" width="240" height="120" rx="45" fill="none" stroke="currentColor" strokeWidth="4"/><circle cx="150" cy="80" r="33" fill="none" stroke={Gold} strokeWidth="4"/><circle cx="222" cy="47" r="15" fill="none" stroke={Gold} strokeWidth="4"/><path d="M150 5v36M150 119v36M7 80h35M258 80h35" stroke="currentColor" strokeWidth="4"/></svg>;
}

export function ServiceRouteMap() {
  return <svg className="service-diagram service-route-map" viewBox="0 0 300 160" aria-label="Rota de serviço"><defs><marker id="route-end" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path fill={Gold} d="M0 0L0 6L7 3z" /></marker></defs><rect x="15" y="15" width="270" height="130" fill="none" stroke="currentColor" strokeWidth="3"/><rect x="70" y="48" width="55" height="35" rx="9" fill="none" stroke="currentColor" strokeWidth="3"/><rect x="180" y="92" width="55" height="35" rx="9" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M35 122C78 108 91 100 115 102S175 58 212 57 253 41 268 30" fill="none" stroke={Gold} strokeWidth="6" strokeDasharray="10 7" markerEnd="url(#route-end)"/></svg>;
}

export function CollectionOrderDiagram() {
  return <svg className="service-diagram collection-order" viewBox="0 0 300 160" aria-label="Ordem de recolhimento"><path d="M44 121H255" stroke="currentColor" strokeWidth="3"/><g fill="none" stroke={Gold} strokeWidth="4"><ellipse cx="75" cy="95" rx="34" ry="12"/><ellipse cx="145" cy="74" rx="34" ry="12"/><ellipse cx="215" cy="53" rx="34" ry="12"/></g><path d="M78 45L214 32" stroke={Gold} strokeWidth="4" strokeDasharray="7 7"/></svg>;
}

export function PostureAlignmentGuide() {
  return <svg className="service-diagram posture-alignment" viewBox="0 0 300 160" aria-label="Guia de alinhamento postural"><circle cx="150" cy="27" r="15" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M150 42v70M95 62h110M120 112l-18 34M180 112l18 34" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/><path d="M150 9v142" stroke={Gold} strokeWidth="3" strokeDasharray="6 6"/><path d="M95 62h110" stroke={Gold} strokeWidth="3"/></svg>;
}
