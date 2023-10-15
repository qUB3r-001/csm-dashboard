import { MarkedDots, Point } from '@typings/index';

export function diffPoints(p1: Point, p2: Point): Point {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

export function addPoints(p1: Point, p2: Point): Point {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

export function scalePoint(p1: Point, scale: number): Point {
  return { x: p1.x / scale, y: p1.y / scale };
}

export function pointIsInsideCircle(
  center: Point,
  radius: number,
  p: Point,
): boolean {
  const distance = Math.sqrt((center.x - p.x) ** 2 + (center.y - p.y) ** 2);
  return distance <= radius;
}

export function findInteriorOfPointInArray(
  list: MarkedDots[],
  p: Point,
): MarkedDots[] {
  const updatedList = list.filter(
    (markedPoint) => !pointIsInsideCircle(markedPoint, 10, p),
  );
  return updatedList;
}
