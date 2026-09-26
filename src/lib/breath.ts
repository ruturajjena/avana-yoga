/**
 * Tiny store coordinating the persistent WebGL "breath field".
 * Sections push a target state while they are in view; the most recently
 * activated section wins. The renderer subscribes and tweens its uniforms.
 */
export type BreathState = 'off' | 'ripples' | 'mandala' | 'seed';
export type BreathTarget = { state: BreathState; center?: [number, number]; intensity?: number };

const active = new Map<string, BreathTarget>();
const order: string[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export const breath = {
  push(id: string, target: BreathTarget) {
    active.set(id, target);
    const existing = order.indexOf(id);
    if (existing >= 0) order.splice(existing, 1);
    order.push(id);
    emit();
  },
  remove(id: string) {
    if (!active.delete(id)) return;
    const index = order.indexOf(id);
    if (index >= 0) order.splice(index, 1);
    emit();
  },
  current(): BreathTarget | null {
    const id = order[order.length - 1];
    return id ? (active.get(id) ?? null) : null;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
