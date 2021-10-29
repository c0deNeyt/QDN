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