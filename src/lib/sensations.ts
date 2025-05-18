import type { Mood } from '@/types/mood';

export const sensationsByMood: Record<Mood, string[]> = {
  happy: ['Warm chest', 'Lightness', 'Smiling', 'Energy'],
  sad: ['Heavy chest', 'Tired', 'Tight throat', 'Empty'],
  angry: ['Hot', 'Tense', 'Clenched jaw', 'Fast heartbeat'],
  anxious: ['Butterflies', 'Sweaty', 'Shaky', 'Short breath'],
  excited: ['Goosebumps', 'Fast heartbeat', 'Wide eyes', 'Restless legs'],
  calm: ['Relaxed muscles', 'Slow breath', 'Soft smile', 'Steady heartbeat'],
  tired: ['Droopy eyes', 'Yawning', 'Heavy limbs', 'Slow movement'],
  grateful: ['Open chest', 'Warmth', 'Gentle smile', 'Relaxed'],
  stressed: ['Tense shoulders', 'Headache', 'Shallow breath', 'Restlessness'],
  neutral: ['Even breath', 'Relaxed', 'No strong sensation', 'Calm face'],
};