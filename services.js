// This file contains all typing test servies which we provide to user
import inquirer from "inquirer";
import chalk from "chalk";
import { Authentication } from "./main.js";
import { getEasyText, getMediumText, getHardText } from "./text.js";
// TypingTestServices class to handle all calculations of user's typing speed , erros etc
export class TypingTestServices {
    // Runs the typing test for the given user at the specified level.
    async runTypingTest(user, level) {
        let testText;
        let timeOptions;
        // Determine the test text and time options based on the level
        if (level === "Easy") {
            testText = getEasyText();
            timeOptions = [10, 20, 30];
        }
        else if (level === "Medium") {
            testText = getMediumText();
            timeOptions = [10, 20, 30];
        }
        else {
            testText = getHardText();
            timeOptions = [10, 20, 30];
        }
        // Prompt the user to choose a test duration
        const { duration } = await inquirer.prompt({
            type: "list",
            name: "duration",
            message: chalk.green("Choose test duration (in seconds):"),
            choices: timeOptions.map(time => `${time} seconds`),
        });
        const testDuration = parseInt(duration.split(" ")[0], 10);
        console.log(chalk.bold.cyan(`\nTest will start now! Duration: ${testDuration} seconds.`));
        console.log(chalk.bold.cyan(`\nType the following text:\n${chalk.green.bold(testText)}\n`));
        // Start the timer
        const startTime = Date.now();
        const startAgain = new Authentication;
        // Set up the timer to update every second
        const timer = setInterval(() => {
            const timePassed = Math.floor((Date.now() - startTime) / 1000);
            //process.stdout.write(chalk.yellow(`\rRemaining Time: ${testDuration - timePassed}`));
            if (timePassed >= testDuration) {
                clearInterval(timer);
                process.stdout.write(chalk.blue.bold("\nTime's up!\n"));
            }
        }, 1000);
        const { typedText } = await inquirer.prompt({
            type: "input",
            name: "typedText",
            message: chalk.green("Start typing:"),
            validate: (input) => {
                const timePassed = Math.floor((Date.now() - startTime) / 1000);
                const result = timePassed >= testDuration ? chalk.green.bold("Time's up!") : true;
                return true;
            }
        });
        clearInterval(timer); // Clear the timer after input is received
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        // Calculate Words Per Minute
        const wordsTyped = typedText.trim().split(/\s+/).length;
        const wpm = Math.round(wordsTyped / (timeTaken / 60));
        // Calculate errors and accuracy
        const { errors, correctWords } = this.calculateErrors(testText, typedText);
        const totalWords = testText.trim().split(/\s+/).length;
        const accuracy = (correctWords / totalWords) * 100;
        // Display results
        if (timeTaken >= testDuration) {
            console.log(chalk.green.bold("\nYou lose!"));
            console.log(chalk.magenta.bold(`\n${user.name}, here are your result:`));
            console.log(chalk.yellow.bold(`Target Text: \n${testText}`));
            console.log(chalk.yellow.bold(`Your Typed Text: \n${typedText}`));
            console.log(chalk.yellow.bold(`Given Time: ${testDuration} seconds`));
            console.log(chalk.yellow.bold(`You take ${timeTaken.toFixed(0)} seconds to complete the task.`));
            console.log(chalk.cyan.bold(`\nYou typed at a speed of ${wpm} WPM.`));
            console.log(chalk.red.bold(`You made ${errors} error/s.\n`));
            console.log(chalk.green.bold(`Your accuracy is ${accuracy.toFixed(2)}%.\n`));
        }
        else {
            console.log(chalk.green.bold("\nYou won!"));
            console.log(chalk.magenta.bold(`\n${user.name}, here are your result:`));
            console.log(chalk.yellow.bold(`Target Text: \n${testText}`));
            console.log(chalk.yellow.bold(`Your Typed Text: \n${typedText}`));
            console.log(chalk.yellow.bold(`Given Time: ${testDuration} seconds`));
            console.log(chalk.yellow.bold(`You take ${timeTaken.toFixed(0)} seconds to complete the task.`));
            console.log(chalk.cyan.bold(`\nYou typed at a speed of ${wpm} WPM.`));
            console.log(chalk.red.bold(`You made ${errors} error/s.\n`));
            console.log(chalk.green.bold(`Your accuracy is ${accuracy.toFixed(2)}%.\n`));
        }
        // Update user records
        let record = user.records.push({
            text: testText,
            typedText: typedText,
            duration: testDuration,
            timeTaken: timeTaken,
            wpm: wpm,
            errors: errors,
            accuracy: accuracy,
        });
        startAgain.levels(user);
    }
    // Function to calculate the number of errors and correct words in the user's typed text
    calculateErrors(originalText, typedText) {
        const originalWords = originalText.trim().split(/\s+/);
        const typedWords = typedText.trim().split(/\s+/);
        let errors = 0;
        let correctWords = 0;
        for (let i = 0; i < Math.max(originalWords.length, typedWords.length); i++) {
            if (originalWords[i] !== typedWords[i]) {
                errors++;
            }
            else {
                correctWords++;
            }
        }
        return { errors, correctWords };
    }
}
