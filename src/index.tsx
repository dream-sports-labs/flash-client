import ServerDrivenUi from './NativeServerDrivenUi';

export function multiply(a: number, b: number): number {
  return ServerDrivenUi.multiply(a, b);
}
