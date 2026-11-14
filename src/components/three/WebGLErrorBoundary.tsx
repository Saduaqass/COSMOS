"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; label?: string };
type State = { failed: boolean };

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-[#071426] p-6 text-center text-sm text-[#94A3B8]" role="alert">
        {this.props.label ?? "Не удалось загрузить 3D-сцену. Попробуйте обновить страницу."}
      </div>;
    }
    return this.props.children;
  }
}
