export interface Point {
  x: number;
  y: number;
}

export interface MarkedDots {
  x: number;
  y: number;
  realX: number;
  realY: number;
  loc: 'BACKGROUND' | 'OBJECT';
}
