import type { CourtZoneId } from '@/components/hooplog/court-geometry';
import { colors as c } from '@/constants/hooplog';

// Illustrative colors only; no percentages or performance calculations.
export const demoCourtColors: Record<CourtZoneId, string> = {
  'corner-left': c.court,
  'corner-right': c.good,
  'wing-left': c.low,
  'wing-right': c.low,
  'mid-left': c.court,
  'mid-right': c.good,
  paint: c.orange,
  'free-throw': c.good,
  'mid-band-left': c.court,
  'mid-band-right': c.court,
  'top-mid': c.court,
  'arc-left': c.court,
  'arc-right': c.court,
  'arc-center': c.good,
};
