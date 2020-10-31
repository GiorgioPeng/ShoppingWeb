import url from './baseUrl'

// set the GET request format
// --
// posifix: the api of backend
// data: data, the format like  A=1&B=2... 
// --
// return: Object
const sendGet = async (postfix, data) => {
    let des = url + postfix
    if (data) {
        des += '?' + data
    }
    const responded = await fetch(des, {
        cache: 'no-cache',
        credentials: 'include',
        method: 'GET', 
        mode: 'cors', 
    }).then(response => response.json())
    return responded;
}
export default sendGet;