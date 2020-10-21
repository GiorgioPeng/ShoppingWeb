import url from './baseUrl'
const sendPut = async (postfix, data) => {
    const responded = await fetch(url+postfix, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        credentials: 'include',
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
    }).then(response => response.json())
    return responded;
}
export default sendPut;