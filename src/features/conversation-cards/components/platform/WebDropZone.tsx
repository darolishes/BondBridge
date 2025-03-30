import React from "react";
import { StyleSheet, ViewStyle, processColor } from "react-native";

interface WebDropZoneProps {
  onDrop: (file: File) => void;
  onDragStateChange?: (isDragging: boolean) => void;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

type CSSStyle = Record<string, string | number>;

const convertStyleToCss = (style: ViewStyle): CSSStyle => {
  const result: CSSStyle = {};

  Object.entries(style).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Konvertiere camelCase zu kebab-case
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();

    // Spezielle Behandlung für Farben
    if (key.toLowerCase().includes("color")) {
      const colorValue = processColor(value);
      if (typeof colorValue === "number") {
        const r = (colorValue & 0xff0000) >> 16;
        const g = (colorValue & 0x00ff00) >> 8;
        const b = colorValue & 0x0000ff;
        result[cssKey] = `rgb(${r}, ${g}, ${b})`;
      } else {
        result[cssKey] = value as string;
      }
      return;
    }

    // Numerische Werte mit 'px' anhängen
    if (typeof value === "number" && !["opacity", "flex"].includes(key)) {
      result[cssKey] = `${value}px`;
      return;
    }

    result[cssKey] = value as string;
  });

  return result;
};

const flattenStyles = (styles?: ViewStyle | ViewStyle[]): ViewStyle => {
  if (!styles) return {};

  const styleArray = Array.isArray(styles) ? styles : [styles];
  return styleArray.reduce<ViewStyle>((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});
};

export const WebDropZone: React.FC<WebDropZoneProps> = ({
  onDrop,
  onDragStateChange,
  style,
  children,
}) => {
  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDragStateChange?.(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        onDrop(file);
      }
    },
    [onDrop, onDragStateChange]
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDragStateChange?.(true);
    },
    [onDragStateChange]
  );

  const handleDragLeave = React.useCallback(() => {
    onDragStateChange?.(false);
  }, [onDragStateChange]);

  const combinedStyles = React.useMemo(() => {
    const flatStyle = flattenStyles(style);
    return convertStyleToCss({
      ...styles.dropZone,
      ...flatStyle,
    });
  }, [style]);

  return (
    <div
      style={combinedStyles}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WebDropZone;
