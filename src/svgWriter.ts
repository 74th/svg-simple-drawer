import { Point, Rect } from "./lib";
import * as beautify from "xml-beautifier"
/**
 * SVGWriter
 */
export class SVGWriter {
	svg: SVGElement;
	source: HTMLTextAreaElement;

	constructor(svg: SVGElement, source: HTMLTextAreaElement) {
		this.svg = svg;
		this.source = source;
	}

	public addRect = (no: number, p: Rect) => {
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.style.fill = "orange";
		rect.style.stroke = "black";
		rect.style.strokeWidth = "1";
		rect.setAttribute("svgDrawerNo", no.toString());
		rect.setAttribute("x", p.p1.x.toString());
		rect.setAttribute("y", p.p1.y.toString());
		rect.setAttribute("width", (p.p2.x - p.p1.x).toString());
		rect.setAttribute("height", (p.p2.y - p.p1.y).toString());
		this.svg.appendChild(rect);
	}

	public setCounter = (no: number) => {
		this.svg.setAttribute("svgDrawerNoCounter", no.toString())
	}

	deleteRect = (n1: number) => {
	}
	updateRect = (n1: number) => {
	}

	public outputSource = () => {
		let source = this.svg.outerHTML;
		source = beautify(source);
		this.source.value = source;
	}
}