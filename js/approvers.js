$(document).ready(function () {
    // ** REQUEST FOR QND FOR APPROVAL DETAILS ✅
    // ** ATTACHED DETAILS TO THE PAGE ✅
    // ** REQUEST IF CONTAINMENT, CORRECTION, CORRECTIVE DETAILS ✅
    // ** ATTACHED CONTAINMENT, CORRECTION, CORRECTIVE DETAILS ✅

    //=================================================
    // REQUEST FOR APPROVAL QDN DETAILS (request 19)
    //=================================================
    $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: { request: 19 },
        cache: false,
        dataType: "json",
        success: forApprovalDetails,
        error: function(){      
            $("#ibName, #ibTeam, #ibTeam, #itName, #itTeam, #customer, #machine, #pkgType, #partName, #station, #lotId, #teamResp, #dateTime, #classification, #defects, #failureMode, #disposition, #rooCause, #codDes").html("");
        }
    });
    //=================================================
    // </END OF REQUEST FOR APPROVAL QNd DETAILS
    //=================================================

    //=================================================
    //FUNCTION TO HANDLE FOR APPROVAL QDN DETAILS
    //=================================================
    function forApprovalDetails(data) {
        if (data){
            // console.log(data);
            // STORES THE JSON DATA INTO A VARIABLES
            var qdnDbId = data[0]['id'];
            var qdnNum = data[0]["qdnNo"];
            var issuedByName = data[0]['issuedBy'];
            var issuedByTeam = data[0]['issuedByTeam'];
            var issuedByName = data[0]['issuedByName'];
            var issuedByTeam = data[0]['issuedByTeam'];
            var issuedToName = data[0]['issuedToName'];
            var issuedToTeam = data[0]['issuedToTeam'];
            var customer = data[0]['customer'];
            var machine = data[0]['machine'];
            var packageType = data[0]['packageType'];
            var deviceName = data[0]['deviceName'];
            var station = data[0]['station'];
            var lotId = data[0]['lotId'];
            var teamResp = data[0]['teamResp'];
            var dateTime = data[0]['dateTime'];
            var classification = data[0]['classification'];
            var defects = data[0]['defects'];
            var failure_mode = data[0]['failure_mode'];
            var disposition = data[0]['disposition'];
            var cause_of_defects = data[0]['cause_of_defects'];
            var cause_of_defects_des = data[0]['cause_of_defects_des'];
            var prod_auth_col = data[0]['prod_auth_col'];
            var ee_auth_col = data[0]['ee_auth_col'];
            var pe_auth_col = data[0]['pe_auth_col'];
            var qa_auth_col = data[0]['qa_auth_col'];
            var others_auth_col = data[0]['others_auth_col'];

            // APPENDING THE VARIABLE VALUE INTO THE HTML ID's BELOW
            $("#qdnNumber").val(qdnNum);
            $("#ibName").html(issuedByName);
            $("#ibTeam").html(issuedByTeam);
            $("#itName").html(issuedToName);
            $("#itTeam").html(issuedToTeam);
            $("#customer").html(customer);
            $("#machine").html(machine);
            $("#pkgType").html(packageType);
            $("#partName").html(deviceName);
            $("#station").html(station);
            $("#lotId").html(lotId);
            $("#teamResp").html(teamResp);
            $("#dateTime").html(dateTime);
            $("#classification").html(classification);
            $("#defects").html(defects);
            $("#failureMode").html(failure_mode);
            $("#disposition").html(disposition);
            $("#rooCause").html(cause_of_defects);
            $("#codDes").html(cause_of_defects_des);
            if(prod_auth_col){
                
            }
            if (ee_auth_col){
                $('#EEAuth-button span.ui-selectmenu-text').html(ee_auth_col);
            }
            if (pe_auth_col){
                $('#PEAuth-button span.ui-selectmenu-text').html(pe_auth_col);
            }
            if (qa_auth_col){
                $('#qaAuth-button span.ui-selectmenu-text').html(qa_auth_col);
            }
            if (others_auth_col){
                $('#othersAuth-button span.ui-selectmenu-text').html(others_auth_col);
            };
            

            //REQUEST FOR QND CONTAINMENT <-- DETAILS
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedContainment: qdnDbId, request: 10 },
                cache: false,
                dataType: "json",
                success: containmentDetails,
            });
            // </ END OF REQUEST FOR QDN CONTAINMENT DETAILS
            // FUNCTION TO HANDLE CONTAINMENTS DETAILS
            function containmentDetails(response){
                // console.log(response);
                // CHECK IF THE containmentDetails(response) PARAM IS NOT NULL
                if (response){
                    var responseLen = response.length;
                    var containmentItemCount = 0;
                    const contTblRow = document.createElement('tr');
                    const contTblCol = document.createElement('td');
                    const contTblRespCol = document.createElement('td');
                    const contTblWhenCol = document.createElement('td');
                    const contTblStatCol = document.createElement('td');
                    var containmentRow = document.getElementById('containmentRow');
                    var containmentCol = document.getElementById('containmentCol');
                    var containmentRespCol = document.getElementById('containmentRespCol');
                    var containmentWhenCol = document.getElementById('containmentWhenCol');
                    var containmentStatCol = document.getElementById('containmentStatCol');
                    // console.log("this is containment", containmentCol.innerHTML = "TEST");
                    // LOOP FOR EVERY CONTAINMENT DETAILS
                    for (var i = 0; i < responseLen; i++){
                        var actions = response[i]['actions'];
                        var resp = response[i]['responsible'];
                        var when = response[i]['when'];
                        var status = response[i]['status'];
                        
                        if (containmentItemCount == 0){
                            containmentCol.innerHTML = actions;
                            containmentRespCol.innerHTML = resp;
                            containmentWhenCol.innerHTML = when;
                            containmentStatCol.innerHTML = status;
                            containmentItemCount ++;
                        }
                        else {
                            contTblRow.id = "containmentRow" + containmentItemCount;
                            contTblCol.innerHTML = actions;
                            contTblRespCol.innerHTML = resp;
                            contTblWhenCol.innerHTML = when;
                            contTblStatCol.innerHTML = status;
                            $(containmentRow).after(contTblRow);
                            $(contTblRow).append(contTblCol);
                            $(contTblRow).append(contTblRespCol);
                            $(contTblRow).append(contTblWhenCol);
                            $(contTblRow).append(contTblStatCol);
                            containmentItemCount ++;
                        }
                    };
                    // </END OF LOOP FOR CONTAINMENT DETAILS
                };
                // </END OF CHECKING IF THE containmentDetails(response) PARAM IS NOT NULL
            };
            // </END OF FUNCTION TO HANDLE CONTAINMENTS DETAILS

            //REQUEST FOR QND CORRECTION <--DETAILS
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedCorrection: qdnDbId, request: 11 },
                cache: false,
                dataType: "json",
                success: correctionDetails,
            });
            // </ END OF REQUEST FOR QDN CORRECTION DETAILS
            // FUNCTION TO HANDLE CORRECTION DETAILS
            function correctionDetails(response){
                //CHECK IF THE correctionDetails(response) PARAM IS NOT NULL
                if (response){
                    // console.log(response);
                    var responseLen = response.length;
                    var correctionItemCount = 0;
                    const corrTblRow = document.createElement('tr');
                    const corrTblCol = document.createElement('td');
                    const corrTblRespCol = document.createElement('td');
                    const corrTblWhenCol = document.createElement('td');
                    const corrTblStatCol = document.createElement('td');
                    var correctionRow = document.getElementById('correctionTblRow');
                    var correctionTblCol = document.getElementById('correctionTblCol');
                    var correctionTblRespCol = document.getElementById('correctionTblRespCol');
                    var correctionTblWhenCol = document.getElementById('correctionTblWhenCol');
                    var correctionTblStatCol = document.getElementById('correctionTblStatCol');
                    // LOOP FOR EVERY CORRECTION DETAILS
                    for (var i = 0; i < responseLen; i++){
                        var actions = response[i]['actions'];
                        var resp = response[i]['responsible'];
                        var when = response[i]['when'];
                        var status = response[i]['status'];
                        
                        if (correctionItemCount == 0){
                            correctionTblCol.innerHTML = actions;
                            correctionTblRespCol.innerHTML = resp;
                            correctionTblWhenCol.innerHTML = when;
                            correctionTblStatCol.innerHTML = status;
                            correctionItemCount ++;
                        }
                        else {
                            corrTblRow.id = "correctionTblRow" + correctionItemCount;
                            corrTblCol.innerHTML = actions;
                            corrTblRespCol.innerHTML = resp;
                            corrTblWhenCol.innerHTML = when;
                            corrTblStatCol.innerHTML = status;
                            $(correctionRow).after(corrTblRow);
                            $(corrTblRow).append(corrTblCol);
                            $(corrTblRow).append(corrTblRespCol);
                            $(corrTblRow).append(corrTblWhenCol);
                            $(corrTblRow).append(corrTblStatCol);
                            correctionItemCount ++;
                        };
                    };
                    // </END OF LOOP FOR CORRECTION DETAILS
                };
                // </END OF CHECKING IF THE correctionDetails(response) PARAM IS NOT NULL
            }
            // </END OF FUNCTION TO HANDLE CORRECTIVE DETAILS

            //REQUEST FOR QND CORRECTIVE <-- DETAILS
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedCorrective: qdnDbId, request: 12 },
                cache: false,
                dataType: "json",
                success: correctiveDetails,
            });
            // </ END OF REQUEST FOR QDN CORRECTIVE DETAILS
            // FUNCTION TO HANDLE CORRECTIVE DETAILS
            function correctiveDetails(response){
                //CHECK IF THE correctiveDetails(response) PARAM IS NOT NULL
                if (response){
                    // console.log(response);
                    var responseLen = response.length;
                    var correctiveItemCount = 0;
                    const corrtvTblRow = document.createElement('tr');
                    const corrTblCol = document.createElement('td');
                    const corrTblRespCol = document.createElement('td');
                    const corrTblWhenCol = document.createElement('td');
                    const corrTblStatCol = document.createElement('td');
                    var correctiveRow = document.getElementById('correctiveTblRow');
                    var correctiveTblCol = document.getElementById('correctiveTblCol');
                    var correctiveTblRespCol = document.getElementById('correctiveTblRespCol');
                    var correctiveTblWhenCol = document.getElementById('correctiveTblWhenCol');
                    var correctiveTblStatCol = document.getElementById('correctiveTblStatCol');
                    // LOOP FOR EVERY CORRECTIVE DETAILS
                    for (var i = 0; i < responseLen; i++){
                        var actions = response[i]['actions'];
                        var resp = response[i]['responsible'];
                        var when = response[i]['when'];
                        var status = response[i]['status'];
                        
                        if (correctiveItemCount == 0){
                            correctiveTblCol.innerHTML = actions;
                            correctiveTblRespCol.innerHTML = resp;
                            correctiveTblWhenCol.innerHTML = when;
                            correctiveTblStatCol.innerHTML = status;
                            correctiveItemCount ++;
                        }
                        else {
                            corrtvTblRow.id = "correctiveTblRow" + correctiveItemCount;
                            corrTblCol.innerHTML = actions;
                            corrTblRespCol.innerHTML = resp;
                            corrTblWhenCol.innerHTML = when;
                            corrTblStatCol.innerHTML = status;
                            $(correctiveRow).after(corrtvTblRow);
                            $(corrtvTblRow).append(corrTblCol);
                            $(corrtvTblRow).append(corrTblRespCol);
                            $(corrtvTblRow).append(corrTblWhenCol);
                            $(corrtvTblRow).append(corrTblStatCol);
                            correctiveItemCount ++;
                        };
                    };
                    // </END OF LOOP FOR CORRECTIVE DETAILS
                };
                // </END OF CHECKING IF THE correctionDetails(response) PARAM IS NOT NULL
            }
            // </END OF FUNCTION TO HANDLE CORRECTIVE DETAILS
        }
        else {

            $("#ibName, #ibTeam, #ibTeam, #itName, #itTeam, #customer, #machine, #pkgType, #partName, #station, #lotId, #teamResp, #dateTime, #classification, #defects, #failureMode, #disposition, #rooCause, #codDes").html("");

        };
    }; 
    //=================================================
    // </END OF FUNCTION TO HANDLE FOR APPROVAL 
    // QDN DETAILS
    //=================================================

    //=================================================
    // HANDLE THE SEARCH EVENT
    // //=================================================
    $('#qdnNumber').on('input',()=> {
        var qdnNumber = $("#qdnNumber").val();
        var qdnNumber = $.trim(qdnNumber);
        // CREATING A CONSTANT VARIABLE FOR A CONTAINMENT, CORRECTION
        // AND CORRECTIVE
        function defaultTableBodies(){
            // ALL ABOUT CONTAINMENT TABLE FORMAT
            const tblBodyContId = document.createElement('tbody');
            tblBodyContId.id = "tblBodyContId";
            const containmentRow = document.createElement('tr');
            containmentRow.id = "containmentRow"
            const containmentCol = document.createElement('td');
            containmentCol.id = "containmentCol";
            containmentCol.innerHTML = "Empty!";
            const containmentRespCol = document.createElement('td');
            containmentRespCol.id = "containmentRespCol";
            containmentRespCol.innerHTML = "Empty!";
            const containmentWhenCol = document.createElement('td');
            containmentWhenCol.id = "containmentWhenCol";
            containmentWhenCol.innerHTML = "Empty!";
            const containmentStatCol = document.createElement('td');
            containmentStatCol.id = "containmentStatCol";
            containmentStatCol.innerHTML = "Empty!";

            $("#tblHeadContId").after(tblBodyContId);
            $(tblBodyContId).append(containmentRow);
            $(containmentRow).append(containmentCol, containmentRespCol, containmentWhenCol, containmentStatCol);

            // // ALL ABOUT CORRECTION TABLE FORMAT
            const tblBodyCorrId = document.createElement('tbody');
            tblBodyCorrId.id = "tblBodyCorrId";
            const correctionRow = document.createElement('tr');
            correctionRow.id = "correctionTblRow"
            const correctionCol = document.createElement('td');
            correctionCol.id = "correctionTblCol";
            correctionCol.innerHTML = "Empty!";
            const correctionRespCol = document.createElement('td');
            correctionRespCol.id = "correctionTblRespCol";
            correctionRespCol.innerHTML = "Empty!";
            const correctionWhenCol = document.createElement('td');
            correctionWhenCol.id = "correctionTblWhenCol";
            correctionWhenCol.innerHTML = "Empty!";
            const correctionStatCol = document.createElement('td');
            correctionStatCol.id = "correctionTblStatCol";
            correctionStatCol.innerHTML = "Empty!";

            $("#tblHeadCorrId").after(tblBodyCorrId);
            $(tblBodyCorrId).append(correctionRow);
            $(correctionRow).append(correctionCol, correctionRespCol, correctionWhenCol, correctionStatCol);

            // ALL ABOUT CORRECTIVE TABLE FORMAT
            const tblBodyCorrtvId = document.createElement('tbody');
            tblBodyCorrtvId.id = "tblBodyCorrtvId";
            const correctiveRow = document.createElement('tr');
            correctiveRow.id = "correctiveTblRow"
            const correctiveCol = document.createElement('td');
            correctiveCol.id = "correctiveTblCol";
            correctiveCol.innerHTML = "Empty!";
            const correctiveRespCol = document.createElement('td');
            correctiveRespCol.id = "correctiveTblRespCol";
            correctiveRespCol.innerHTML = "Empty!";
            const correctiveWhenCol = document.createElement('td');
            correctiveWhenCol.id = "correctiveTblWhenCol";
            correctiveWhenCol.innerHTML = "Empty!";
            const correctiveStatCol = document.createElement('td');
            correctiveStatCol.id = "correctiveTblStatCol";
            correctiveStatCol.innerHTML = "Empty!";

            $("#tblHeadCorrtvId").after(tblBodyCorrtvId);
            $(tblBodyCorrtvId).append(correctiveRow);
            $(correctiveRow).append(correctiveCol, correctiveRespCol, correctiveWhenCol, correctiveStatCol);
        };
        // </END OF CREATING A CONSTANT VARIABLE 

        // ERROR HANDLING FUNCTION
        function anError(){
            $("#ibName, #ibTeam, #ibTeam, #itName, #itTeam, #customer, #machine, #pkgType, #partName, #station, #lotId, #teamResp, #dateTime, #classification, #defects, #failureMode, #disposition, #rooCause, #codDes").html("");
            $("#productionAuth-button span.ui-selectmenu-text, #EEAuth-button span.ui-selectmenu-text, #PEAuth-button span.ui-selectmenu-text, #qaAuth-button span.ui-selectmenu-text, #othersAuth-button span.ui-selectmenu-text").html("Needs Approval...");
            $("#tblBodyContId").remove();
            $("#tblBodyCorrId").remove();
            $("#tblBodyCorrtvId").remove();
            defaultTableBodies();
        };
        // </END OF ERROR HANDLING FUNCTION
        //WRAPPING AJAX CALL INTO A FUNCTION (request 20)
        function matchedQdnDetails(){
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: { qdnNum: qdnNumber,  request: 20 },
                cache: false,
                dataType: "json",
                success:   qdnDetailsReq, 
                error: function(){ 
                    anError();
                }
            });
        };
        // </ END OF WRAPPING AJAX CALL INTO A FUNCTION
        // CALLING THE FUNCTION 
        matchedQdnDetails();

        // #_1. FUNCTION THAT HANDLE THE RESULTS OF
        //  matchedQdnDetails() FUNCTION
        function qdnDetailsReq(data){
            if(data){
                // STORES THE JSON DATA INTO A VARIABLES
                // anError();
                var qdnDbId = data[0]['id'];
                var qdnNum = data[0]["qdnNo"];
                var issuedByName = data[0]['issuedBy'];
                var issuedByTeam = data[0]['issuedByTeam'];
                var issuedByName = data[0]['issuedByName'];
                var issuedByTeam = data[0]['issuedByTeam'];
                var issuedToName = data[0]['issuedToName'];
                var issuedToTeam = data[0]['issuedToTeam'];
                var customer = data[0]['customer'];
                var machine = data[0]['machine'];
                var packageType = data[0]['packageType'];
                var deviceName = data[0]['deviceName'];
                var station = data[0]['station'];
                var lotId = data[0]['lotId'];
                var teamResp = data[0]['teamResp'];
                var dateTime = data[0]['dateTime'];
                var classification = data[0]['classification'];
                var defects = data[0]['defects'];
                var failure_mode = data[0]['failure_mode'];
                var disposition = data[0]['disposition'];
                var cause_of_defects = data[0]['cause_of_defects'];
                var cause_of_defects_des = data[0]['cause_of_defects_des'];
                var prod_auth_col = data[0]['prod_auth_col'];
                var ee_auth_col = data[0]['ee_auth_col'];
                var pe_auth_col = data[0]['pe_auth_col'];
                var qa_auth_col = data[0]['qa_auth_col'];
                var others_auth_col = data[0]['others_auth_col'];

                // APPENDING THE VARIABLE VALUE INTO THE HTML ID's BELOW
                $("#qdnNumber").val(qdnNum);
                $("#ibName").html(issuedByName);
                $("#ibTeam").html(issuedByTeam);
                $("#itName").html(issuedToName);
                $("#itTeam").html(issuedToTeam);
                $("#customer").html(customer);
                $("#machine").html(machine);
                $("#pkgType").html(packageType);
                $("#partName").html(deviceName);
                $("#station").html(station);
                $("#lotId").html(lotId);
                $("#teamResp").html(teamResp);
                $("#dateTime").html(dateTime);
                $("#classification").html(classification);
                $("#defects").html(defects);
                $("#failureMode").html(failure_mode);
                $("#disposition").html(disposition);
                $("#rooCause").html(cause_of_defects);
                $("#codDes").html(cause_of_defects_des);

                prod_auth_col ?  $('#productionAuth-button span.ui-selectmenu-text').html(prod_auth_col) : $('#productionAuth-button span.ui-selectmenu-text').html("Needs Approval...");
                ee_auth_col ?  $('#EEAuth-button span.ui-selectmenu-text').html(ee_auth_col) : $('#EEAuth-button span.ui-selectmenu-text').html("Needs Approval...");
                pe_auth_col ?  $('#PEAuth-button span.ui-selectmenu-text').html(pe_auth_col) : $('#PEAuth-button span.ui-selectmenu-text').html("Needs Approval...");
                qa_auth_col ?  $('#qaAuth-button span.ui-selectmenu-text').html(qa_auth_col) : $('#qaAuth-button span.ui-selectmenu-text').html("Needs Approval...");
                others_auth_col ?  $('#othersAuth-button span.ui-selectmenu-text').html(others_auth_col) : $('#othersAuth-button span.ui-selectmenu-text').html("Needs Approval...");
                
                //REQUEST FOR QND CONTAINMENT <-- DETAILS
                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {matchedContainment: qdnDbId, request: 10 },
                    cache: false,
                    dataType: "json",
                    success: contDetails,
                });
                // </ END OF REQUEST FOR QDN CONTAINMENT DETAILS
                // FUNCTION TO HANDLE CONTAINMENTS DETAILS
                function contDetails(response){
                    // console.log(response);
                    // CHECK IF THE containmentDetails(response) PARAM IS NOT NULL
                    if (response){
                        var responseLen = response.length;
                        var containmentItemCount = 0;
                        const contTblRow = document.createElement('tr');
                        const contTblCol = document.createElement('td');
                        const contTblRespCol = document.createElement('td');
                        const contTblWhenCol = document.createElement('td');
                        const contTblStatCol = document.createElement('td');
                        var containmentRow = document.getElementById('containmentRow');
                        var containmentCol = document.getElementById('containmentCol');
                        var containmentRespCol = document.getElementById('containmentRespCol');
                        var containmentWhenCol = document.getElementById('containmentWhenCol');
                        var containmentStatCol = document.getElementById('containmentStatCol');
                        // console.log("this is containment", containmentCol.innerHTML = "TEST");
                        // LOOP FOR EVERY CONTAINMENT DETAILS
                        for (var i = 0; i < responseLen; i++){
                            var actions = response[i]['actions'];
                            var resp = response[i]['responsible'];
                            var when = response[i]['when'];
                            var status = response[i]['status'];
                            
                            if (containmentItemCount == 0){
                                containmentCol.innerHTML = actions;
                                containmentRespCol.innerHTML = resp;
                                containmentWhenCol.innerHTML = when;
                                containmentStatCol.innerHTML = status;
                                containmentItemCount ++;
                            }
                            else {
                                contTblRow.id = "containmentRow" + containmentItemCount;
                                contTblCol.innerHTML = actions;
                                contTblRespCol.innerHTML = resp;
                                contTblWhenCol.innerHTML = when;
                                contTblStatCol.innerHTML = status;
                                $(containmentRow).after(contTblRow);
                                $(contTblRow).append(contTblCol);
                                $(contTblRow).append(contTblRespCol);
                                $(contTblRow).append(contTblWhenCol);
                                $(contTblRow).append(contTblStatCol);
                                containmentItemCount ++;
                            }
                        };
                        // </END OF LOOP FOR CONTAINMENT DETAILS
                    };
                    // </END OF CHECKING IF THE containmentDetails(response) PARAM IS NOT NULL
                };
                // </END OF FUNCTION TO HANDLE CONTAINMENTS DETAILS

                //REQUEST FOR QND CORRECTION <--DETAILS
                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {matchedCorrection: qdnDbId, request: 11 },
                    cache: false,
                    dataType: "json",
                    success: corrDetails,
                    // error: 
                });
                // </ END OF REQUEST FOR QDN CORRECTION DETAILS
                // FUNCTION TO HANDLE CORRECTION DETAILS
                function corrDetails(response){
                    //CHECK IF THE correctionDetails(response) PARAM IS NOT NULL
                    if (response){
                        // console.log(response);
                        var responseLen = response.length;
                        var correctionItemCount = 0;
                        const corrTblRow = document.createElement('tr');
                        const corrTblCol = document.createElement('td');
                        const corrTblRespCol = document.createElement('td');
                        const corrTblWhenCol = document.createElement('td');
                        const corrTblStatCol = document.createElement('td');
                        var correctionRow = document.getElementById('correctionTblRow');
                        var correctionTblCol = document.getElementById('correctionTblCol');
                        var correctionTblRespCol = document.getElementById('correctionTblRespCol');
                        var correctionTblWhenCol = document.getElementById('correctionTblWhenCol');
                        var correctionTblStatCol = document.getElementById('correctionTblStatCol');
                        // LOOP FOR EVERY CORRECTION DETAILS
                        for (var i = 0; i < responseLen; i++){
                            var actions = response[i]['actions'];
                            var resp = response[i]['responsible'];
                            var when = response[i]['when'];
                            var status = response[i]['status'];
                            
                            if (correctionItemCount == 0){
                                correctionTblCol.innerHTML = actions;
                                correctionTblRespCol.innerHTML = resp;
                                correctionTblWhenCol.innerHTML = when;
                                correctionTblStatCol.innerHTML = status;
                                correctionItemCount ++;
                            }
                            else {
                                corrTblRow.id = "correctionTblRow" + correctionItemCount;
                                corrTblCol.innerHTML = actions;
                                corrTblRespCol.innerHTML = resp;
                                corrTblWhenCol.innerHTML = when;
                                corrTblStatCol.innerHTML = status;
                                $(correctionRow).after(corrTblRow);
                                $(corrTblRow).append(corrTblCol);
                                $(corrTblRow).append(corrTblRespCol);
                                $(corrTblRow).append(corrTblWhenCol);
                                $(corrTblRow).append(corrTblStatCol);
                                correctionItemCount ++;
                            };
                        };
                        // </END OF LOOP FOR CORRECTION DETAILS
                    };
                    // </END OF CHECKING IF THE correctionDetails(response) PARAM IS NOT NULL
                }
                // </END OF FUNCTION TO HANDLE CORRECTIVE DETAILS

                //REQUEST FOR QND CORRECTIVE <-- DETAILS
                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {matchedCorrective: qdnDbId, request: 12 },
                    cache: false,
                    dataType: "json",
                    success: correctiveDetails,
                });
                // </ END OF REQUEST FOR QDN CORRECTIVE DETAILS
                // FUNCTION TO HANDLE CORRECTIVE DETAILS
                function correctiveDetails(response){
                    //CHECK IF THE correctiveDetails(response) PARAM IS NOT NULL
                    if (response){
                        // console.log(response);
                        var responseLen = response.length;
                        var correctiveItemCount = 0;
                        const corrtvTblRow = document.createElement('tr');
                        const corrTblCol = document.createElement('td');
                        const corrTblRespCol = document.createElement('td');
                        const corrTblWhenCol = document.createElement('td');
                        const corrTblStatCol = document.createElement('td');
                        var correctiveRow = document.getElementById('correctiveTblRow');
                        var correctiveTblCol = document.getElementById('correctiveTblCol');
                        var correctiveTblRespCol = document.getElementById('correctiveTblRespCol');
                        var correctiveTblWhenCol = document.getElementById('correctiveTblWhenCol');
                        var correctiveTblStatCol = document.getElementById('correctiveTblStatCol');
                        // LOOP FOR EVERY CORRECTIVE DETAILS
                        for (var i = 0; i < responseLen; i++){
                            var actions = response[i]['actions'];
                            var resp = response[i]['responsible'];
                            var when = response[i]['when'];
                            var status = response[i]['status'];
                            
                            if (correctiveItemCount == 0){
                                correctiveTblCol.innerHTML = actions;
                                correctiveTblRespCol.innerHTML = resp;
                                correctiveTblWhenCol.innerHTML = when;
                                correctiveTblStatCol.innerHTML = status;
                                correctiveItemCount ++;
                            }
                            else {
                                corrtvTblRow.id = "correctiveTblRow" + correctiveItemCount;
                                corrTblCol.innerHTML = actions;
                                corrTblRespCol.innerHTML = resp;
                                corrTblWhenCol.innerHTML = when;
                                corrTblStatCol.innerHTML = status;
                                $(correctiveRow).after(corrtvTblRow);
                                $(corrtvTblRow).append(corrTblCol);
                                $(corrtvTblRow).append(corrTblRespCol);
                                $(corrtvTblRow).append(corrTblWhenCol);
                                $(corrtvTblRow).append(corrTblStatCol);
                                correctiveItemCount ++;
                            };
                        };
                        // </END OF LOOP FOR CORRECTIVE DETAILS
                    };
                    // </END OF CHECKING IF THE correctionDetails(response) PARAM IS NOT NULL
                }
                // </END OF FUNCTION TO HANDLE CORRECTIVE DETAILS
            }
            else{
                anError();
            };
        };
        // </END OF #_1.

        // AJAX REQUEST FOR AC ARRAY SOURCE
        var qdnNumbers = [];
        // REQUEST FOR QND DETAILS (request 21)
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {searchForThisQdnNo: qdnNumber, request: 21 },
            cache: false,
            dataType: "json",
            success: function (data) {
                // console.log (data);
                if (data){
                    var dataLen = data.length;
                    for (var i = 0; i < dataLen; i++) {
                        qdnNumbers.push(data[i]['qdnNo']);
                    };
                };
            }
        });
        // AC SUGGESTION
        $(this).autocomplete({
            source: qdnNumbers,
            select: function (event, ui) {
                //"selectedValue" variable is to identify the 
                // users selected value on the  AC suggestions.
                var selectedValue = ui["item"]["value"];
                console.log(selectedValue);
                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: { qdnNum: selectedValue,  request: 20 },
                    cache: false,
                    dataType: "json",
                    success:   qdnDetailsReq, 
                    error: function(){ 
                        anError();
                    }
                });
                qdnDetailsReq();
            },
        });
    });

    // $('#qdnNumber').on('input',()=> {
    //     let value = document.getElementById('qdnNumber');
    //     console.log("This is test", value.value);
    // })
    //=================================================
    // </END OF HANDLING THE SEARCH EVENT
    //=================================================
});