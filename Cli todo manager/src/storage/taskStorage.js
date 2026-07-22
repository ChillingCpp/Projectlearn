import fs from "node:fs/promises"

export async function loadTask()
{
    const fp = new URL("../data/tasks.json", import.meta.url);
    try{
        const content  = await fs.readFile(fp, {encoding: 'utf-8'});
        const tasks = JSON.parse(content);
        return tasks;
    }
    catch (error)
    {
        if (error.code === "ENOENT")
            await fs.writeFile(fp, '[]', {encoding: 'utf-8'});
        else 
            return false;
    }
}
export async function saveTask(tasks)
{
    
    const fp = new URL("../data/tasks.json", import.meta.url);
    await fs.writeFile(fp, JSON.stringify(tasks), {encoding: 'utf-8'});
}