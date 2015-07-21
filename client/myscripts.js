var heading_cur=0;//current header
function showHeading(){
    $('#heading'+(heading_cur+1)).css({opacity: 0}).animate({opacity: 1.0,left: "50px"}, 1000);
    setTimeout(hideHeading, 5000);//hide it in 5 seconds
}
function hideHeading(){
    $('#heading'+(heading_cur+1)).css({opacity: 1}).animate({opacity: 0,left: "125px"}, 1000
        ,function(){
            showHeading();//show the next when this has completed
        });
    heading_cur=(heading_cur+1)%4;
}
$(document).ready(function() {
    showHeading();//start the loop
})