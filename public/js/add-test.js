function openTests(evt, testName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(testName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  // $(document).ready(function(){
  //   $(".form1").submit(function(e){
  //     e.preventDefault();
  //     var mytest = $("#mytest1").val();

  //     $.ajax({
  //       url: "/addTest/" + mytest,
  //       data: mytest,
  //       method: "POST",
  //       contentType: "application/x-www-form-urlencoded",
  //       success: function(res){
  //         alert(res.from)
  //       }, error : function(err) {
  //         console.log(err);
  //       }
  //     })
  //   })
  // })

  // $(document).ready(function(){
  //   $(".form2").submit(function(e){
  //     e.preventDefault();
  //     var mytest = $("#mytest2").val();

  //     $.ajax({
  //       url: "/addTest/" + mytest,
  //       data: mytest,
  //       method: "POST",
  //       contentType: "application/x-www-form-urlencoded",
  //       success: function(res){
  //         alert(res.from)
  //       }, error : function(err) {
  //         console.log(err);
  //       }
  //     })
  //   })
  // })


  function addTest($this) {
    var val = $this.previousElementSibling.value;
    if(val == ''){
        console.log('no input');
    }else{
       console.log(val);
    }
      $.ajax({
        url: "/addTest/" + val,
        data: {
          name: val
        },
        method: "POST",
        dataType:'json',
        success: function(res){
          alert(res.from)
        }, error : function(err){
          console.log(err)
        }

      })


  //   $.ajax({
  //     type: 'POST',
  //     data: JSON.stringify({name: "val"},
  //     contentType: "application/json",
  //     dataType:'json',
  //     url: '/addTest',                      
  //     success: function(val) {
  //         console.log('success');
  //         console.log(JSON.parse(JSON.stringify(val)));                               
  //     },
  //     error: function(error) {
  //         console.log("some error in fetching the notifications");
  //      }
  // });

  }


//   $(document).ready(function(){ 
//   $('.test').click(function() { 
//       $(this).toggleClass('activeBtn');
//   });
// });




//   // var obj = {
//   //     'userName': usrName,
//   //     'userEmail': usrEmail
//   // };
//   // console.log(JSON.stringify(obj));
//   // $.ajax({
//   //     url: '/adduser',
//   //     method: 'POST',
//   //     data: JSON.stringify(obj),
//   //     success: function(data) {
//   //         console.log('user created , info :' + data);
//   //     },
//   //     error: function(data) {
//   //         console.log('User creation failed :' + data);
//   //     }
//   // });
// 
//}






