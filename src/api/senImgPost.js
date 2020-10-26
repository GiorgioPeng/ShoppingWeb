import url from './baseUrl'
const sendImgPost = async (postfix, data) => {
    const responded = await fetch(url+postfix, {
        body: data,
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
    }).then(response => response.json())
    console.log(responded)
    return responded;
}
export default sendImgPost;