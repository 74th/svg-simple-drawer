
export interface Point {
	x: number
	y: number
}

export interface Rect {
	p1: Point
	p2: Point
}

export function createRect(p1: Point, p2: Point): Rect {
	const np1: Point = {
		x: p1.x < p2.x ? p1.x : p2.x,
		y: p1.y < p2.y ? p1.y : p2.y,
	};
	const np2: Point = {
		x: p1.x < p2.x ? p2.x : p1.x,
		y: p1.y < p2.y ? p2.y : p1.y,
	}
	return {
		p1: np1,
		p2: np2,
	}
}