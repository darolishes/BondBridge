import { ViewStyle, TextStyle, ImageStyle } from "react-native";

type RNStyle = ViewStyle | TextStyle | ImageStyle;
type WebStyle = React.CSSProperties;

// Mapping von React Native zu Web CSS Properties
const propertyMap: Record<string, string> = {
  backgroundColor: "backgroundColor",
  borderRadius: "borderRadius",
  padding: "padding",
  margin: "margin",
  flex: "flex",
  flexDirection: "flexDirection",
  justifyContent: "justifyContent",
  alignItems: "alignItems",
  width: "width",
  height: "height",
  transform: "transform",
};

// React Native spezifische Properties, die in Web ignoriert werden sollten
const rnOnlyProps = new Set([
  "elevation",
  "shadowOpacity",
  "shadowRadius",
  "shadowOffset",
  "aspectRatio",
]);

export function convertToWebStyle(style: RNStyle | null | undefined): WebStyle {
  if (!style) return {};

  const webStyle: Record<string, any> = {};

  for (const [key, value] of Object.entries(style)) {
    // Überspringe null oder undefined Werte
    if (value == null) continue;

    // Ignoriere RN-spezifische Properties
    if (rnOnlyProps.has(key)) continue;

    // Konvertiere die Property wenn ein Mapping existiert
    const webKey = propertyMap[key] || key;

    // Spezielle Behandlung für verschiedene Werttypen
    if (key === "transform") {
      webStyle[webKey] = convertTransform(value as any[]);
    } else if (
      typeof value === "number" &&
      !["flex", "opacity", "zIndex"].includes(key)
    ) {
      // Füge 'px' für numerische Werte hinzu, außer bei speziellen Properties
      webStyle[webKey] = `${value}px`;
    } else {
      webStyle[webKey] = value;
    }
  }

  return webStyle as WebStyle;
}

function convertTransform(
  transforms: Array<Record<string, number | string>> | undefined
): string {
  if (!transforms) return "";

  return transforms
    .map((transform) => {
      const [key, value] = Object.entries(transform)[0];
      switch (key) {
        case "translateX":
        case "translateY":
          return `${key}(${typeof value === "number" ? value + "px" : value})`;
        case "scale":
        case "scaleX":
        case "scaleY":
          return `${key}(${value})`;
        case "rotate":
          return `${key}(${typeof value === "number" ? value + "deg" : value})`;
        default:
          return `${key}(${value})`;
      }
    })
    .join(" ");
}

export function mergeStyles(
  ...styles: (RNStyle | null | undefined)[]
): RNStyle {
  const validStyles = styles.filter((style): style is RNStyle => style != null);
  return Object.assign({}, ...validStyles);
}

export function convertStyleToWeb(
  style: RNStyle | RNStyle[] | null | undefined
): WebStyle {
  if (!style) return {};

  if (Array.isArray(style)) {
    return convertToWebStyle(mergeStyles(...style));
  }

  return convertToWebStyle(style);
}

// Typ-Guard für RNStyle
export function isRNStyle(style: any): style is RNStyle {
  return style != null && typeof style === "object" && !Array.isArray(style);
}
