// Get the modalvar img = document.getElementById("myImg2");
var img = document.getElementById("1");
document.addEventListener('click', function(e) {
    var targetId = e.target.id;
    //simple id filter
    if(targetId == "1" || targetId == "2" || targetId == "3" || targetId == "4" || targetId == "5" ||
    targetId == "6" || targetId == "7" || targetId == "8" || targetId == "9" || targetId == "10"){
        img = document.getElementById(e.target.id);
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    }
}, false);

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

document.addEventListener('keydown', function(event){
  if(modal.style.display === "block") {
  	if(event.key === "Escape"){
      modal.style.display = "none";
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
