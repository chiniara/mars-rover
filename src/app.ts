import promptSync from 'prompt-sync';
import Plateau from './models/Plateau';
import {
    isValidCommandValue,
    isValidHeadingValue,
    isValidNumericString,
} from './utils/Validators';
import { Command, Heading } from './models/Rover';

const prompt = promptSync({ sigint: true });

const promptPlateau = () => {
    let isPlateauInputValid = false;
    let plateauInputString: string = '';
    let plateauInputValues: number[] = [];
    do {
        plateauInputString = prompt(
            'Please input the upper right coordinates of the plateau boundary (format "X Y"): '
        );

        plateauInputValues = plateauInputString
            .split(' ')
            .map((value) => parseInt(value));

        isPlateauInputValid =
            isValidNumericString(plateauInputString, ' ') &&
            plateauInputValues.length == 2;
    } while (!isPlateauInputValid);

    const [plateauMaxX, plateauMaxY] = plateauInputValues;

    return new Plateau(plateauMaxX, plateauMaxY);
};

const promptRoverDeploymentStart = (plateau: Plateau) => {
    let roverNumInput = '';
    let roverNum = 0;
    do {
        roverNumInput = prompt('How many rovers do you wish to deploy? ');
    } while (!isValidNumericString(roverNumInput, ''));

    roverNum = Number(roverNumInput);

    while (plateau.rovers.length < roverNum) {
        promptRoverDeploy(plateau);
        console.log(`Rovers deployed: ${plateau.rovers.length}`);
    }
};

const promptRoverDeploy = (plateau: Plateau) => {
    let isRoverInputValid = false;
    let roverInputString = '';
    let roverInputValues = [];
    do {
        roverInputString = prompt(
            'Please input the rover deployment coordinates and heading (format "X Y H"): '
        );

        roverInputValues = roverInputString.split(' ');
        const roverNumericValues = roverInputString.substring(0, 3);
        const roverHeadingValue = roverInputString[4] as Heading;

        isRoverInputValid =
            roverInputValues.length == 3 &&
            isValidNumericString(roverNumericValues, ' ') &&
            isValidHeadingValue(roverHeadingValue);
    } while (!isRoverInputValid);

    const [roverX, roverY] = roverInputValues
        .slice(0, 2)
        .map((value) => parseInt(value));

    const roverHeading: Heading = roverInputValues[2] as Heading;

    plateau.deployRover(roverX, roverY, roverHeading);
};

const promptRoverCommands = (plateau: Plateau) => {
    plateau.rovers.forEach((rover, index) => {
        let roverCommandInputString = '';
        let roverCommandsValues: string[] = [];
        let isRoverCommandInputValid: boolean;
        do {
            isRoverCommandInputValid = true;
            roverCommandInputString = prompt(
                `Please input the Rover #${index + 1} (${
                    rover.position
                }). Commands (format "CCCC...", valid commands: L,R,M):  `
            );

            roverCommandsValues = roverCommandInputString.split('');

            roverCommandsValues.forEach((command) => {
                if (!isValidCommandValue(command)) {
                    isRoverCommandInputValid = false;
                }
            });
        } while (!isRoverCommandInputValid);

        rover.processCommands(roverCommandsValues as Command[], plateau);
    });
};

const main = () => {
    const plateau = promptPlateau();
    promptRoverDeploymentStart(plateau);
    console.log('Rovers:');
    plateau.rovers.forEach((rover, index) =>
        console.log(`Rover #${index + 1}`, rover.position)
    );

    promptRoverCommands(plateau);

    console.log('Rovers:');
    plateau.rovers.forEach((rover, index) =>
        console.log(`Rover #${index + 1}: `, rover.position)
    );
};

main();
