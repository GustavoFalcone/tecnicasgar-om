import React from 'react';
import { AnnotationConnector, CollectionOrderDiagram, CorrectWrongMarker, DetailMagnifier, GlassPlacementDiagram, MovementArrows, PlateSupportDiagram, PostureAlignmentGuide, ServiceRouteMap, TablePositionMap, TrayDistributionDiagram, TrayWeightMap } from './ServiceDiagrams.jsx';
import { featuredDetailLabels } from './featuredEditorial.js';

const limited = items => (items || []).slice(0, 4);
function SceneImage({ image, item, className = '', variant = 'full' }) { return <img className={`scene-image scene-${variant} ${className}`} src={image} alt={`Demonstracao visual: ${item.title}`} loading="eager" decoding="async" />; }
function FamilyTag({ children }) { return <span className="family-tag">{children}</span>; }
function Diagram({ type }) { const maps = { trayWeight:<TrayWeightMap />, trayDistribution:<TrayDistributionDiagram />, plate:<PlateSupportDiagram />, glass:<GlassPlacementDiagram />, table:<TablePositionMap />, route:<ServiceRouteMap />, collection:<CollectionOrderDiagram />, posture:<PostureAlignmentGuide /> }; return <div className="diagram-plate">{maps[type]}</div>; }
function FeaturedFocus({ image, item, variation = 'full-body' }) { const labels = featuredDetailLabels[variation] || featuredDetailLabels['full-body']; return <div className="featured-focus">{labels.map((label,index)=><figure key={label}><SceneImage image={image} item={item} variant={`featured-${variation}-${index+1}`} /><figcaption><b>0{index+1}</b>{label}</figcaption></figure>)}</div>; }

export function AnnotatedHero({ item, image, calls, featured, variation }) {
  return <section className="family-stage annotated-hero"><figure className="photo-stage"><SceneImage image={image} item={item} /><Diagram type={image.includes('tray') ? 'trayWeight' : 'posture'} />{limited(calls).map((call,index)=><div className={`hero-call hero-call-${index+1}`} key={call}><AnnotationConnector from={index % 2 ? '82,20':'14,80'} to={index % 2 ? '58,42':'46,64'} /><i>{index+1}</i><span>{call}</span></div>)}{featured && <FeaturedFocus image={image} item={item} variation={variation} />}</figure><aside><FamilyTag>LEITURA TECNICA</FamilyTag><strong>O gesto certo aparece antes da velocidade.</strong><p>{item.quickTip}</p></aside></section>;
}

export function CorrectVsWrong({ item, image, calls, compareImage }) {
  return <section className="family-stage correct-vs-wrong"><article className="comparison-panel is-wrong"><figure><SceneImage image={compareImage || image} item={item} /><CorrectWrongMarker correct={false}/></figure><small>EVITE</small><p>{item.commonError}</p></article><div className="comparison-axis"><span>AJUSTE</span></div><article className="comparison-panel is-correct"><figure><SceneImage image={image} item={item} /><CorrectWrongMarker/></figure><small>PROFISSIONAL</small><div>{limited(calls).map(call=><b key={call}>{call}</b>)}</div></article></section>;
}

export function StepSequence({ item, image, calls }) {
  return <section className="family-stage step-sequence"><div className="sequence-track">{limited(calls).map((step,index)=><article key={step}><figure><SceneImage image={image} item={item} variant={`crop-${index+1}`} /><span>{String(index+1).padStart(2,'0')}</span>{index < 3 && <MovementArrows variant={index === 1 ? 'arc':'forward'} />}</figure><p>{step}</p></article>)}</div><Diagram type={image.includes('collecting') ? 'collection' : image.includes('drink') ? 'glass' : 'plate'} /></section>;
}

export function DetailZoom({ item, image, calls }) {
  return <section className="family-stage detail-zoom"><figure className="photo-stage"><SceneImage image={image} item={item} /><DetailMagnifier x={image.includes('three') ? 66 : 54} y="49" size="21"/></figure><div className="zoom-rail">{limited(calls).slice(0,3).map((detail,index)=><article key={detail}><figure><SceneImage image={image} item={item} variant={`detail-${index+1}`} /></figure><span><b>0{index+1}</b>{detail}</span></article>)}</div></section>;
}

export function TopView({ item, image, calls, featured, variation }) {
  return <section className="family-stage top-view"><figure className="photo-stage"><SceneImage image={image} item={item} /><Diagram type={image.includes('tray') ? 'trayDistribution' : 'table'} />{featured && <FeaturedFocus image={image} item={item} variation={variation} />}</figure><div className="top-labels">{limited(calls).map((call,index)=><span key={call}><b>{index+1}</b>{call}</span>)}</div></section>;
}

export function ServiceRoute({ item, image, calls, featured, variation }) {
  return <section className="family-stage service-route"><figure className="photo-stage"><SceneImage image={image} item={item} /><Diagram type="route" />{featured && <FeaturedFocus image={image} item={item} variation={variation} />}</figure><div className="route-priorities">{limited(calls).map((call,index)=><span key={call}><b>0{index+1}</b>{call}</span>)}</div></section>;
}

export function RealSituation({ item, image, calls, featured, variation }) {
  return <section className="family-stage real-situation"><figure className="photo-stage"><SceneImage image={image} item={item} /><span className="situation-label">SITUACAO REAL</span><MovementArrows variant="arc"/>{featured && <FeaturedFocus image={image} item={item} variation={variation} />}</figure><div className="decision-flow">{limited(calls).map((call,index)=><article key={call}><b>0{index+1}</b><span>{call}</span></article>)}</div><aside><small>DECISAO CERTA</small><strong>{item.doThis}</strong></aside></section>;
}

export function VisualChecklist({ item, image, calls, featured, variation }) {
  return <section className="family-stage visual-checklist"><figure className="photo-stage"><SceneImage image={image} item={item} /><Diagram type={image.includes('posture') ? 'posture' : 'trayWeight'} />{featured && <FeaturedFocus image={image} item={item} variation={variation} />}</figure><div className="checklist-board"><FamilyTag>CONFERENCIA</FamilyTag>{limited(calls).map((call,index)=><label key={call}><span>✓</span><b>{call}</b><small>0{index+1}</small></label>)}</div></section>;
}

export const familyComponents = { ANNOTATED_HERO:AnnotatedHero, CORRECT_VS_WRONG:CorrectVsWrong, STEP_SEQUENCE:StepSequence, DETAIL_ZOOM:DetailZoom, TOP_VIEW:TopView, SERVICE_ROUTE:ServiceRoute, REAL_SITUATION:RealSituation, VISUAL_CHECKLIST:VisualChecklist };
