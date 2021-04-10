// TEST TABS
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

// FUNCTION TO FADE IN SAMPLE IMAGES
function fadeIn(el) {
  el.style.opacity = 0;
  var tick = function () {
    el.style.opacity = +el.style.opacity + 0.01;
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}

// ADDING TEST TO CART & DISPLAYING IMAGES
function addTest($this) {
  var val = $this.previousElementSibling.value;
  var group = $this.previousElementSibling.id;
  if (group == "1") {
    var group1 = document.getElementById("group1");
    fadeIn(group1);
  } else if (group === "2") {
    var group2 = document.getElementById("group2");
    fadeIn(group2);
  } else if (group === "3") {
    var group3 = document.getElementById("group3");
    fadeIn(group3);
  } else if (group === "4") {
    var group4 = document.getElementById("group4");
    fadeIn(group4);
  } else if (group === "5") {
    var group5 = document.getElementById("group5");
    fadeIn(group5);
  } else if (group === "6") {
    var group6 = document.getElementById("group6");
    fadeIn(group6);
  } else if (group === "7") {
    var group7 = document.getElementById("group7");
    fadeIn(group7);
  } else if (group === "8") {
    var group8 = document.getElementById("group8");
    fadeIn(group8);
  } else {
    var group9 = document.getElementById("group9");
    fadeIn(group9);
  }

  $.ajax({
    url: "/addTest/" + val,
    data: {
      name: val,
      testGroup: group,
    },
    method: "POST",
    dataType: "json",
    success: function (res) {
      alert(res.from);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

$(document).ready(function () {
  $(".testBtn").click(function () {
    $(this).toggleClass("activeBtn");
  });
});
