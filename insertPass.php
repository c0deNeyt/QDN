<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="./js/jquery-3.6.0.min.js"></script>
</head>
<body>
<ul>
<form>
<li><input type="text" id="id">ID</li>
<li><input type="text" id="pass">PASS</li>
</ul>
<button  id = "submit">EXECUTE</button>
</form>
<script>
$(document).ready (function(){
    $("#pass").val("S3cret");
    $("#submit").click(function (e){
        e.preventDefault();
        console.log("IM CLICKED!!!");
        var id =  $("#id").val();
        // var result = "T3mp0r@rY";
        // var empId  = 1233 ;

        // var id = 49;
        var pass = "S3cret";
        
        console.log("Inserted Data",id, pass);
        $.ajax({
            type: "POST",
            url : './php/update_passwords.php',
            data:{id: id, pass: pass},
            success : function (){
                console.log("INSERT SUCCESS!");
            }
        });


        // $.ajax({
        // type: 'POST',
        // url: './php/getDetails.php',
        // data: {userPassInput: result, empId: empId, request: 15 },
        // dataType: 'json',
        // success: function(response){
        //     console.log("This is test", response);  
        // },
        // error: function (){
        //     console.log("wrong pass");
        // }
        // });

      
  
        // $.ajax({
        //     type: "POST",
        //     url : './php/update_passwords.php',
        //     data:{id: id, pass: pass},
        //     success : function (){
        //         console.log("INSERT SUCCESS!");
        //     }
        // });

        // $.ajax({
        // type: 'POST',
        // url: "./php/getDetails.php",
        // data: { request: 14 },
        // cache: false,
        // dataType: "json",
        // success: approversDetails
        // });

        // function approversDetails(data) {
        //     var dataLen = data.length;
        //     console.log (data);
        //     for (var i = 0; i < dataLen; i++) {
                
        //         var id = data[i++]['id'];
        //         var pass = "T3mp0r@rY";
        //         console.log(pass);
        //         $.ajax({
        //             type: "POST",
        //             url : './php/update_passwords.php',
        //             data:{id: id, pass: pass},
        //             success : function (){
        //                 console.log("INSERT SUCCESS!");
        //             }
        //         });
            
        //     };
        // };

    });
});

</script>

</body>
</html>