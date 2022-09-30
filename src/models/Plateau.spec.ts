import assert from 'assert';
import Plateau from './Plateau';

describe('Plateau', () => {
    describe('Instantiation', () => {
        it('should instantiate a with the correct values', () => {
            const plateau = new Plateau(2, 2);
            assert.equal(plateau.maxX, 2);
            assert.equal(plateau.maxY, 2);
            assert.equal(plateau.minX, 0);
            assert.equal(plateau.minY, 0);
        });
    });

    describe('Deploying Rovers', () => {
        it('should deploy a rover correctly', () => {
            const plateau = new Plateau(2, 2);
            plateau.deployRover(0, 0, 'N');

            assert.equal(plateau.rovers.length, 1);
        });

        const outOfBoundsTests = [
            { posX: -1, posY: -1 },
            { posX: 0, posY: -1 },
            { posX: 0, posY: 2 },
            { posX: 2, posY: 0 },
            { posX: 2, posY: 2 },
        ];

        outOfBoundsTests.forEach(({ posX, posY }) => {
            it(`should not deploy a rover out of bounds (${posX}, ${posY})`, () => {
                const plateau = new Plateau(1, 1);
                plateau.deployRover(posX, posY, 'N');

                assert.equal(plateau.rovers.length, 0);
            });
        });
    });
});
