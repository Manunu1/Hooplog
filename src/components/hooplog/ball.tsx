import Svg, { Circle, Path } from "react-native-svg";
import { colors as c } from "@/constants/hooplog";
export function Ball() {
  return (
    <Svg
      width="100%"
      style={{ aspectRatio: 1.4 }}
      viewBox="0 0 300 220"
      accessibilityLabel="Pelota de básquet Hooplog"
    >
      <Circle cx="150" cy="110" r="100" fill={c.court} />
      <Circle
        cx="150"
        cy="110"
        r="74"
        fill={c.orange}
        stroke={c.ink}
        strokeWidth="3"
      />
      <Path
        d="M77 110H223M150 36V184M98 58Q192 110 98 162M202 58Q108 110 202 162"
        fill="none"
        stroke={c.ink}
        strokeWidth="3"
      />
      <Path
        d="M46 65L33 55M254 159L267 169M249 49L260 36"
        stroke={c.rust}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
}
