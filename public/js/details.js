const tabBtn = document.querySelectorAll(".tab");
const tab = document.querySelectorAll(".tabShow");

// Function to display tabs when clicked
function tabs(panelIndex) {
  tab.forEach(function (node) {
    node.style.display = "none";
  });
  tab[panelIndex].style.display = "block";
}

// use function to display tab
tabs(0);

// Use Jquery to style tabs with active class
$(".tab").click(function () {
  $(this).addClass("active").siblings.removeClass("active");
});
