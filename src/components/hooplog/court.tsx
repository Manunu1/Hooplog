import { View, Text } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { colors as c } from '@/constants/hooplog';
import { demoCourtColors } from '@/data/demo-court';
import { courtFrame, courtZones, paintPath, type CourtZoneId } from './court-geometry';

export { courtZones, type CourtZoneId } from './court-geometry';

type CourtProps = {
  heatmap?: boolean;
  /** Overrides one or more zone fills without changing geometry. */
  zoneColors?: Partial<Record<CourtZoneId, string>>;
};

export function Court({ heatmap = false, zoneColors }: CourtProps) {
  return (
    <View style={{ gap: 12 }} accessible accessibilityLabel="Media cancha de básquet con 14 zonas independientes. Visualización de ejemplo, sin registro de tiros.">
      <Svg width="100%" style={{ aspectRatio: courtFrame.width / courtFrame.height }} viewBox={`0 0 ${courtFrame.width} ${courtFrame.height}`} preserveAspectRatio="xMidYMid meet">
        <Rect x="2" y="2" width="316" height="242" rx="8" fill={c.court} stroke="#987C62" strokeWidth="2" />
        {courtZones.map(zone => (
          <Path
            key={zone.id}
            id={zone.id}
            d={zone.d}
            transform={'mirrored' in zone ? 'translate(320 0) scale(-1 1)' : undefined}
            fill={zoneColors?.[zone.id] ?? (heatmap ? demoCourtColors[zone.id] : c.court)}
            stroke="#987C62"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ))}
        {/* Decoration never owns a selectable region or intercepts its future touches. */}
        <G pointerEvents="none">
          <Path d={paintPath} fill={c.orange} fillOpacity={0.65} stroke="#987C62" strokeWidth="2" />
          <Path d="M146 22H174M160 22V30" stroke={c.rust} strokeWidth="2" fill="none" />
          <Circle cx="160" cy="37" r="7" stroke={c.rust} strokeWidth="2" fill="none" />
          <Path d="M140 72A20 20 0 0 1 180 72" stroke={c.rust} strokeOpacity={0.45} strokeWidth="1.5" fill="none" />
        </G>
      </Svg>
      {heatmap && <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
        {[
          { color: c.good, text: '>50%' },
          { color: c.court, text: '30–50%' },
          { color: c.low, text: '<30%' },
          { color: c.empty, text: 'Sin datos' },
        ].map(item => <View key={item.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><View style={{ width: 10, height: 10, backgroundColor: item.color, borderWidth: 1, borderColor: '#987C62' }} /><Text style={{ color: c.muted, fontSize: 10 }}>{item.text}</Text></View>)}
      </View>}
    </View>
  );
}
