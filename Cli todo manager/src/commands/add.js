
import {add} from '../services/taskServices.js'
import { question } from '../utils/prompt.js';

export async function addCommand(args)
{  
    if (args.length === 0){
        args = await question('> ');
    }
    await add(args);
    console.log("task added");
}