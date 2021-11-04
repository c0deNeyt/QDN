/**REASSIGNMENT VARIABLES */
var reAssignmentInputs = `<div id='reAssignment'>
    <div  class='row '>
        <div class='col-4'>
            <label for='reAssignTo' class='col-form-label'>ReassignTo</label>
            <input id='reAssignTo' type='number' class='form-control' placeholder='Employee #...' required/>
        </div>
        <div class='col-5'>
            <label class='col-form-label' for='reAssignToName'>Emp. Name:</label>
            <input id='reAssignToName' type='text' class='form-control' placeholder="Autofill..." disabled/>
        </div>
        <div class='col-3'>
            <label class='col-form-label'>Team:</label>
            <input id='reAssignToTeam' type='text' class='form-control' placeholder="Autofill..." disabled/>
        </div>
    </div>
    <div class='row'>
        <div class = 'col-4'></div>
        <div class = 'col-5'>
            <label class='col-form-label' for='dept' >Department:</label>
            <input id='dept' type='text' class='form-control' placeholder="Autofill..." disabled/>
        </div>
        <div class = 'col-3'></div>
    </div>
    <div class='row col-form-label-lg mt-3'>
        <div class='col'>
            <label class='col-form-label'>Reassignment Description:</label>
            <textarea id='reAssignmentDes' class='form-control text-center w-50' rows='2' required></textarea>
        </div>
    </div>
    <button class='submitReassignment w-100 btn btn-primary btn-lg mt-3' id='submitReassignment'>Submit for Reassignment</button>
</div>`;

/**DATE VARIABLES */
const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const date = new Date();
const currentDay = date.getDate();
/**ALERTS GLOBAL VARIABLES*/
let fontColor;
let bgOverlayColor;
let bgColorImage;
let bgColor;
let bdGifUrl;
let bdPosition;
let bdColor;

