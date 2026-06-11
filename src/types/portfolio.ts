export type ComponentType = "text" | "image" | "button" | "menu";

export type AnimationType = "none" | "fade-up" | "zoom-in" | "slide-left";

export type PortfolioComponent = {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  props: Record<string, unknown>;
  styles?: Record<string, unknown>;
  animation?: {
    type: AnimationType;
    duration?: number;
    delay?: number;
  };
};

export type PortfolioCanvas = {
  width: number;
  height: number;
  backgroundColor: string;
};

export type PortfolioData = {
  title: string;
  slug: string;
  canvas: PortfolioCanvas;
  components: PortfolioComponent[];
  isPublished: boolean;
};