import readline from "node:readline/promises"
import {stdin, stdout} from "node:process";


const rl = readline.createInterface({   
    input: process.stdin,
    output: process.stdout
});
export async function question(prompt) {
    return rl.question(prompt);
}
export function close()
{
    return rl.close();
}