/* =============================================================================
#KAPAG ANG ORAS AY TUMATAKBO at ang araw, taon ay lumilipas dito lamang po hehe
================================================================================ */
function bigyan_mo_ng_oras_ang_sarili() {
    var x = new Date()
    var minutes = x.getMinutes();
    var hours = x.getHours();
    var ampm = hours >= 12 ? ' PM' : ' AM';
    var hours = x.getHours() % 12;
    var hours = hours ? hours : 12; // kung ang oras ay '0' dapat gawing '12'
    var minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + x.getSeconds() + ' ' + ampm;
    var options = {month: 'long', year: 'numeric',  day: 'numeric'};
    var prnDt = new Date().toLocaleDateString('en-us', options);
    document.getElementById("dateTime").value = prnDt +" "+ strTime;
    iniwankaparin();
     }
function iniwankaparin(){
    // MGA SIGUDO KUNG SAAN NAIISIP MO SIYA
    var refresh= 1000; // Refresh rate in milli seconds
    mytime = setTimeout('bigyan_mo_ng_oras_ang_sarili()',refresh);
}
    iniwankaparin();

