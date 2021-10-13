$(document).ready(function(){
    
    let gPackageTypeFromDb = ["N/A"];
    gPackageTypeFromDbLen = gPackageTypeFromDb.length;

    class editVal {
        constructor(gPackageTypeFromDb, userInputLen, userInput, uerpkgType){
            this.gPackageTypeFromDb = gPackageTypeFromDb
            this.userInput = userInput;
            this.userInputLen = userInputLen;
            this.uerpkgType = uerpkgType;
        };
        changingPackageValue (){
            let stringKey = "_";
            let key = 0;
            console.log("Not matched!", this.userInput);
            let customPkgTyp = [];
            for(var i=0; i<this.userInputLen; i++  ){
                if (this.userInput[i] == stringKey){
                    key = i;
                }
                if ((key != 0 ) && ( i > key)){
                    var nextValToTheKey  = this.userInput[i];
                    customPkgTyp.push(nextValToTheKey)
                }
            };

            var customPkgTypLen = customPkgTyp.length;
            var finalCustomPkgTyp = (customPkgTyp.join(""));

            if ((customPkgTypLen > 0 )){
                $("#packageType").val(finalCustomPkgTyp);
                gPackageTypeFromDb.pop();
                gPackageTypeFromDb.push(finalCustomPkgTyp);
                // console.log("OK PA AKO");
            }
            else{
                gPackageTypeFromDb.pop();
                document.getElementById('packageType').value = "N/A";
                $("#packageType").css({"color":"", "border-bottom": "1px solid #63f200"/*Green Hex*/}); 
                var tempPkgVal = this.uerpkgType;
                // console.log("OK PA AKO", tempPkgVal);
                gPackageTypeFromDb.push(tempPkgVal);
            };
        }
    };
   
    // var gPackageTypeFromInput = [""];
    var userInput     = $("#machine").val();
    // ISSUED TO VISIBILITY
    $('#issuedToDiv').css('visibility', 'hidden');
    $("#issuedToEmpName,#issuedToEmpTeam, #issuedToEmpNumber")
    .css({
        "color":"",
        "border": ""
    });
      //=======================================================================>
     // START FUNCTION TO DISABLE USE INPUT 
    //=========================================================================>
    $(document).keypress(
        function(event){
          if ((event.keyCode == '13') || (event.keyCode == '9')) {
            event.preventDefault();
          };
    });
      //=======================================================================>
     // END FUNCTION TO DISABLE USE INPUT 
    //=========================================================================> 

      //=======================================================================>
     //START OF ISSUED BY KEYUP FUNCTION
    //=========================================================================>
    $("#issuedByEmpNumber").keyup(function(){
        var userInput     = $("#issuedByEmpNumber").val();

        if (userInput != null){
            //==================================================>
            //START OF ISSUED BY REQUEST AJAX (AUTOFILL FEATURE)
            //==================================================>
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {employeeId: userInput, request: 3},
                cache : false,
                dataType: "json",
                success:function(response){
    
                    if(response != null){// if data is NOT EMPTY
                        // VARIABLE FOR EACH ROW RESULT FROM DATABASE
                        var empName         = response[0]['EMP_NAME'];
                        var empTeam         = response[0]['TEAM'];
                        var empStn         = response[0]['STATION'];
                         
                        // PARSING VARIABLE TO THE HTML ELEMENT
                        $('#issuedByEmpName').val(empName);
                        $('#issuedByEmpTeam').val(empTeam);
                        $('#station').val(empStn); 
                        $('#issuedToDiv').css('visibility', 'visible');
                        $("#issuedByEmpName, #issuedByEmpTeam").attr("placeholder", "AutoFill...");
                        $("#issuedToEmpName,#issuedToEmpTeam, #issuedToEmpNumber")
                        .css({
                            "border": "",
                        });
                        $("#station")  
                        .attr("placeholder", "");
                        $("#issuedByEmpName, #issuedByEmpTeam, #issuedByEmpNumber, #station")
                        .css({"color":"", "border-bottom": "1px solid #63f200"});
                    };
                }
            });
            //=========================================>
            // END OF ISSUED BY AJAX (AUTOFILL FEATURE) 
            //=========================================>
        }

        $("#issuedByEmpName, #issuedByEmpTeam, #station")
        .val("")
        .attr("placeholder", "Invalid 😡")
        .css({
            "color": "red",
            "border-bottom": "1px solid red"
        }); 
        $("#issuedByEmpNumber").css("border-bottom", "1px solid red");
        $('#issuedToDiv').css('visibility', 'hidden');
        $("#issuedToEmpName,#issuedToEmpTeam, #issuedToEmpNumber").val("");       
    });
      //=======================================================================>
     //END OF ISSUED BY KEYUP FUNCTION 
    //=========================================================================>


      //=======================================================================>
     //START OF ISSUED TO KEYUP FUNCTION
    //=========================================================================>
    $("#issuedToEmpNumber").keyup(function(){
        var userInput     = $("#issuedToEmpNumber").val(); 
        if (userInput != null){
            //===================================================>
            //START OF ISSUED TO REQUEST AJAX (AUTOFILL FEATURE)
            //===================================================>
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {employeeId: userInput, request: 3},
                cache : false,
                dataType: "json",
                success:function(response){
                   if(response != null){ // if data is NOT NULL
                    // VARIABLE FOR EACH ROW RESULT FROM DATABASE
                    var empName         = response[0]['EMP_NAME'];
                    var empTeam         = response[0]['TEAM'];
                    var empDept         = response[0]['DEPARTMENT'];
                    // PARSING VARIABLE TO THE HTML ELEMENT
                    $('#issuedToEmpName').val(empName);
                    $('#issuedToEmpTeam').val(empTeam); 
                    $('#teamResp').val(empDept); 
                    $("#issuedToEmpName,#issuedToEmpTeam, #issuedToEmpNumber")
                    .css({
                        "color":"",
                        "border-bottom": "1px solid #63f200"
                    });   
                    $("#teamResp").css({"color":"", "border-bottom": "1px solid #63f200"});      
                   }
                },
            });
            //=========================================>
            // END OF ISSUED TO AJAX (AUTOFILL FEATURE) 
            //=========================================>
        }  
        $("#issuedToEmpName,#issuedToEmpTeam")
        .val("")
        .attr("placeholder", "Invalid 😡")
        .css({
            "color": "red",
            "border-bottom": "1px solid red"
        });

        $("#teamResp")
        .val("")
        .attr("placeholder", "Invalid 😡")
        .css({
            "color":"",
            "border-bottom": "1px solid red"
        });      
        $("#issuedToEmpNumber").css("border-bottom", "1px solid red");
        $("#teamResp").val();               
    });
      //=======================================================================>
     //END OF ISSUED TO KEYUP FUNCTION
    //=========================================================================>

     
      //=======================================================================>
     //START OF MACHINE AUTOCOMPLETE(AC) KEYUP FUNCTION
    //=========================================================================>
    $(document).on("keyup", "#machine", function () {
        // GLOBAL VARIABLE FOR THE AJAX REQUEST INDEX
        var userMachInput     = $(this).val();
        var userInput         = $.trim(userMachInput);
        var userInputLen      =  userInput.length;
        
        var pkgType           = $("#packageType").val();
        var uerpkgType        = $.trim(pkgType);
        
        // CHECKS IF THE MACHINE IS EXISTS IF YES
        // GET  THE PACKAGE TYPE
        if($(this).val().length === 0 ){  
            $("#packageType") 
            .val("")
            .attr("placeholder", "Invalid 😡")
            .css({
                "color":"",
                "border-bottom": "1px solid red"
            });
        }
        else{
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {machineList: userInput, request: 4},
                cache : false,
                dataType: "json",
                success: (data) => {
                    // CHECK IF DATA PARAM IS NOT NULL
                    if ( data ){
                        var dataLen = data.length;
                        var pkgType = data[0]['package_type'];

                        if((dataLen > 0) && (gPackageTypeFromDbLen = 0)){
                            $("#packageType")
                            .val(pkgType)
                            .css({
                                "color":"",
                                "border-bottom": "1px solid #63f200"
                            });
                            gPackageTypeFromDb.push(pkgType);   
                        }
                        else {
                            gPackageTypeFromDb.pop();
                            $("#packageType").val(pkgType);
                            gPackageTypeFromDb.push(pkgType);
                        }    
                    }
                    else{
                        const varEditVal = new editVal(gPackageTypeFromDb, userInputLen, userInput);
                        const execMethod = varEditVal.changingPackageValue();
                    };
                    //</ END OF CHECKING IF DATA PARAM IS NOT NULL
                },
                error: () => {
                    $("#packageType").val("N/A").css({"color":"", "border-bottom": "1px solid #63f200"/*Green Hex*/});
                    const varEditVal = new editVal(gPackageTypeFromDb, userInputLen, userInput, uerpkgType);
                    const execMethod = varEditVal.changingPackageValue();
                },
            });
        };
        // STORING THE DATA FROM DATABASE INTO ARRAY
        // THIS DATA IS FOR AC JQUERY PLUGIN 
        var machinesDetails = [];
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {machineList: userInput, request: 2},
            cache : false,
            dataType: "json",
            success: function(data){
                // CHECK IF DATA PARAM IS NOT NULL
                if ( data ) {
                    var dataLen = data.length;
                    for(var i=0; i< dataLen; i++){
                        machinesDetails.push(data[i]['machines']);
                    };      
                }; 
                // </END OF CHECKING IF PARAM IS NOT NULL
            },                    
        });
        // TRIGGERS AUTOCOMPLETE(AC) AT THIS SELECTOR
        $( "#machine" ).autocomplete({
            source: machinesDetails,
            // SETTING PACKAGE VALUE WHEN AC
            // SUGGESTIONS IS SELECTED
            select: function (event, ui){
                //"selectedValue" variable is to identify the 
                // users selected value on the  AC suggestions.
                var selectedValue = ui["item"]["value"];

                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {machineList: selectedValue, request: 4},
                    cache : false,
                    dataType: "json",
                    success: function(data){
                        
                        var dataLen = data.length;
                        var pkgType = data[0]['package_type'];

                        if((dataLen > 0) && (gPackageTypeFromDbLen = 0)){
                            $("#packageType").val(pkgType);
                            gPackageTypeFromDb.push(pkgType);
                        }
                        else {
                            gPackageTypeFromDb.pop();
                            $("#packageType").val(pkgType);
                            gPackageTypeFromDb.push(pkgType);
                        };
                    }
                });
            }
        });      
    });
      //=======================================================================>
     // END OF MACHINE AUTOCOMPLETE KEYUP FUNCTION
    //=========================================================================>
   

      //=======================================================================>
     // START OF PART NAME AUTOCOMPLETE(AC) KEYUP FUNCTION
    //=========================================================================>
    $(document).on("keyup", "#partName", function (e) {

        // PART NAME INPUT AND WHITE SPACE TRIMMING 
        var userMachInput     = $(this).val();
        var userInput         = $.trim(userMachInput);
        var userInputLen      =  userInput.length;

        // PACKAGE TYPE AUTOFILL INPUT, AND WHITE SPACE TRIMMING
        var pkgType           = $("#packageType").val();
        var uerpkgType        = $.trim(pkgType);

        // VARIABLE FOR ORIGINAL PACKAGE TYPE
        var originalPackageType = gPackageTypeFromDb[0];
        
        if(userInputLen){
            // console.log("Searching for: ",userPartNameInput);
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedPartName: userInput, request: 6},
                cache : false,
                dataType: "json",
                success: function(data){
                    // console.log ("This is the partname Datat", data);
                    // CHECK IF data IS NOT NULL
                    if (data) {
                        var dataLen = data.length;
                        var leadCount   = data[0]['lead_counts'];
                        if (dataLen){
                            var newPkgTyp   = $("#packageType").value = originalPackageType + "_" + leadCount + "L";
                            $("#packageType").val(newPkgTyp);
                        };
                       
                    }
                     else {
                            // console.log ("This is the partname Datat", data);
                            // var stringKey = "_";
                            // key = 0;
                            // var customLeadCount = [];

                            // for(var i = 0; i < userPartNameInputLen; i++  ){
                                
                            //     if (userPartNameInput[i] == stringKey){
                            //         key = i;
                            //     }
                            //     if ((key != 0 ) && ( i > key)){
                            //         var nextValToTheKey  = userPartNameInput[i];
                            //         customLeadCount.push(nextValToTheKey)
                            //     }
                            // }
                            // var finalCustomLeadCount = (customLeadCount.join(""));
                            // $("#packageType").val(originalPackageType + "_" + finalCustomLeadCount + "L");
                            const varEditVal = new editVal(gPackageTypeFromDb, userInputLen, userInput, uerpkgType);
                            const execMethod = varEditVal.changingPackageValue();
                        };
                    // </END OF CHECKING IN data IS NOT NULL
                },
                error: ()=>{
                    const varEditVal = new editVal(gPackageTypeFromDb, userInputLen, userInput, uerpkgType);
                    const execMethod = varEditVal.changingPackageValue();
                },
            });           
        };
        // STORING THE DATA FROM DATABASE INTO ARRAY
        // THIS DATA IS FOR AC JQUERY PLUGIN 
        var partNameDetails = [];
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {thisPartName: userInput, request: 5},
            cache : false,
            dataType: "json",
            success: function(data){
                // CHECK IF DATA PARAM IS NOT NULL
                if ( data ){
                    var dataLen = data.length;
                    for(var i=0; i< dataLen; i++){
                        partNameDetails.push(data[i]['names']);
                    };    
                };
                // </END OF CHECKING DATA PARAM IS NOT NULL
            },
        });

         // TRIGGERS AUTOCOMPLETE(AC) AT THIS SELECTOR
        $( "#partName" ).autocomplete({
            source: partNameDetails,
            select: function (event, ui){
                //"selectedValue" variable is to identify the 
                // users selected value on the  AC suggestions.
                var selectedValue   = ui["item"]["value"];

                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {matchedPartName: selectedValue, request: 6},
                    cache : false,
                    dataType: "json",
                    success: function(data){
                        // CHECK IF DATA PARAM IS NOT NULL
                        if ( data ){
                            var dataLen = data.length;
                            var leadCount   = data[0]['lead_counts'];

                            if (dataLen > 0){
                                var newPkgTyp   = $("#packageType").value = originalPackageType + "_" + leadCount + "L";
                                $("#packageType").val(newPkgTyp);
                            };
                        };
                        // </END OF CHECKING DATA PARAM IS NOT NULL
                    },
                });
            }
        });  
    });
      //=======================================================================>
     // END OF MACHINE AUTOCOMPLETE KEYUP FUNCTION
    //=========================================================================>

    
      //=======================================================================>
     // START OF AUTO REMOVE CUSTOM PARTNAME AND MACHINE WHEN  ON BLUR FUNCTION
    //=========================================================================>
    $("#partName, #machine").blur(function(){
        var userInput = $(this).val();
        var str = [userInput];  
        var strLen = str[0].length;
        var stringKey = "_";
        var newVal = [];
        for (var i = 0; i < strLen; i++){
            if (str[0][i] == stringKey){ 
               break;
            }
            newVal.push(str[0][i]);
        };
        $(this).val(newVal.join(''));
    });
      //=======================================================================>
     // END OF AUTO REMOVE CUSTOM PARTNAME AND MACHINE WHEN  ON BLUR FUNCTION
    //=========================================================================>
});