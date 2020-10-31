import url from './baseUrl'

// set the POST request format ( send file )
// posifix: the api of backend
// data: file data
// return: Object
const sendImgPost = async (postfix, data) => {
    const responded = await fetch(url+postfix, {
        body: data,
        method: 'POST',
        mode: 'cors',
    }).then(response => response.json())
    return responded;
}
export default sendImgPost;