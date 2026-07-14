import { useCallback, useEffect, useMemo, useState } from 'react';
import { checklists } from '../data/content.js';

const STORAGE_KEY = 'garcom-profissional:student-progress:v1';
const initialState = {
  completedTechniques: [], favorites: [], nextShift: [], completedScripts: [],
  checklistItems: {}, completedMemory: [], completedPosture: [], studentName: '',
  lastTechnique: null, assessment: {}, startedChecklists: []
};

export function useStudentProgress() {
  const [progress, setProgress] = useState(() => {
    try { return { ...initialState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; }
    catch { return initialState; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);

  const toggleInList = useCallback((key, id) => setProgress(current => ({
    ...current, [key]: current[key].includes(id) ? current[key].filter(item => item !== id) : [...current[key], id]
  })), []);

  const update = useCallback((patch) => setProgress(current => ({ ...current, ...patch })), []);
  const reset = useCallback(() => setProgress(initialState), []);

  const stats = useMemo(() => {
    const completedChecklists = checklists.filter(list => list.items.every((_, index) => (progress.checklistItems[list.id] || []).includes(index))).length;
    return {
      techniquePercent: Math.round(progress.completedTechniques.length / 200 * 100),
      scriptPercent: Math.round(progress.completedScripts.length / 30 * 100),
      checklistPercent: Math.round(completedChecklists / 15 * 100),
      completedChecklists,
      bonusPercent: Math.round((progress.completedMemory.length / 12 + progress.completedPosture.length / 10 + completedChecklists / 15) / 3 * 100),
      certificateUnlocked: progress.completedTechniques.length >= 160 && progress.completedScripts.length >= 20 && progress.completedMemory.length >= 12 && progress.completedPosture.length >= 10 && completedChecklists >= 15
    };
  }, [progress]);

  return { progress, stats, toggleInList, update, reset };
}
