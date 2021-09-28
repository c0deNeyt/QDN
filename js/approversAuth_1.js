'use strict'


class alerts {
    constructor() {
        this.data;
    }
    inputCredentials () {
        Swal.fire({
            title: 'Login Form',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector('#login').value
                const password = Swal.getPopup().querySelector('#password').value
                if (!login || !password) {
                    Swal.showValidationMessage(`Please enter login and password`)
                }
                return { login: login, password: password }
            }
        }).then((result) => {
        Swal.fire(`
            Login: ${result.value.login}
            Password: ${result.value.password}
            `.trim())
        })
    }
    credentialAlert (){
        return Swal.fire({
            title: 'Enter your password',
            input: 'password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                maxlength: 20,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function (result) { // OK BUTTON
                return new Promise(function (resolve) {
                    // var empId = data.item.value;// SELECTED EMP ID OF APPROVER
                    // var approverName = data.item.label; // SELECTED NAME OF APPROVER
                    // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                    // BASED ON THE PASSWORD INPUT (result parameter)
                    console.log("This is the previous value", result);
                    Swal.showValidationMessage(`Please enter login and password`)
                    setTimeout(function () {
                        resolve();
                    }, 250);
                });
            },
            didDestroy: function (result) {
                Swal.showValidationMessage(`Please enter login and password`)
                // $('#productionAuth-button span.ui-selectmenu-text').html();
            }
        });
    };
}

class approverAuth extends alerts {
constructor() {
    super();
    this.credentialAlert;
    this.data;
}
credValidation () {
    return $("#productionAuth").selectmenu({
    // HANDLE SELECT EVENT WHEN APPROVER NAME IS CLICKED
        select: function (click, data) {
            return data;
        },
position: {
    my: "top center",
    at: "top", of: ".approvalDiv"
},
})
.selectmenu("menuWidget")
.addClass("overflow");
}


};
// </END FUNCTION TO HANDLE PRODUCTION APPROVERS DETAILS 
class prodAuthentication extends approverAuth{
constructor(){
    super();
    this.result = "S3cret";
    this.empId = "751";
    this.approverName = "Leila Ungson";
    this.data;
};

setRes (){
    this.result = result;
}
getRes (){
    return this.data;
}
valOthersCred(){
    return $.ajax({
        type: 'POST',
        url: './php/getDetails.php',
        data: { userPassInput: `${this.result}`, empId: `${this.empId}`, request: 15},
        dataType: 'json',
        success: function (response) {
            if (response){
                // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                // authEvtEe(approverName);
                // $('#EEAuth-button span.ui-selectmenu-text').html(approverName);
                // alert();
                console.log("Success!!", response);                                                                                         
            }else{
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid approver or password`);
            };
        },
        error: function (error) {
            // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
            // Swal.showValidationMessage(`Invalid approver or password`);
            console.log("Something went wrong!", error);
        }
    });
};
};

//==============================================================
// PRODUCTION APPROVERS LIST REQUEST (request 14)
//==============================================================
class receiverReq {
    constructor(){
        this.data;
    };
    // PROD AUTH METHOD
    prodAuthDetails(reqNum) {
        return $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: {request: `${reqNum}`},
            cache: false,
            dataType:'json'
        });
    };

}
class another extends receiverReq{
    appendAuthToDOM (param) {
        return param;
    };

}
// $.ajax({
//     type: 'POST',
//     url: "./php/getDetails.php",
//     data: { request: 14 },
//     cache: false,
//     dataType: "json",
//     success: prodAuthDetails
// });
// // </END OF PRODUCTION APPROVERS LIST REQUEST 

// //FUNCTION TO HANDLE PRODUCTION APPROVERS DETAILS 
// function prodAuthDetails(data) {
//     var dataLen = data.length;

//     // LOOP TO HANDLE EACH APPROVER NAMES
//     for (var i = 0; i < dataLen; i++) {
//         var approverName = data[i]['EMP_NAME'];
//         var empNum = data[i]['id'];

//         // APPENDING APPROVER NAME TO THE SELECT MENU
//         var option = new Option(approverName, empNum);
//         $(option).html(approverName);
//         $("#productionAuth").append(option);
//     };
// };

(async function() {
    const receiverReqExec = new receiverReq();
    const anotherExec = new another();
    let rawData = await receiverReqExec.prodAuthDetails(14);
    console.log("This is the request result", rawData);
    let n =  anotherExec.appendAuthToDOM(rawData);
    console.log(n)
    // await receiverReqExec.appendAuthToDOM();
})();

// const alertExec = new alerts();
// const prodAuthenticationExec = new prodAuthentication();
// const approversProd = new approverAuth();
// approversProd.credValidation();
// let n = approversProd.credValidation();
// // approversProd.credentialAlert();
// console.log("This is the N", approversProd);
