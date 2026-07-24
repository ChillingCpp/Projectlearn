import fs from "node:fs/promises"

export async function loadData()
{
    const fp = new URL('../data/library.json', import.meta.url);
    try{
        const f = await fs.readFile(fp, {encoding: 'utf-8'});
        return JSON.parse(f);
    }
    catch(err)
    {
        if (err.code = 'ENOENT'){
            await fs.writeFile(fp, '[]', {encoding: 'utf-8'});
            return [];
        }
        else 
            return false;
    }
}


export async function saveData(newData)
{
    await fs.writeFile(newData);
}