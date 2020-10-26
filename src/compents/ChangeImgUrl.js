const changer = (imgUrl)=>{
    imgUrl.replace(`\\`, '/')
    imgUrl = `http://47.103.207.168:8081/back_end/` + imgUrl
    return imgUrl
}
export default changer