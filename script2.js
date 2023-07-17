
function getTime(){
    let h = document.getElementById('h')
    let m = document.getElementById('m')
    let s = document.getElementById('s')
    let txt = document.getElementById('am-pm')
    
    let time = new Date()
    document.getElementById('day').innerText = time.getDate()
    document.getElementById('month').innerText = time.getMonth()+1;
    document.getElementById('year').innerText = time.getFullYear()
    let hours = time.getHours();
    
    hours = parseInt(hours)
    if(hours > 12 && hours < 24){
        hours = hours - 12;
        hours = hours.toString();
        h.innerHTML = hours;
        txt.innerHTML = "PM"
    }else{
        txt.innerHTML = "AM"
        h.innerHTML = hours;
    }

    m.innerText = time.getMinutes()
    s.innerText = time.getSeconds()

}
setInterval(getTime,1000)