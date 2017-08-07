import { CursurBoard } from "./cursur";
import { SVGWriter } from "./svgWriter";
import { Control } from "./control";


const svgTag = (document.getElementById("svg") as any) as SVGElement;
const cursurSVGTag = (document.getElementById("cursurSvg") as any) as SVGElement;
const frontBoardTag = document.getElementById("frontBoard") as HTMLDivElement;
const sourceTag = document.getElementById("source") as HTMLTextAreaElement;

let clickMode = "grid";

const cursurBoard = new CursurBoard(frontBoardTag, cursurSVGTag)
const svgWriter = new SVGWriter(svgTag, sourceTag);
const controller = new Control();
cursurBoard.setController(controller);
controller.setSVGWriter(svgWriter);
