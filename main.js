#!/usr/bin/env node

// This file contains main function and registration function 
import inquirer from "inquirer";
import chalk from "chalk";
import { TypingTestServices } from "./services.js";
// Create an empty list to store user information
export let users = [];
// This function generates a unique id for every user
export function generateUserId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit nimber
    return randomNumber.toString();
}
// Authentication class to handle user registration and level selection
export class Authentication {
    async register() {
        console.log(chalk.yellow.bold.underline("\n  \tWelcome to the Typing Speed Test Game!\t  \n"));
        console.log(chalk.magenta.bold("Please register to start playing.\n"));
        const { userName, email, password } = await inquirer.prompt([
            {
                type: "input",
                name: "userName",
                message: chalk.green("Enter your username:"),
            },
            {
                type: "input",
                name: "email",
                message: chalk.green("Enter your email:"),
                validate: (input) => {
                    const emailRegex = /^[^\s@]{1,64}@gmail\.com$/;
                    if (!emailRegex.test(input)) {
                        return chalk.red.bold("\nPlease enter a valid email address.");
                    }
                    // Verify total length of email address
                    if (input.length > 254) {
                        return chalk.red.bold("\nEmail address length cannot exceed 254 characters.");
                    }
                    return true;
                },
            },
            {
                type: "password",
                name: "password",
                message: chalk.green("Create a strong password:"),
                mask: "•",
            },
        ]);
        const userId = generateUserId();
        const user = {
            name: userName,
            email: email,
            password: password,
            id: userId,
            records: [],
        };
        users.push(user);
        console.log(chalk.cyan.bold("\nThank you for registering!"));
        console.log(chalk.cyan.bold(`Your user id is ${userId} and password is ${password}. Please remember it for login.\n`));
        this.levels(user);
    }
    // Async function to login user through ID and password
    async login() {
        const { userId, password } = await inquirer.prompt([
            {
                type: "input",
                name: "userId",
                message: "Enter your ID:",
            },
            {
                type: "password",
                name: "password",
                message: "Enter your password:",
            },
        ]);
        const userFind = users.find((user) => user.id === userId && user.password === password);
        if (userFind) {
            console.log(chalk.yellow.bold("\nLogin Successfully!\n"));
            this.levels(userFind);
        }
        else {
            console.log(chalk.red.bold("User not found. Please try again."));
            this.login();
        }
    }
    // Allows the user to choose a typing test level
    async levels(user) {
        const { level } = await inquirer.prompt([
            {
                type: "list",
                name: "level",
                message: chalk.green("Choose level:"),
                choices: ["Easy", "Medium", "Hard", "View Records", "Logout"],
            }
        ]);
        if (level === "Easy" || level === "Medium" || level === "Hard") {
            const typingTest = new TypingTestServices();
            typingTest.runTypingTest(user, level);
        }
        else if (level === "View Records") {
            this.viewRecords(user);
        }
        else {
            // Prompt to restart the game
            const { restart } = await inquirer.prompt({
                type: "confirm",
                name: "restart",
                message: "Do you want to restart the game?",
            });
            if (restart) {
                this.login();
            }
            else {
                console.log(chalk.magenta.bold("\nGoodbye! Keep practicing to improve your speed."));
                process.exit(0);
            }
        }
    }
    // Through this async function user see his/her all records
    async viewRecords(user) {
        if (user.records.length === 0) {
            console.log(chalk.cyan.bold("Typing Record List is empty."));
        }
        else {
            console.log(chalk.magenta.bold(`${user.name}'s Typing Records:\n`));
            user.records.forEach((record, index) => {
                console.log(chalk.yellow.bold(`Record ${index + 1}:\n`));
                console.log(chalk.cyan.bold(`Text: ${record.text}`));
                console.log(chalk.cyan.bold(`Typed Text: ${record.typedText}`));
                console.log(chalk.cyan.bold(`Given Time: ${record.duration} seconds`));
                console.log(chalk.cyan.bold(`Time Taken: ${record.timeTaken.toFixed(0)} seconds`));
                console.log(chalk.cyan.bold(`WPM: ${record.wpm}`));
                console.log(chalk.cyan.bold(`Errors: ${record.errors}`));
                console.log(chalk.cyan.bold(`Accuracy: ${record.accuracy}%\n`));
                console.log(chalk.magenta.bold("✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿"));
            });
        }
        this.levels(user);
    }
}
// Start the application
const start = new Authentication;
start.register();
