const linkTo = (distination,b)=>{
    let tempUrl = window.location.href.split('/')
    tempUrl.pop()
    tempUrl = tempUrl.join('/')
    if(typeof b === 'function'){
        b();
    }
    window.location.href = tempUrl + '/' + distination
}
export default linkTo