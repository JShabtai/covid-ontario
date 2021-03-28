import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { phuMetadata } from './phuMetadata';

import { DataNames, DataFetcherService } from '../data-fetcher.service';

const interpolationSteps = 14;

interface ResponseFramework {
    [id: string]: {
        status: string;
        start: string;
        end: string;
    }[];
}

function getName(id: string) {
    switch (id) {
        case "2226":
            return "Algoma";
        case "2227":
            return "Brant";
        case "2230":
            return "Durham";
        case "2233":
            return "Grey Bruce";
        case "2234":
            return "Haldimand";
        case "2235":
            return "Haliburton";
        case "2236":
            return "Halton";
        case "2237":
            return "Hamilton";
        case "2238":
            return "Hastings";
        case "2240":
            return "Chatham";
        case "2241":
            return "Kingston";
        case "2242":
            return "Lambton";
        case "2243":
            return "Leeds";
        case "2244":
            return "London";
        case "2246":
            return "Niagara";
        case "2247":
            return "North Bay";
        case "2249":
            return "Northwestern";
        case "2251":
            return "Ottawa";
        case "2253":
            return "Peel";
        case "2255":
            return "Peterborough";
        case "2256":
            return "Porcupine";
        case "2257":
            return "Renfrew";
        case "2258":
            return "Eastern";
        case "2260":
            return "Simcoe";
        case "2261":
            return "Sudbury";
        case "2262":
            return "Thunder Bay";
        case "2263":
            return "Timiskaming";
        case "2265":
            return "Waterloo";
        case "2266":
            return "Guelph";
        case "2268":
            return "Windsor";
        case "2270":
            return "York";
        case "3895":
            return "Toronto";
        case "4913":
            return "Southwestern";
        case "5183":
            return "Huron";
        default:
            return id;
    }
}

const FULL_CIRCLE = 2 * Math.PI;
const FIRST_COUNT = 500;

interface Phu {
    name: string;
    id: string;
    dailyCases: number[];
}

interface PhuCases {
    phus: Record<string, Phu>;
    dates: string[];
}

interface Animation{
    name: string;
    x: number;
    y: number;
    size: number;
    color: string;
}

function getX(cases: number): number {
    return 10 + 5 * cases;
}

function getY(cases: number): number {
    return 550 - 500 * cases;
}

class Canvas {
    private ctx: CanvasRenderingContext2D;
    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public fillCircle(x: number, y: number, radius: number, color: string = 'blue') {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, FULL_CIRCLE);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    public verticalLine(x: number, value: string) {
        this.ctx.strokeStyle = 'rgb(150,150,150)';
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, 800);
        this.ctx.stroke();
        this.drawText(value, x, 800 - 10)
    }

    public horizontalLine(y: number, value) {
        const newY = Math.round(getY(y));
        this.ctx.strokeStyle = 'rgb(150,150,150)';
        this.ctx.beginPath();
        this.ctx.moveTo(0, newY);
        this.ctx.lineTo(1600, newY);
        this.ctx.stroke();
        this.drawText(value, 0, newY)
    }

    public xAxis() {
        this.ctx.strokeStyle = '#000000';
        // this.ctx.beginPath();
        // this.ctx.moveTo(0,getY(0));
        this.ctx.fillRect(0,getY(0),1600, 3);
        // this.ctx.closePath();
        // this.ctx.moveTo(0, getY(0));
        // this.ctx.lineTo(1600, getY(0));
        // this.ctx.stroke();
    }

    public drawText(text: string, x: number, y: number) {
        this.ctx.font = 'bold 20px sans';
        this.ctx.fillStyle = 'rgba(40,30,30,1)';
        this.ctx.fillText(text, x, y);
    }
}

interface AnimationPhu {
    x: number;
    y: number;
    size: number;
    name: string;
    color: string;
}

interface AnimationFrame {
    date: string;
    phus: AnimationPhu[];
}

@Component({
  selector: 'app-daily-cases',
  templateUrl: './daily-cases.component.html',
  styleUrls: ['./daily-cases.component.scss']
})
export class DailyCasesComponent implements OnInit {
    constructor(
        private dataFetcher: DataFetcherService,
    ) { }

    private getResponseFramework(id: string, date: string) {
        if (date <= '2020-11-06') {
            return 'Pre-framework';
        }

        if (this.responseFramework[id]) {
            for (let stage of this.responseFramework[id]) {
                // TODO Check dates
                if (date >= stage.start && date <= stage.end) {
                    return stage.status;
                }
            }
        }

        console.warn(`No framework found for id: ${id} on ${date}`)

        // This shouldn't happen, but the data could be corrupt. Just return
        // 'Pre-framework' so that something happens instead of crashing
        return 'Pre-framework';
    }

