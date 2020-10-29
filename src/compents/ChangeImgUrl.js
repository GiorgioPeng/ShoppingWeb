const changer = (imgUrl)=>{
    try{
    imgUrl.replace(`\\`, '/')
    }catch (error) {
        console.log('invaild img url')
    }
    imgUrl = `http://47.103.207.168:8081/back_end_war_exploded/` + imgUrl
    return imgUrl
}
export default changer