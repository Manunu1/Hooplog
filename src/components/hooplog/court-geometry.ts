// Geometry only: coordinates follow the attached reference, with exact mirrored edges.
type Point = readonly [number, number];
type Curve = readonly [Point, Point, Point];
const inner: Curve = [[84, 80], [160, 200], [236, 80]];
const middle: Curve = [[40, 112], [160, 260], [280, 112]];
const outer: Curve = [[4, 145], [160, 299], [316, 145]];
const point = (curve: Curve, t: number): Point => [
  (1 - t) ** 2 * curve[0][0] + 2 * (1 - t) * t * curve[1][0] + t ** 2 * curve[2][0],
  (1 - t) ** 2 * curve[0][1] + 2 * (1 - t) * t * curve[1][1] + t ** 2 * curve[2][1],
];
const xy = ([x, y]: Point) => `${x.toFixed(4)} ${y.toFixed(4)}`;
const move = (p: Point) => `M${xy(p)}`;
const line = (p: Point) => `L${xy(p)}`;
// Exact subcurve, including reverse traversal: adjacent zones share the same edge.
function arc(curve: Curve, start: number, end: number) {
  const p = point(curve, start);
  const coordinate = (axis: 0 | 1) => p[axis] + (end - start) * (
    (1 - start) * (curve[1][axis] - curve[0][axis]) +
    start * (curve[2][axis] - curve[1][axis])
  );
  const control: Point = [coordinate(0), coordinate(1)];
  return `Q${xy(control)} ${xy(point(curve, end))}`;
}
const ring = (a: Curve, b: Curve, a0: number, a1: number, b0: number, b1: number) =>
  `${move(point(a, a0))}${arc(a, a0, a1)}${line(point(b, b1))}${arc(b, b1, b0)}Z`;
const leftCorner = `${move([4, 4])}H40V112${arc(middle, 0, 0.08)}${line(point(outer, 0.08))}${arc(outer, 0.08, 0)}Z`;
const leftWing = `${move([40, 4])}H84V80${arc(inner, 0, 0.08)}${line(point(middle, 0.08))}${arc(middle, 0.08, 0)}Z`;
const leftInterior = `${move([84, 4])}H132V72${line(point(inner, 0.2))}${arc(inner, 0.2, 0)}Z`;

export const courtFrame = { width: 320, height: 246 } as const;
export const paintPath = 'M132 4H188V72Q160 96 132 72Z';
export const courtZones = [
  { id: 'corner-left', d: leftCorner },
  { id: 'corner-right', d: leftCorner, mirrored: true },
  { id: 'wing-left', d: leftWing },
  { id: 'wing-right', d: leftWing, mirrored: true },
  { id: 'mid-left', d: leftInterior },
  { id: 'mid-right', d: leftInterior, mirrored: true },
  { id: 'paint', d: paintPath },
  { id: 'free-throw', d: `M132 72Q160 96 188 72${line(point(inner, 0.8))}${arc(inner, 0.8, 0.2)}Z` },
  { id: 'mid-band-left', d: ring(inner, middle, 0.08, 0.3, 0.08, 0.27) },
  { id: 'mid-band-right', d: ring(inner, middle, 0.08, 0.3, 0.08, 0.27), mirrored: true },
  { id: 'top-mid', d: ring(inner, middle, 0.3, 0.7, 0.27, 0.73) },
  { id: 'arc-left', d: ring(middle, outer, 0.08, 0.27, 0.08, 0.27) },
  { id: 'arc-right', d: ring(middle, outer, 0.08, 0.27, 0.08, 0.27), mirrored: true },
  { id: 'arc-center', d: ring(middle, outer, 0.27, 0.73, 0.27, 0.73) },
] as const satisfies readonly { id: string; d: string; mirrored?: boolean }[];
export type CourtZoneId = (typeof courtZones)[number]['id'];
