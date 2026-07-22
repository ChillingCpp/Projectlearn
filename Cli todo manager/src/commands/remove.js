import {remove} from "../services/taskServices.js"
import { question } from '../utils/prompt.js';

export async function removeCommand(args)
{
        if (args.length === 0){
            args = await question('> ');
            args = args.split(/\s+/);
        }
    args.forEach((value, index) => {
        args[index] = Number(args[index]);
    });
    const removed =  await remove(args);
    if (removed)    
        console.log("tasks removed");
    else console.log("task not found");
}