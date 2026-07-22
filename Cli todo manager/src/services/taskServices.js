import { loadTask, saveTask } from "../storage/taskStorage.js";
export async function add(name)
{   
    const tasks = await loadTask();
    const task = {
        name:name,
        id: tasks.length===0 ? 1 : tasks[tasks.length-1].id+1,
        complete:false,
    }
    tasks.push(task);
    await saveTask(tasks);
}
export async function remove(ids){
    
    let tasks = await loadTask();
    const l1 = tasks.length;
    const st = new Set(ids);
    tasks = tasks.filter((task) => !st.has(task.id));
    const l2 = tasks.length;
    if (l2 === l1) 
        return false;
    else{
        await saveTask(tasks);
        return true;
    }
}
export async function complete(ids) {
    
    let tasks = await loadTask();
    const st = new Set(ids);
    tasks.forEach((task)=>{
        if(st.has(task.id)) task.complete = true;
    });
    await saveTask(tasks);
}
