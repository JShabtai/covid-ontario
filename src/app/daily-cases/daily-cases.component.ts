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
    if (phuMetadata[id]) {
        return phuMetadata[id].shortName;
    }

    return id;
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

class Canvas {

    private ctx: CanvasRenderingContext2D;

    private element: HTMLCanvasElement;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.element = canvas;
    }

    public height() {
        return this.element.height;
    }

    public width() {
        return this.element.width;
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
        this.ctx.lineTo(x, this.height());
        this.ctx.stroke();
        this.drawText(value, x + 3, this.height() - 10)
    }

    public horizontalLine(y: number, value) {
        const newY = Math.round(y);
        this.ctx.strokeStyle = 'rgb(150,150,150)';
        this.ctx.beginPath();
        this.ctx.moveTo(0, newY);
        this.ctx.lineTo(this.width(), newY);
        this.ctx.stroke();
        this.drawText(value, 0, newY - 2)
    }

    public xAxis(height: number) {
        this.ctx.strokeStyle = '#000000';
        this.ctx.fillRect(0, Math.round(height),this.width(), 2);
    }

    public drawText(text: string, x: number, y: number) {
        this.ctx.font = 'bold 13px sans';
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillText(text, x, y);
    }

    public resize(width: number, height: number) {
        this.element.width = width;
        this.element.height = height
    }
}

interface AnimationPhu {
    x: number;
    y: number;
    size: number;
    name: string;
    color: string;
    cases: number;
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
                return 'rgba(100, 100, 100, 0.9)';
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

    private getX(cases: number): number {
        const width = this.canvas.width();
        const max = 240;
        const min = 0;
        const offset = 50;
        const zero = offset;
        const value = zero + (width / (max - min)) * cases;
        if (value > width - 20) {
            return width - 20;
        }

        return value;
    }

    private getY(cases: number): number {
        const height = this.canvas.height();
        const max = 1.3;
        const min = -0.6;
        const zero = height - (height * (0 - min) / (max-min));
        return zero - (height / (max - min)) * cases;
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
        if (this.count + 1 >= this.frames.length) {
            this.count = this.startFrame;
        }

        if (!this.interval) {
            this.interval = setInterval(() => {
                if (this.count + 1 >= this.frames.length) {
                    this.stop();
                }
                else {
                    this.nextFrame(1);
                }
            }, 250/this.speed);
            console.log('int', this.interval);
        }
    }

    public stop() {
            console.log('stop', this.interval, new Error('adsf'));
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    public speed: number = 5;

    private drawCurrentFrame() {
        this.canvas.clear();

        for (let i = 0; i <= 10; i++) {
            const spacing = 20;
            let x = this.getX(spacing * i);
            this.canvas.verticalLine(x, `${i * spacing}`);
        }


        for (let i = -4; i <= 14; i += 2) {
            let y = this.getY(0.1 * i);
            this.canvas.horizontalLine(y, `${10 * i}%`);
        }

        this.canvas.xAxis(this.getY(0));

        const frame = this.frames[this.count];
        if (!frame) {
            return;
        }
        this.canvas.drawText(`${frame.date}`, this.canvas.width()/ 2 - 30, 20);
        for (let phu of frame.phus) {
            // if (phu.x > this.getX(30) && phu.cases > 30) {
                this.canvas.fillCircle(phu.x, phu.y, phu.size, phu.color);
                this.canvas.drawText(phu.name, phu.x + phu.size, phu.y)
            // }
        }
    }

    private computeFrames() {
        if (!this.rawData) {
            return;
        }

        const wipFrames: AnimationFrame[] = this.rawData.dates.slice(6).map((date) => {
            return {
                date,
                phus: [],
            };
        });

        for (let phuId of Object.keys(this.rawData.phus)) {
            const phu = this.rawData.phus[phuId];
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
                const x = this.getX(7 * 100000 * cases / phuMetadata[phuId].population);
                let y = 0;
                if (i >= 7) {
                    y =  ((smooth[i] / smooth[i-7]) - 1);
                }
                y = this.getY(y);
                if (cases > 0) {
                    const color = this.colourFromFramework(this.getResponseFramework(phu.id, wipFrames[i].date));
                    wipFrames[i].phus.push({
                        cases,
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
                                cases: average(phu.cases, nextFramePhu.cases, step),
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

        // The last frame doesn't get added by interpolation, so add it manually
        this.frames.push(wipFrames[wipFrames.length - 1]);

        this.count = this.frames.length - 1;
        this.drawCurrentFrame();
    }

    // TODO make this dynamic with a slider
    private startFrame = 320 * interpolationSteps;

    public step(n: number) {
        if (this.frames.length <= 0) {
            return;
        }

        this.count += n;

        if (this.count >= this.frames.length) {
            this.count = this.startFrame;
        }
        else if (this.count < this.startFrame) {
            if (n < 0) {
                this.count = this.frames.length - 1;
            }
            else {
                this.count = this.startFrame;
            }
        }

        this.drawCurrentFrame();
    }

    private onResize () {
        this.canvas.resize(window.innerWidth - 50, window.innerHeight - 280);
        this.computeFrames();
        this.drawCurrentFrame();
    }

    ngOnInit(): void {
        this.dataFetcher.fetchData(DataNames.ResponseFramework).subscribe((data: ResponseFramework) => {
            this.responseFramework = data;
            this.getData();
        });
        this.canvas = new Canvas(document.getElementById('myCanvas') as HTMLCanvasElement);
        window.onresize = this.onResize.bind(this);
        this.onResize();
    }

    private rawData: PhuCases = null;

    public getData() {
        this.dataFetcher.fetchData(DataNames.PhuDailyCases)
        .subscribe((data: PhuCases) => {
            this.rawData = data;
            this.onResize();
            this.computeFrames();
        });
    }
}
