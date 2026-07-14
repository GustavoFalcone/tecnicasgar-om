import { techniques } from '../data/techniques.js';
import { serviceScripts, checklists, postureLessons } from '../data/content.js';

export function validateStudentData() {
  const required = ['id','title','block','objective','when','level','environment','explanation','steps','doThis','avoid','commonError','result','quickTip','safety','visualType'];
  const errors = [];
  if (techniques.length !== 200) errors.push(`Esperadas 200 técnicas; encontradas ${techniques.length}.`);
  if (new Set(techniques.map(item => item.id)).size !== techniques.length) errors.push('Existem IDs de técnicas duplicados.');
  if (new Set(techniques.map(item => item.title)).size !== techniques.length) errors.push('Existem títulos de técnicas duplicados.');
  techniques.forEach(item => required.forEach(field => { if (!item[field] || (Array.isArray(item[field]) && !item[field].length)) errors.push(`${item.id}: campo ${field} ausente.`); }));
  if (serviceScripts.length !== 30) errors.push(`Esperados 30 roteiros; encontrados ${serviceScripts.length}.`);
  if (checklists.length !== 15) errors.push(`Esperados 15 checklists; encontrados ${checklists.length}.`);
  if (postureLessons.length !== 10) errors.push(`Esperadas 10 aulas; encontradas ${postureLessons.length}.`);
  if (errors.length) throw new Error(`Validação da área do aluno:\n${errors.join('\n')}`);
  return { techniques: techniques.length, scripts: serviceScripts.length, checklists: checklists.length, postureLessons: postureLessons.length };
}

