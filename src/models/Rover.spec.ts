import * as assert from 'assert';
import Rover from './Rover';
import Plateau from './Plateau';

describe('Rover', () => {
    describe('Instantiation', () => {
        it('should instantiate a rover with the correct values', () => {
            const rover = new Rover(2, 2, 'N');
            assert.equal(rover.position, '2 2 N');
        });
    });

    describe('Commands', () => {
        describe('Turning', () => {
            it('should turn correctly to the left', () => {
                const plateau = new Plateau(1, 1);
                const rover = new Rover(1, 1, 'N');
                rover.processCommands(['L', 'L'], plateau);
                assert.equal(rover.position, '1 1 S');
            });

            it('should turn correctly to the right', () => {
                const plateau = new Plateau(1, 1);
                const rover = new Rover(1, 1, 'N');
                rover.processCommands(['R', 'R'], plateau);
                assert.equal(rover.position, '1 1 S');
            });

            it('should turn do a 360 clockwise correctly', () => {
                const plateau = new Plateau(1, 1);
                const rover = new Rover(1, 1, 'N');
                rover.processCommands(['R', 'R', 'R', 'R'], plateau);
                assert.equal(rover.position, '1 1 N');
            });

            it('should turn do a 360 counter-clockwise correctly', () => {
                const plateau = new Plateau(1, 1);
                const rover = new Rover(1, 1, 'N');
                rover.processCommands(['L', 'L', 'L', 'L'], plateau);
                assert.equal(rover.position, '1 1 N');
            });
        });
    });

    describe('Moving', () => {
        const plateau = new Plateau(4, 4);

        it('should move north correctly', () => {
            const rover = new Rover(2, 2, 'N');
            rover.processCommands(['M'], plateau);
            assert.equal(rover.position, '2 3 N');
        });

        it('should move east correctly', () => {
            const rover = new Rover(2, 2, 'N');
            rover.processCommands(['R', 'M'], plateau);
            assert.equal(rover.position, '3 2 E');
        });

        it('should move south correctly', () => {
            const rover = new Rover(2, 2, 'N');
            rover.processCommands(['R', 'R', 'M'], plateau);
            assert.equal(rover.position, '2 1 S');
        });

        it('should move west correctly', () => {
            const rover = new Rover(2, 2, 'N');
            rover.processCommands(['L', 'M'], plateau);
            assert.equal(rover.position, '1 2 W');
        });

        it('should make a complex move correctly', () => {
            const rover = new Rover(2, 2, 'N');
            rover.processCommands(
                [
                    'R',
                    'M',
                    'M',
                    'L',
                    'M',
                    'M',
                    'L',
                    'M',
                    'M',
                    'L',
                    'M',
                    'M',
                    'R',
                    'M',
                    'M',
                    'R',
                    'M',
                ],
                plateau
            );
            assert.equal(rover.position, '0 3 N');
        });

        it('should move out of bounds north correctly', () => {
            const rover = new Rover(2, 2, 'N');
            rover.processCommands(['M', 'M', 'M'], plateau);
            assert.equal(rover.position, '2 4 N');
        });

        it('should move out of bounds east correctly', () => {
            const rover = new Rover(2, 2, 'E');
            rover.processCommands(['M', 'M', 'M'], plateau);
            assert.equal(rover.position, '4 2 E');
        });

        it('should move out of bounds south correctly', () => {
            const rover = new Rover(2, 2, 'S');
            rover.processCommands(['M', 'M', 'M'], plateau);
            assert.equal(rover.position, '2 0 S');
        });

        it('should move out of bounds east correctly', () => {
            const rover = new Rover(2, 2, 'W');
            rover.processCommands(['M', 'M', 'M'], plateau);
            assert.equal(rover.position, '0 2 W');
        });
    });
});
