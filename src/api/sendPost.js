import url from './baseUrl'
// set the POST request format ( with cookie )
// posifix: the api of backend
// data: data, the format like  A=1&B=2... 
// return: Object
const sendPost = async (postfix, data) => {
    const responded = await fetch(url+postfix, {
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
    }).then(response => response.json())
    return responded;
}
export default sendPost;