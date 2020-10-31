// skip to a url
// --
// distination: the distination url
// callBack: the callBack of do this opertaion
const linkTo = (distination,callBack)=>{
    let tempUrl = window.location.href.split('/')
    tempUrl.pop()
    tempUrl = tempUrl.join('/')
    if(typeof callBack === 'function'){
        callBack();
    }
    console.log(tempUrl + '/' + distination)
    window.location.href = tempUrl + '/' + distination
}
export default linkTo