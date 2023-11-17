// Get the modalvar img = document.getElementById("myImg2");
var img = document.getElementById("1");
document.addEventListener('click', function(e) {
    var targetId = e.target.id;
    //simple id filter
    if(targetId == "1" || targetId == "2" || targetId == "3" || targetId == "4" || targetId == "5" ||
    targetId == "6" || targetId == "7" || targetId == "8" || targetId == "9" || targetId == "10" ||
    targetId == "11" || targetId == "12" || targetId == "13" || targetId == "14" || targetId == "15" ||
    targetId == "16" || targetId == "17" || targetId == "18" || targetId == "19" || targetId == "20" ||
    targetId == "21" || targetId == "22" || targetId == "23" || targetId == "24" || targetId == "25" ||
    targetId == "26" || targetId == "27" || targetId == "28" || targetId == "29" || targetId == "30"){
    // if(Int(targetId) != None){
        img = document.getElementById(e.target.id);
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
        $('body').css({overflow: 'hidden',height: '100%'});
    }
}, false);

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
$('body').css({overflow: 'auto',height: 'unset%'});
}

document.addEventListener('keydown', function(event){
  if(modal.style.display === "block") {
  	if(event.key === "Escape"){
      modal.style.display = "none";
      $('body').css({overflow: 'auto',height: 'unset%'});
      console.log("Esc");
  	}
  	if(event.keyCode === 37){
      console.log("Left");
      // var prev = img;
      var newId = parseInt(img.id) - 1;
      newImg = document.getElementById(newId);
      console.log(newImg);
      if (newImg !== null) {
        img = newImg;
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
      }
  	}
  	if(event.keyCode === 39){
      console.log("Right");
      // var prev = img;
      var newId = parseInt(img.id) + 1;
      newImg = document.getElementById(newId);
      console.log(newImg);
      if (newImg !== null) {
        img = newImg;
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
      }
    }
  }
});
