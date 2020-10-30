const changer = (imgUrl)=>{
    try{
    imgUrl.replace(`\\`, '/')
    }catch (error) {
        console.log('invaild img url')
    }
    imgUrl = `http://172.20.10.7:8080/back_end_war_exploded/` + imgUrl
    return imgUrl
}
export default changer