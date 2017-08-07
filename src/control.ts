import { EventEmitter2 } from "eventemitter2";
import { Point, Rect } from "./lib";
import { SVGWriter } from "./svgWriter";

export class Control extends EventEmitter2 {

	svgWriter: SVGWriter;
	counter: number;

	constructor() {
		super()
		this.counter = 0;
		this.on("rect", this.rect);
	}

	setSVGWriter = (svgWriter: SVGWriter) => {
		this.svgWriter = svgWriter;
	}

	rect = (rect: Rect) => {
		console.log("rect", rect);
		const no = this.counter++;
		this.svgWriter.addRect(no, rect);
		this.svgWriter.setCounter(no);
		this.svgWriter.outputSource();
	}
}