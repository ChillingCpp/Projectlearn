import { loadTask } from "../storage/taskStorage.js";

export async function listCommand()
{
    const tasks = await loadTask();
    console.log('');
    tasks.forEach((task) =>
    {
        console.log(`> [${task.complete ? 'x' : ''}] ${task.id}. ${task.name}`);
    });
}