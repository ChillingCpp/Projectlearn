import { question, close } from "./utils/prompt.js"
import { helpCommand } from "./commands/help.js"
import { addCommand } from "./commands/add.js"
import { removeCommand } from "./commands/remove.js"
import { listCommand } from "./commands/list.js"
import { completeCommand } from "./commands/complete.js"
function showWelcome()
{
    console.log(`=====================================
TODO CLI MANAGER v1.0
=====================================

Simple command line task manager.

Available commands:

help             Show all commands
add              Add a new task
remove           Remove a task
list             Display all tasks
complete         Mark a task as completed
exit             Exit the application

-------------------------------------
>`)
}
async function main() {
    let running = true;
    // load
    showWelcome();
    while (running)
    {
        const input = await question('> ');
        const [command, ...args] = input.trim().split(/\s+/);
        switch (command){
            case "add": 
                await addCommand(args);
                break;
            case "remove":
                await removeCommand(args);
                break;

            case "help":
                await helpCommand();
                break;

            case "list":
                await listCommand();
                break;

            case "complete":
                await completeCommand(args);
                break;

            case "exit":
                close();
                running = false;
                break;
            default:
                console.log("invalid Command");
        }
    }
}
main();