export interface Config {
  app: {
    NAME: string;
    SLUG: string;
    VERSION: string;
    SCHEME: string;
  };
  components: {
    card: {
      dimensions: {
        width: string;
        margin: number;
      };
      animation: {
        flipDuration: number;
        swipeThreshold: number;
        rotationFactor: number;
      };
      style: {
        borderRadius: number;
        elevation: number;
        shadow: {
          color: string;
          offset: {
            width: number;
            height: number;
          };
          opacity: number;
          radius: number;
        };
        content: {
          padding: number;
        };
        loading: {
          height: number;
          backgroundColor: string;
        };
      };
    };
  };
}

export interface ConfigContextType {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}
