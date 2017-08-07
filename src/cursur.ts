import { EventEmitter2 } from "eventemitter2";
import { GRID } from "./const";
import { Rect, Point, createRect } from "./lib";

const CURSUR_SIZE = 10;

export class CursurBoard {

	private div: HTMLDivElement;
	private svg: SVGElement;
	private cursurTag: SVGElement;
	/**
	 * mode
	 */
	private mode: string;
	private rectPoint: Point;
	private rectSVG: SVGElement;
	private controller: EventEmitter2;

	constructor(div: HTMLDivElement, svg: SVGElement) {
		this.div = div;
		this.svg = svg;
		this.addEvents();
	}

	public setController(cont: EventEmitter2) {
		this.controller = cont;
	}

	private addEvents = () => {

		this.div.addEventListener("mouseover", this.addCursur);
		this.div.addEventListener("mousemove", this.moveCursur);
		this.div.addEventListener("mouseleave", this.removeCursur);
		this.div.addEventListener("click", this.testClick);
	}

	addCursur = (e: MouseEvent) => {
		if (this.cursurTag) {
			this.moveCursur(e);
			return;
		}
		this.cursurTag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.cursurTag.setAttribute("width", "10");
		this.cursurTag.setAttribute("height", "10");
		this.cursurTag.setAttribute("x", "0");
		this.cursurTag.setAttribute("y", "0");

		const l1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		l1.setAttribute("x1", "0");
		l1.setAttribute("y1", "5");
		l1.setAttribute("x2", "10");
		l1.setAttribute("y2", "5");
		l1.setAttribute("stroke", "gray");
		const l2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		l2.setAttribute("x1", "5");
		l2.setAttribute("y1", "0");
		l2.setAttribute("x2", "5");
		l2.setAttribute("y2", "10");
		l2.setAttribute("stroke", "gray");
		this.cursurTag.appendChild(l1);
		this.cursurTag.appendChild(l2);
		this.svg.appendChild(this.cursurTag);

		this.moveCursur(e);
	}

	moveCursur = (e: MouseEvent) => {

		const p = getGrid(e.offsetX, e.offsetY)

		if (this.mode == "rect-end") {
			this.drawRectCursur(e);
		}

		this.cursurTag.setAttribute("x", (p.x - 5).toString());
		this.cursurTag.setAttribute("y", (p.y - 5).toString());

	}

	removeCursur = (e: MouseEvent) => {
		if (this.cursurTag === null) {
			return;
		}
		this.cursurTag.remove();
		this.cursurTag = null;
	}

	startRect = (e: MouseEvent) => {
		this.mode = "rect-end";
		this.rectPoint = getGrid(e.offsetX, e.offsetY);
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;
		rect.style.strokeWidth = "2";
		rect.style.stroke = "red";
		rect.style.fill = "none";

		this.svg.appendChild(rect);
		this.rectSVG = rect;

		this.moveCursur(e);
	}

	drawRectCursur = (e: MouseEvent) => {
		const p = getGrid(e.offsetX, e.offsetY);

		// if (p.x == this.rectPoint.x || p.y == this.rectPoint.y) {
		// 	this.rectSVG.style.visibility = "none";
		// } else {
		// 	this.rectSVG.style.visibility = "block";
		// }
		const start: Point = {
			x: this.rectPoint.x < p.x ? this.rectPoint.x : p.x,
			y: this.rectPoint.y < p.y ? this.rectPoint.y : p.y,
		}
		this.rectSVG.setAttribute("x", start.x.toString());
		this.rectSVG.setAttribute("y", start.y.toString());

		this.rectSVG.setAttribute("width", Math.abs(p.x - this.rectPoint.x).toString());
		this.rectSVG.setAttribute("height", Math.abs(p.y - this.rectPoint.y).toString());
	}

	endRect = () => {
		this.mode = "normal";
		this.rectSVG.remove();
		this.rectSVG = null;
	}

	testClick = (e: MouseEvent) => {
		if (this.mode == "rect-end") {
			this.endRect();
			this.controller.emit("rect", createRect(
				this.rectPoint,
				getGrid(e.offsetX, e.offsetY))
			);
			return;
		}
		this.startRect(e);
	}

}



function getGrid(x: number, y: number): Point {
	const gridX = Math.floor((x / GRID) + 0.5);
	const gridY = Math.floor((y / GRID) + 0.5);
	return {
		x: gridX * GRID,
		y: gridY * GRID,
	}
}