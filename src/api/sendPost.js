import url from './baseUrl'
const sendPost = async (postfix, data) => {
    const responded = await fetch(url+postfix, {
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // credentials: 'include',
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
    }).then(response => response.json())
    console.log(responded)
    return responded;
}
export default sendPost;