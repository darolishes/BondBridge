import { Platform } from "react-native";
import { BrowserOptimizationAdapter } from "./BrowserOptimizationAdapter";

interface Point {
  x: number;
  y: number;
}

interface SwipeState {
  startPoint: Point | null;
  currentPoint: Point | null;
  startTime: number;
  isActive: boolean;
}

export interface SwipeConfig {
  element: HTMLElement;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeProgress?: (progress: number) => void;
  swipeThreshold?: number;
  velocityThreshold?: number;
  cssTransition?: string;
}

export class WebSwipeAdapter {
  private element: HTMLElement;
  private config: Required<SwipeConfig>;
  private state: SwipeState;
  private animationFrame: number | null = null;
  private browserOptimizations: BrowserOptimizationAdapter | null = null;

  private readonly DEFAULT_CONFIG = {
    swipeThreshold: 100,
    velocityThreshold: 0.5,
    cssTransition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  constructor(config: SwipeConfig) {
    if (Platform.OS !== "web") {
      throw new Error(
        "WebSwipeAdapter kann nur in Web-Umgebung verwendet werden"
      );
    }

    this.element = config.element;
    this.config = {
      ...this.DEFAULT_CONFIG,
      ...config,
    } as Required<SwipeConfig>;

    this.state = {
      startPoint: null,
      currentPoint: null,
      startTime: 0,
      isActive: false,
    };

    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.browserOptimizations = await BrowserOptimizationAdapter.getInstance();
    await this.setupElement();
    this.attachEventListeners();
  }

  private async setupElement(): Promise<void> {
    if (!this.browserOptimizations) return;

    const style = this.element.style;
    const optimizedStyles = this.browserOptimizations.getBrowserStyles();

    Object.assign(style, optimizedStyles);
  }

  private attachEventListeners(): void {
    if (!this.browserOptimizations) return;

    const eventOptions = this.browserOptimizations.getEventOptions();

    // Touch Events mit optimierten Optionen
    this.element.addEventListener(
      "touchstart",
      this.handleTouchStart,
      eventOptions
    );
    document.addEventListener("touchmove", this.handleTouchMove, {
      ...eventOptions,
      passive: false,
    });
    document.addEventListener("touchend", this.handleTouchEnd, eventOptions);

    // Mouse Events mit optimierten Optionen
    this.element.addEventListener(
      "mousedown",
      this.handleMouseDown,
      eventOptions
    );
    document.addEventListener("mousemove", this.handleMouseMove, eventOptions);
    document.addEventListener("mouseup", this.handleMouseUp, eventOptions);
  }

  private handleTouchStart = (event: TouchEvent): void => {
    const touch = event.touches[0];
    this.startSwipe({ x: touch.clientX, y: touch.clientY });
  };

  private handleTouchMove = (event: TouchEvent): void => {
    if (!this.state.isActive) return;

    const touch = event.touches[0];
    this.updateSwipe({ x: touch.clientX, y: touch.clientY });
    event.preventDefault();
  };

  private handleTouchEnd = (): void => {
    this.endSwipe();
  };

  private handleMouseDown = (event: MouseEvent): void => {
    this.startSwipe({ x: event.clientX, y: event.clientY });
  };

  private handleMouseMove = (event: MouseEvent): void => {
    if (!this.state.isActive) return;
    this.updateSwipe({ x: event.clientX, y: event.clientY });
  };

  private handleMouseUp = (): void => {
    this.endSwipe();
  };

  private startSwipe(point: Point): void {
    this.state = {
      startPoint: point,
      currentPoint: point,
      startTime: Date.now(),
      isActive: true,
    };

    // Entferne Transition für sofortige Reaktion
    this.element.style.transition = "none";
  }

  private updateSwipe(point: Point): void {
    if (
      !this.state.startPoint ||
      !this.state.isActive ||
      !this.browserOptimizations
    )
      return;

    this.state.currentPoint = point;
    const deltaX = point.x - this.state.startPoint.x;

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.animationFrame = requestAnimationFrame(() => {
      // Optimierte Transform-Anwendung basierend auf Browser-Funktionen
      const transform =
        this.browserOptimizations?.getBrowserStyles().transform ||
        "translateZ(0)";
      this.element.style.transform = `${transform} translateX(${deltaX}px)`;

      const progress = Math.abs(deltaX) / this.config.swipeThreshold;
      this.config.onSwipeProgress?.(Math.min(progress, 1));
    });
  }

  private async endSwipe(): Promise<void> {
    if (
      !this.state.startPoint ||
      !this.state.currentPoint ||
      !this.state.isActive ||
      !this.browserOptimizations
    )
      return;

    const deltaX = this.state.currentPoint.x - this.state.startPoint.x;
    const deltaTime = Date.now() - this.state.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;

    // Optimierte Transition basierend auf Bewegungseinstellungen
    const isReducedMotion =
      this.browserOptimizations.isReducedMotionPreferred();
    this.element.style.transition = isReducedMotion
      ? "none"
      : this.config.cssTransition;

    if (
      Math.abs(deltaX) > this.config.swipeThreshold ||
      velocity > this.config.velocityThreshold
    ) {
      const isLeftSwipe = deltaX < 0;
      const finalPosition = isLeftSwipe
        ? -this.element.offsetWidth
        : this.element.offsetWidth;

      // Optimierte Transform-Anwendung
      const transform =
        this.browserOptimizations.getBrowserStyles().transform ||
        "translateZ(0)";
      this.element.style.transform = `${transform} translateX(${finalPosition}px)`;

      if (isLeftSwipe) {
        this.config.onSwipeLeft?.();
      } else {
        this.config.onSwipeRight?.();
      }
    } else {
      // Zurück zur Ausgangsposition
      const transform =
        this.browserOptimizations.getBrowserStyles().transform ||
        "translateZ(0)";
      this.element.style.transform = `${transform} translateX(0)`;
    }

    this.state.isActive = false;
    this.animationFrame = null;
  }

  public cleanup(): void {
    if (!this.browserOptimizations) return;

    const eventOptions = this.browserOptimizations.getEventOptions();

    // Touch Events
    this.element.removeEventListener(
      "touchstart",
      this.handleTouchStart,
      eventOptions
    );
    document.removeEventListener(
      "touchmove",
      this.handleTouchMove,
      eventOptions
    );
    document.removeEventListener("touchend", this.handleTouchEnd, eventOptions);

    // Mouse Events
    this.element.removeEventListener(
      "mousedown",
      this.handleMouseDown,
      eventOptions
    );
    document.removeEventListener(
      "mousemove",
      this.handleMouseMove,
      eventOptions
    );
    document.removeEventListener("mouseup", this.handleMouseUp, eventOptions);

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
