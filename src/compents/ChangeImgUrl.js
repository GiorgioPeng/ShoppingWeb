// transfer the relative path of a image to a url
// --
// imgUrl: a relative path of a image
// --
// return: the url of the image
const changer = (imgUrl)=>{
    try{
    imgUrl.replace(`\\`, '/')
    }catch (error) {
        console.log('invaild img url')
    }
    imgUrl = `http://127.0.0.1:8000/back_end_war_exploded/` + imgUrl
    return imgUrl
}
export default changer