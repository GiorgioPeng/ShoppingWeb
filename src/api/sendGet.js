import url from './baseUrl'
const sendGet = (postfix, data) => {
    const responded = await fetch(url + postfix + '?' + data, {
        cache: 'no-cache',
        credentials: 'include',
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
    }).then(response => response.json())
    return responded;
}
export default sendGet;