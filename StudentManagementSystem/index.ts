#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let students: any[] = [];
let lastStudentId = 0;

function generateStudentID() {
    lastStudentId++;
    return lastStudentId.toString().padStart(5, "0");
}

async function enrollStudent() {
    let { student } = await inquirer.prompt({
        name: "student",
        type: "input",
        message: chalk.dim("Enter the name of student:")
    });

    let { course } = await inquirer.prompt({
        name: "course",
        type: "list",
        choices: ["Web Development", "Graphic Designing", "Metaverse"],
        message: chalk.cyan("Select the course:")
    });

    let newStudent = {
        name: student,
        ID: generateStudentID(),
        course: course,
        balance: 0,
        dueCharges: 0,
        feeStatus: "Unpaid"
    };

    students.push(newStudent);
    console.log(`${newStudent.name} is enrolled in ${newStudent.course} course with ID ${newStudent.ID}`);
}

async function viewBalance() {
    let { id } = await inquirer.prompt({
        name: "id",
        type: "input",
        message: "Enter the Student ID:"
    });

    let student = students.find((s) => s.ID === id);

    if (student) {
        console.log(`${student.name}'s balance is ${student.balance}`);
    } else {
        console.log("Student not found!");
    }
}

async function addBalance() {
    let { id } = await inquirer.prompt({
        name: "id",
        type: "input",
        message: "Enter the Student ID:"
    });

    let student = students.find((s) => s.ID === id);

    if (student) {
        let { amount } = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.dim("Enter the amount you want to add in your account:")
        });

        if (amount > 0) {
            student.balance += amount;
            console.log(chalk.cyan("Amount Added Successfully"));
        } else {
            console.log("Invalid amount. Please enter a positive number.");
        }
    } else {
        console.log("Student not found.");
    }
}

async function payTuitionFees() {
    let { id } = await inquirer.prompt({
        name: "id",
        type: "input",
        message: "Enter the Student ID:"
    });

    let student = students.find((s) => s.ID === id);

    if (student) {
        if (student.feeStatus === "Paid") {
            console.log("You have already paid the tuition fees.");
            return;
        }

        let courseFee = 0;
        switch (student.course) {
            case "Web Development":
                courseFee = 5000;
                break;
            case "Graphic Designing":
                courseFee = 3000;
                break;
            case "Metaverse":
                courseFee = 7000;
                break;
        }

        console.log(`You have to pay ${courseFee} Rs.`);
        if (student.balance >= courseFee) {
            student.balance -= courseFee;
            student.dueCharges = 0;
            student.feeStatus = "Paid";
            console.log(chalk.cyan("Fee paid successfully."));
        } else {
            console.log("You don't have enough balance.");
        }
    } else {
        console.log("Student not found.");
    }
}

async function showStatus() {
    if (students.length != 0)
        {
            let { id } = await inquirer.prompt({
            name: "id",
            type: "input",
            message: "Enter the Student ID:"
        });

        let student = students.find((s) => s.ID === id);

        if (student) {
            const details = {
                "Name": student.name,
                "ID": student.ID,
                "Course Enrolled": student.course,
                "Balance": student.balance,
                "Due Charges": student.dueCharges,
                "Fee Status": student.feeStatus
            };
    
            for (const [key, value] of Object.entries(details)) {
                console.log(chalk.yellow(`${key}:`) + ` ${value}`);
            }
            
        } 
        else {
            console.log("Student not found.");
        }
    }
    else {
        console.log(chalk.bold(`No student is enrolled.`))
    }
}

async function main() {
    let exit = "";
    while (exit !== "Exit") {
        let { operation } = await inquirer.prompt({
            name: "operation",
            type: "list",
            choices: ["Enroll a Student", "View Balance", "Add Balance", "Pay Tuition Fees", "Show Status", "Exit"],
            message: chalk.cyan("Please Select an operation:")
        });

        switch (operation) {
            case "Enroll a Student":
                await enrollStudent();
                break;
            case "View Balance":
                await viewBalance();
                break;
            case "Add Balance":
                await addBalance();
                break;
            case "Pay Tuition Fees":
                await payTuitionFees();
                break;
            case "Show Status":
                await showStatus();
                break;
            case "Exit":
                exit = "Exit";
                console.log("Exiting the application...");
                break;
        }
    }
}

main();