    private colourFromFramework(framework: string) {
        switch (framework) {
            case 'Prevent':
                return 'rgba(0, 255, 0, 0.7)';
            case 'Protect':
                return 'rgba(255, 255, 90, 0.7)';
            case 'Restrict':
                return 'rgba(255, 160, 30, 0.7)';
            case 'Control':
                return 'rgba(200, 0, 0, 0.7)';
            case 'Lockdown':
                return 'rgba(0, 0, 0, 0.7)';
            case 'Shutdown':
                return 'rgba(0, 0, 0, 1)';
            case 'Pre-framework':
                return 'rgba(0, 255, 0, 0.5)';
            case 'Other':
                return 'rgba(0, 255, 0, 1)';
            default:
                console.log('missing', framework);
                return 'rgba(0,0,0,1)';
        }
    }

    private canvas: Canvas = null;
    public count = FIRST_COUNT;

    public responseFramework: ResponseFramework = {};
    public frames: AnimationFrame[] = [];
    public phus: Animation[] = [];

    private interval: ReturnType<typeof setInterval>;

    public nextFrame(n: number = interpolationSteps) {
        this.step(n);
    }

    public prevFrame(n: number = interpolationSteps) {
        this.step(0 - n);
    }

    public start() {
        if (!this.interval) {
            this.interval = setInterval(this.nextFrame.bind(this, 1), 50);
        }
    }

    public stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }


    public step(n: number) {
        const startFrame = 315 * interpolationSteps;

        if (this.frames.length <= 0) {
            return;
        }

        this.count += n;

        if (this.count >= this.frames.length) {
            // TODO make this dynamic with a slider
            this.count = startFrame;
        }
        else if ( this.count < startFrame) {
            this.count = this.frames.length - 1;
        }
        const frame = this.frames[this.count];

        this.canvas.clear();

        this.canvas.drawText(`${frame.date}`, 750, 20);

        for (let i = 0; i <= 20; i++) {
            const spacing = 20;
            let x = getX(spacing * i);
            this.canvas.verticalLine(x, `${i * spacing}`);
        }


        for (let i = -4; i <= 10; i += 2) {
            let y = 0.1 * i;
            this.canvas.horizontalLine(y, `${10 * i}%`);
        }

        this.canvas.xAxis();

        for (let phu of frame.phus) {
            if (phu.x > getX(30)) {
                this.canvas.fillCircle(phu.x, phu.y, phu.size, phu.color);
                this.canvas.drawText(phu.name, phu.x + phu.size, phu.y)
            }
        }

    }

    ngOnInit(): void {
        this.dataFetcher.fetchData(DataNames.ResponseFramework).subscribe((data: ResponseFramework) => {
            this.responseFramework = data;
            this.getData();
        });
        this.canvas = new Canvas(document.getElementById('myCanvas') as HTMLCanvasElement);


        this.start();
    }

    public getData() {
        this.dataFetcher.fetchData(DataNames.PhuDailyCases)
        .subscribe((data: PhuCases) => {
            const wipFrames: AnimationFrame[] = data.dates.slice(6).map((date) => {
                return {
                    date,
                    phus: [],
                };
            });

            for (let phuId of Object.keys(data.phus)) {
                const phu = data.phus[phuId];
                const phuName = phu.name;
                const smooth = [];
                for (let i = 6; i < phu.dailyCases.length; i++) {
                    let count = 0;
                    for (let j = i - 6; j <= i; j++) {
                        count += phu.dailyCases[j];
                    }
                    count /= 7;
                    smooth.push(count);
                }

                for (let i = 0; i < smooth.length; i++) {
                    const cases = smooth[i]
                    // Calculate weekly cases/100k
                    const x = getX(7 * 100000 * cases / phuMetadata[phuId].population);
                    let y = 0;
                    if (i >= 7) {
                        y =  ((smooth[i] / smooth[i-7]) - 1);
                    }
                    y = getY(y);
                    if (cases > 0) {
                        const color = this.colourFromFramework(this.getResponseFramework(phu.id, wipFrames[i].date));
                        wipFrames[i].phus.push({
                            x,
                            y,
                            size: 2 + 2*Math.sqrt(cases),
                            name: getName(phu.id),
                            color,
                        });
                    }
                }
            }

            function average(a, b, step) {
                return a + (step * (b - a) / interpolationSteps)
            }

            // Interpolation
            this.frames = [];
            for (let i = 0; i < wipFrames.length - 1; i++) {
                const frame = wipFrames[i];
                const nextFrame = wipFrames[i + 1];


                for (let step = 0; step < interpolationSteps; step++) {
                    const newFrame: AnimationFrame = {
                        date: frame.date,
                        phus: [],
                    };
                    for (let phu of frame.phus) {
                        for (let nextFramePhu of nextFrame.phus) {
                            if (phu.name === nextFramePhu.name) {
                                const phuFrame = {
                                    x: average(phu.x, nextFramePhu.x, step),
                                    y: average(phu.y, nextFramePhu.y, step),
                                    size: average(phu.size, nextFramePhu.size, step),
                                    name: phu.name,
                                    color: phu.color,
                                };

                                newFrame.phus.push(phuFrame);

                                break;
                            }
                        }
                    }

                    this.frames.push(newFrame);
                }
            }
        });
    }
}
