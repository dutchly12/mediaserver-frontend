import type { Component } from 'vue';
import type { RouterLinkProps } from 'vue-router';

interface LayoutActionCommon {
  key: string;
  icon: Component;
}

interface LayoutButton extends LayoutActionCommon {
  type: 'button';
  callback: () => void;
}

interface LayoutLink extends LayoutActionCommon {
  type: 'link';
  to: RouterLinkProps['to'];
}

export type LayoutAction = LayoutButton | LayoutLink;

export interface LayoutOptions {
  title?: string;
  actions?: LayoutAction[];
}