/**OBJECT RESPONSIBLE FOR ALERTS*/
const alertObject = {
    /** ERROR ALERT */
   async errorAlert() {
       const Toast = Swal.mixin({
           toast: true,
           position: 'top-right',
           iconColor: 'white',
           customClass: {
               popup: 'colored-toast'
           },
           allowEscapeKey: false,
           showConfirmButton: false,
           timer: 5000,
           timerProgressBar: true,
           //**This will let you pause and play the alert loading*/
           didOpen: (toast) => { 
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
           }
       });
       await Toast.fire({
           icon: 'error',
           title: 'Something Went Wrong at analysis.js!',
           html:"<b style ='color:red;'>"+  `${this.data}` +"</b>",
       });
   },
   defaultThemeSetting() {
       fontColor = "#595959";
       bgColor = `#fff`;
       /**DEFAULT LINEAR radial gradient*/
       bdColor = `radial-gradient(circle, rgba(128,0,0, 0.6) 0%, rgba(127,127,7,0.6) 46%)`;
       /**BEE GIF */
       bdGifUrl = `url("https://boholbeefarm.com/img/buzzbee.gif")`;
       bdPosition = `center`
   },
   halloweenThemeSetting() {
       fontColor = "#fff";
       bgColor = `#000`;
       /**broom with pumpkin image*/
       bgColorImage = `#000 url(https://images.pexels.com/photos/5408080/pexels-photo-5408080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`;
       /**HALLOWEEN*/
       bdColor = `linear-gradient(94deg, rgba(186,59,0,0.6) 0%, rgba(0,0,0,0.6) 100%)`;
       /**GHOST GIF**/
       bdGifUrl = `url("https://images.squarespace-cdn.com/content/v1/57fc473b6a496313f1bf59ea/1597463916534-UJCWHLQ8HC1I591ZWVIS/giphy-ghost-alt.gif")`;
       bdPosition = `top left`;
   },
   christmasThemeSetting() {
       fontColor = "#fff";
       bgColorImage = `linear-gradient(45deg, rgba(4,186,0,1) 0%, rgba(200,7,7,1) 100%)`;
       /**CHRISTMAS GRADIENT*/
       bdColor ='linear-gradient(45deg, rgba(17,121,0, 0.6) 0%, rgba(215,166,0, 0.6) 51%, rgba(184,0,0, 0.6) 100%)';
       /**GHOST GIF**/
       bdGifUrl = 'url("https://i.giphy.com/media/7XAD7iitnID83tQ1WC/giphy.webp")';
       bdPosition = `bottom left`;
   },
   newYearThemeSetting() {
       fontColor = "#fff";
       bgColorImage = `radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(185,185,185,1) 100%)`;
       /**NEW YEAR GRADIENT*/
       bdColor =`radial-gradient(circle, rgba(0,0,0,0.8687850140056023) 70%, rgba(185,185,185,0) 100%)`;
       /**FIREWORKS GIF**/
       bdGifUrl = `url("https://i.giphy.com/media/3OvuH0GxGvbiakzthp/giphy.webp")`;
       bdPosition = `center`;
   },
   setTheme(){
       const currentDay = date.getDate();
       switch(this.monthOnly){
           case "November":
               if ((currentDay > 0) && (15 >= currentDay)){
                   this.halloweenThemeSetting();/**HALLOWEEN*/
               }
               else{
                   this.christmasThemeSetting();/**CHRISTMAS*/
               }
           break;
           case "December": 
               this.christmasThemeSetting();/**CHRISTMAS*/
           break;
           case "January": 
               this.newYearThemeSetting();/**NEW YEAR*/
           break;
           default:
               this.defaultThemeSetting();/**DEFAULT*/
           break;
       }
   },
   /** SUCCESS ALERT */
   async successAlert() {
       this.setTheme();
       return Swal.fire({
           title: `<h2 style="color: ${fontColor}; font-weight: bold;"> ${this.tittle}</h2>`,
           html:`<b style ='color:${fontColor}; font-size: 1.5rem'>`+  `${this.body}` +"</b>",
           width: 600,
           /**SUCCESS GIF*/
           imageUrl: 'https://images.squarespace-cdn.com/content/v1/5063b09ee4b016af496f9ae8/1580760898623-CS6M1E5EM0S45D4328ZG/success_celebration_400.gif',
           imageWidth: 200,
           imageHeight: 200,
           padding: '1.2rem',
           timer: 2500000,
           timerProgressBar: true,
           showConfirmButton: false,
           allowOutsideClick: false,
           allowEscapeKey: false,
           allowEnterKey: false, 
           background: `${bgColorImage}`,
           backdrop: `
           ${bdPosition}
           no-repeat
           ${bdGifUrl},
           ${bdColor}
           ${bdPosition}`,
           //**This will let you pause and play the alert loading*/
           didOpen: (toast) => { 
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
           }
       }); 
   }
};
const reAssignEvent = {
    unsetReAssignmentData: function(){
        /**REMOVING REASSIGNMENT */
        let reAssignment = document.querySelectorAll(".fromDbData");
        for(let i=0;i<reAssignment.length;i++){
        reAssignment[i].remove();
    }
    },
    toggleOff: async function() {
        $("#reAssignment, #submitReassignment").remove();
        $("#reAssignDiv").after($('#analysisSection').html());
        this.unsetReAssignmentData();
        let currentMatchedQdnNum = $("#qdnNumber").val().replace(/\s/g,'');
        /*INSTANCE OF ONLOAD REQUEST*/
        const onloadRequest = new onLoadRequestEvent(8, currentMatchedQdnNum);
        /**MATCHED QDN NUMBER FROM urlParam Parameter */
        let details = await onloadRequest.searchQdnDetails();
        const filteredDetails = Object.values(details[0]);
        appendToDOM(filteredDetails);
    },
    autoComplete: function(response) {
        // VARIABLE FOR EACH ROW RESULT FROM DATABASE
        var empName = response[0]['EMP_NAME'];
        var empTeam = response[0]['TEAM'];
        var empDepart = response[0]['DEPARTMENT'];
        // console.log("Details from Database", empName, "Team", empTeam);
        // PARSING VARIABLE TO THE HTML ELEMENT
        $('#reAssignToName').val(empName);
        $('#reAssignToTeam').val(empTeam);
        $('#dept').val(empDepart);
        $("#reAssignToName,#reAssignToTeam, #reAssignTo, #dept")
            .css({
                "border": "",
            });
        $("#reAssignToName, #reAssignToTeam")
            .attr("placeholder", "");
        $("#reAssignToName, #reAssignToTeam, #reAssignTo, #dept")
            .css({
                "color": "",
                "border": "1px solid #63f200"
            });
    },
};

