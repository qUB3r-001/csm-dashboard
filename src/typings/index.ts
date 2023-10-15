export interface Point {
  x: number;
  y: number;
}

export interface MarkedDots {
  x: number;
  y: number;
  loc: 'BACKGROUND' | 'OBJECT';
}
