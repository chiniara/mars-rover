import Plateau from './Plateau';
import { getKeyByValue } from '../utils/Utils';

export type Heading = 'N' | 'E' | 'S' | 'W';

export type Command = 'L' | 'R' | 'M';

const headingMap: Record<string, number> = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
};

export default class Rover {
    private _posX: number;
    private _posY: number;

    constructor(posX: number, posY: number, heading: Heading) {
        this._posX = posX;
        this._posY = posY;
        this.heading = heading;
    }

    private _heading: number = 0;

    get heading(): string {
        return getKeyByValue(headingMap, this._heading)!!;
    }

    private set heading(value: string) {
        this._heading = headingMap[value];
    }

    get position() {
        return `${this._posX} ${this._posY} ${this.heading}`;
    }

    public processCommands(commands: Command[], plateau: Plateau) {
        for (const command of commands) {
            switch (command) {
                case 'M':
                    if (this.heading == 'N') this.moveNorth(plateau);
                    if (this.heading == 'E') this.moveEast(plateau);
                    if (this.heading == 'S') this.moveSouth(plateau);
                    if (this.heading == 'W') this.moveWest(plateau);
                    break;
                case 'L':
                    this.turnLeft();
                    break;
                case 'R':
                    this.turnRight();
                    break;
            }
        }
    }

    private move(xValue: number, yValue: number, plateau: Plateau) {
        const newX = this._posX + xValue;
        const newY = this._posY + yValue;

        if (
            newX < plateau.minX ||
            newX > plateau.maxX ||
            newY < plateau.minY ||
            newY > plateau.maxY
        ) {
            console.log('Cannot move out of bounds.');
        } else {
            this._posX = newX;
            this._posY = newY;
        }
    }

    private turn(value: number) {
        let newValue = this._heading + value;
        if (newValue > 3) newValue = 0;
        if (newValue < 0) newValue = 3;

        this._heading = newValue;
    }

    private turnLeft() {
        this.turn(-1);
    }

    private turnRight() {
        this.turn(1);
    }

    private moveNorth(plateau: Plateau) {
        this.move(0, 1, plateau);
    }

    private moveEast(plateau: Plateau) {
        this.move(1, 0, plateau);
    }

    private moveSouth(plateau: Plateau) {
        this.move(0, -1, plateau);
    }

    private moveWest(plateau: Plateau) {
        this.move(-1, 0, plateau);
    }
}
