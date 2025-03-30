interface BrowserFeatures {
  hasTouch: boolean;
  hasReducedMotion: boolean;
  supportsPassiveEvents: boolean;
  supportsWebP: boolean;
  devicePixelRatio: number;
  browser: "chrome" | "safari" | "firefox" | "other";
  isHighPerformance: boolean;
}

interface OptimizationConfig {
  enableHardwareAcceleration: boolean;
  useCssTransforms: boolean;
  usePassiveEvents: boolean;
  preferReducedMotion: boolean;
  imageQuality: "low" | "medium" | "high";
}

export class BrowserOptimizationAdapter {
  private static instance: BrowserOptimizationAdapter;
  private features: BrowserFeatures | null = null;
  private config: OptimizationConfig | null = null;
  private initPromise: Promise<void>;

  private constructor() {
    this.initPromise = this.initialize();
  }

  public static async getInstance(): Promise<BrowserOptimizationAdapter> {
    if (!BrowserOptimizationAdapter.instance) {
      BrowserOptimizationAdapter.instance = new BrowserOptimizationAdapter();
    }
    await BrowserOptimizationAdapter.instance.initPromise;
    return BrowserOptimizationAdapter.instance;
  }

  private async initialize(): Promise<void> {
    this.features = await this.detectBrowserFeatures();
    this.config = this.generateConfig();
  }

  private async detectBrowserFeatures(): Promise<BrowserFeatures> {
    const ua = navigator.userAgent.toLowerCase();

    const [supportsPassiveEvents, supportsWebP] = await Promise.all([
      this.checkPassiveEventSupport(),
      this.checkWebPSupport(),
    ]);

    return {
      hasTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      hasReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
      supportsPassiveEvents,
      supportsWebP,
      devicePixelRatio: window.devicePixelRatio || 1,
      browser: this.detectBrowser(ua),
      isHighPerformance: this.checkPerformance(),
    };
  }

  private async checkPassiveEventSupport(): Promise<boolean> {
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
          return true;
        },
      });
      window.addEventListener("testPassive", null as any, opts);
      window.removeEventListener("testPassive", null as any, opts);
    } catch (e) {}
    return supportsPassive;
  }

  private async checkWebPSupport(): Promise<boolean> {
    const webP = new Image();
    webP.src =
      "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
    return new Promise<boolean>((resolve) => {
      webP.onload = webP.onerror = () => {
        resolve(webP.width === 1);
      };
    });
  }

  private detectBrowser(ua: string): BrowserFeatures["browser"] {
    if (ua.includes("chrome")) return "chrome";
    if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
    if (ua.includes("firefox")) return "firefox";
    return "other";
  }

  private checkPerformance(): boolean {
    const memory = (performance as any).memory;
    if (memory) {
      return memory.jsHeapSizeLimit > 2147483648; // 2GB
    }
    return true; // Standard: optimistisch sein
  }

  private generateConfig(): OptimizationConfig {
    if (!this.features) {
      throw new Error("Features wurden noch nicht initialisiert");
    }

    const { hasReducedMotion, supportsPassiveEvents, isHighPerformance } =
      this.features;

    return {
      enableHardwareAcceleration: isHighPerformance,
      useCssTransforms: !hasReducedMotion && isHighPerformance,
      usePassiveEvents: supportsPassiveEvents,
      preferReducedMotion: hasReducedMotion,
      imageQuality: this.determineImageQuality(),
    };
  }

  private determineImageQuality(): OptimizationConfig["imageQuality"] {
    if (!this.features) {
      throw new Error("Features wurden noch nicht initialisiert");
    }

    const { devicePixelRatio, isHighPerformance } = this.features;

    if (devicePixelRatio > 2 && isHighPerformance) return "high";
    if (devicePixelRatio > 1 || isHighPerformance) return "medium";
    return "low";
  }

  public getBrowserStyles(): Record<string, any> {
    if (!this.features || !this.config) {
      throw new Error("Adapter wurde noch nicht initialisiert");
    }

    const { browser, hasReducedMotion } = this.features;
    const { enableHardwareAcceleration, useCssTransforms } = this.config;

    const baseStyles = {
      touchAction: "pan-y",
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
    };

    const browserSpecificStyles: Record<
      BrowserFeatures["browser"],
      Record<string, any>
    > = {
      chrome: {
        ...baseStyles,
        ...(enableHardwareAcceleration && {
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }),
      },
      safari: {
        ...baseStyles,
        WebkitOverflowScrolling: "touch",
        ...(enableHardwareAcceleration && {
          transform: "translate3d(0,0,0)",
        }),
      },
      firefox: {
        ...baseStyles,
        scrollBehavior: hasReducedMotion ? "auto" : "smooth",
        ...(enableHardwareAcceleration && {
          willChange: "transform",
        }),
      },
      other: baseStyles,
    };

    return {
      ...browserSpecificStyles[browser],
      ...(useCssTransforms && {
        transition: hasReducedMotion
          ? "none"
          : "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }),
    };
  }

  public getEventOptions(): AddEventListenerOptions {
    if (!this.config) {
      throw new Error("Adapter wurde noch nicht initialisiert");
    }

    return {
      passive: this.config.usePassiveEvents,
      capture: false,
    };
  }

  public shouldUseWebP(): boolean {
    if (!this.features) {
      throw new Error("Features wurden noch nicht initialisiert");
    }
    return this.features.supportsWebP;
  }

  public getImageQuality(): OptimizationConfig["imageQuality"] {
    if (!this.config) {
      throw new Error("Adapter wurde noch nicht initialisiert");
    }
    return this.config.imageQuality;
  }

  public isReducedMotionPreferred(): boolean {
    if (!this.config) {
      throw new Error("Adapter wurde noch nicht initialisiert");
    }
    return this.config.preferReducedMotion;
  }

  public getDevicePixelRatio(): number {
    if (!this.features) {
      throw new Error("Features wurden noch nicht initialisiert");
    }
    return this.features.devicePixelRatio;
  }
}
