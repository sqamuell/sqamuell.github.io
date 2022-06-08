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

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
modal.style.display = "block";
modalImg.src = this.src;
captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
    modal.style.display = "none";
	}
});
