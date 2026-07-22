import { complete } from "../services/taskServices.js";
import { question } from '../utils/prompt.js';

export async function completeCommand(ids)
{
    if (ids.length === 0){
        ids = await question('> ');
        ids = ids.split(/\s+/);
    }
    ids.forEach((value, index) => 
    {
        ids[index] = Number(ids[index]);
    })
    await complete(ids);
    console.log("Mark Completed");
}