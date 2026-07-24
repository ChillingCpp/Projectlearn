

const query= ['id', 'name', 'author', 'year', 'available'];
/////// todo :
/// we only have the /books so easy routing
/// queryString : request support these type of querys
// get : can get any using query list
// if we have frontend then when query, make user select using select html or user type on search bar on the web
// but backend receive will never need to handle the space character, use - instead, but the json or database will have space character between word
// post, put, patch, delete same as get, because we use queryString
// if we implement like that then the project is very long, not for learning nows
/// use AI to generate the project and core logic

export async function routes(req, res){
    const url = new URL(req.url, `http://${req.header.host}`);
    try{
        
        switch (req.method)
        {
            case 'GET':
                // call controlller
            case 'POST':
                // call controlller

            case 'PUT':
                // call controlller
            
            case 'PATCH':
                // call controlller

            case 'DELETE':
                // call controlller
        }
    }
    catch (err)
    {
        return false;
    }

}