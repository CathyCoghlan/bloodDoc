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



  }


  $(document).ready(function(){ 
  $('.test').click(function() { 
      $(this).toggleClass('activeBtn');
  });
});







