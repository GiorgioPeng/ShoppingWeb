import url from './baseUrl'
const sendGet = async (postfix, data) => {
    let des = url + postfix
    if (data) {
        des += '?' + data
    }
    const responded = await fetch(des, {
        cache: 'no-cache',
        credentials: 'include',
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
    }).then(response => response.json())
    return responded;
}
export default sendGet;