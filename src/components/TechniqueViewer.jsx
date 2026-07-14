import { CorrectWrongCard, VisualDemo } from './VisualDemo.jsx';

export function TechniqueViewer({ technique, isComplete, isFavorite, isNext, onToggleComplete, onToggleFavorite, onToggleNext, onClose, onPrevious, onNext }) {
  if (!technique) return null;
  return <div className="viewerBackdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <article className="techniqueViewer" role="dialog" aria-modal="true" aria-labelledby="technique-title">
      <header className="viewerHeader"><div><span>TÉCNICA {String(technique.number).padStart(3, '0')}</span><h2 id="technique-title">{technique.title}</h2></div><button className="iconButton" onClick={onClose} aria-label="Fechar">×</button></header>
      <div className="viewerBody">
        <div className="techniqueTags"><span>{technique.block}</span><span>{technique.level}</span><span>{technique.environment}</span></div>
        <VisualDemo type={technique.visualType} />
        <div className="infoGrid"><section><small>OBJETIVO</small><p>{technique.explanation}</p></section><section><small>QUANDO USAR</small><p>{technique.when}</p></section></div>
        <section className="stepsPanel"><span className="sectionLabel">PASSO A PASSO</span><ol>{technique.steps.map(step => <li key={step}>{step}</li>)}</ol></section>
        <CorrectWrongCard technique={technique} />
        <div className="resultGrid"><section><small>ERRO COMUM</small><p>{technique.commonError}</p></section><section><small>RESULTADO ESPERADO</small><p>{technique.result}</p></section><section><small>DICA RÁPIDA</small><p>{technique.quickTip}</p></section><section className="safety"><small>SEGURANÇA E HIGIENE</small><p>{technique.safety}</p></section></div>
      </div>
      <footer className="viewerFooter"><div className="viewerNav"><button onClick={onPrevious}>← Anterior</button><button onClick={onNext}>Próxima →</button></div><div className="viewerActions"><button className={isFavorite ? 'isActive' : ''} onClick={onToggleFavorite}>♡ {isFavorite ? 'Favoritada' : 'Favoritar'}</button><button className={isNext ? 'isActive' : ''} onClick={onToggleNext}>◎ {isNext ? 'No próximo turno' : 'Aplicar no próximo turno'}</button><button className="primaryButton" onClick={onToggleComplete}>{isComplete ? '✓ Concluída' : 'Marcar como concluída'}</button></div></footer>
    </article>
  </div>;
}

