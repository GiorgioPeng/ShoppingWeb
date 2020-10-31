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
    let temp = window.location.toString().split('/')
    temp = temp.slice(0,3)
    imgUrl = temp.join('/') + '/back_end_war_exploded/' + imgUrl
    console.log(imgUrl)
    return imgUrl
}
export default changer