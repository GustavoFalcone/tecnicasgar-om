import { techniques } from '../src/data/techniques.js';
import { techniqueVisualMap, VISUAL_TYPES } from '../src/data/techniqueVisualMap.js';
import { buildDocumentManifest } from '../src/document/documentManifest.js';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const errors = [];
const techniqueIds = techniques.map(({ id }) => id);
const mapIds = techniqueVisualMap.map(({ techniqueId }) => techniqueId);
const duplicates = [...new Set(mapIds.filter((id, index) => mapIds.indexOf(id) !== index))];
const unknown = mapIds.filter(id => !techniqueIds.includes(id));
const missing = techniqueIds.filter(id => !mapIds.includes(id));

if (techniqueVisualMap.length !== 200) errors.push(`Expected 200 map records; received ${techniqueVisualMap.length}.`);
if (techniqueIds.length !== 200) errors.push(`Expected 200 source techniques; received ${techniqueIds.length}.`);
const techniquePages = buildDocumentManifest().filter(page => page.type === 'technique');
if (techniquePages.length !== 200) errors.push(`Expected 200 document technique pages; received ${techniquePages.length}.`);
if (duplicates.length) errors.push(`Duplicate technique IDs: ${duplicates.join(', ')}.`);
if (unknown.length) errors.push(`Unknown technique IDs: ${unknown.join(', ')}.`);
if (missing.length) errors.push(`Missing technique IDs: ${missing.join(', ')}.`);

techniqueVisualMap.forEach((record, index) => {
  const required = ['techniqueId','visualType','primaryAsset','diagram','titlePosition','imagePosition','lightOrDark','callouts','featuredVisual','visualVariation'];
  const absent = required.filter(key => record[key] === undefined || record[key] === null || record[key] === '');
  if (absent.length) errors.push(`${record.techniqueId}: missing ${absent.join(', ')}.`);
  if (!VISUAL_TYPES.includes(record.visualType)) errors.push(`${record.techniqueId}: missing or invalid visualType.`);
  if (!['light','dark'].includes(record.lightOrDark)) errors.push(`${record.techniqueId}: invalid lightOrDark.`);
  if (!Array.isArray(record.callouts) || !record.callouts.length) errors.push(`${record.techniqueId}: callouts must be populated.`);
  if (!existsSync(resolve('public', record.primaryAsset.replace(/^\//, '')))) errors.push(`${record.techniqueId}: missing asset ${record.primaryAsset}.`);
  if (index >= 3 && techniqueVisualMap.slice(index - 3, index + 1).every(item => item.visualType === record.visualType)) errors.push(`${record.techniqueId}: visualType repeats more than three times consecutively.`);
});

const featured = techniqueVisualMap.filter(item => item.featuredVisual);
if (featured.length !== 24) errors.push(`Expected 24 featured visuals; received ${featured.length}.`);
for (const blockId of new Set(techniques.map(item => item.blockId))) {
  const count = featured.filter(item => techniques.find(technique => technique.id === item.techniqueId)?.blockId === blockId).length;
  if (count < 2) errors.push(`${blockId}: expected at least two featured techniques; received ${count}.`);
}

if (errors.length) {
  console.error('Technique visual map validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`Technique visual map valid: ${techniqueVisualMap.length} records, ${techniquePages.length} document pages, ${featured.length} featured visuals, 0 duplicate IDs, all assets present.`);
