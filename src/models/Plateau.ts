import Rover, { Heading } from './Rover';

export default class Plateau {
    readonly minX: number;
    readonly minY: number;
    readonly maxX: number;
    readonly maxY: number;

    rovers: Rover[] = [];

    constructor(maxX: number, maxY: number);
    constructor(maxX: number, maxY: number, minX?: number, minY?: number) {
        this.minX = minX ?? 0;
        this.minY = minY ?? 0;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    deployRover(posX: number, posY: number, heading: Heading) {
        if (
            posX > this.maxX ||
            posX < this.minX ||
            posY > this.maxY ||
            posY < this.minY
        ) {
            console.log('Trying to deploy rover out of bounds.');
            return;
        }

        const rover = new Rover(posX, posY, heading as Heading);

        this.rovers.push(rover);
    }
}
