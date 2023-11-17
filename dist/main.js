import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var albumNames = ["Bubbles2Floor", "Cybernetic Field", "115-12 placeHolder", "Aggregation", "Design Fabrication",
	"Collaborative Weaving", "Water Sports", "Horse & Chariot", "Honeycomb", "Sprawl & Resilience",
	"ELC: Carrick", "Spring Garden Hostel", "6-Mile Island", "Hoop House", "Bathhouse", "Miscellaneous"];
var albumYears = ["2021", "2021", "2020", "2019", "2019",
	"2020", "2023", "2023", "2023", "2022",
	"2020", "2019", "2019", "2018", "2019", "20xx"];
var albumYears = ["2021", "2021", "2020", "2019", "2019",
	"2020", "2023", "2023", "2023", "2022",
	"2020", "2019", "2019", "2018", "2019", "20xx"];
var albumLinks = ["projects/bubble_floor.html", "projects/cybernetic_field.html", "projects/place_holder.html",
	"projects/aggregation.html", "projects/design_fabrication.html", "projects/collaborative_weaving.html",
	"projects/water_sports.html", "projects/horse_chariot.html", "projects/honeycomb.html",
	"projects/sprawl_resilience.html", "projects/environmental_learning_center.html",
	"projects/spring_garden_hostel.html", "projects/six_mile_island.html", "projects/hoop_house.html",
	"projects/bathhouse.html", "projects/misc.html"];

let container = document.getElementById('albumHolder');
let curAlbum = 8;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.updateMatrix();
camera.updateMatrixWorld();
var frustum = new THREE.Frustum();

var keyboard = new KeyboardState();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

controls.touches = {
	// ONE: THREE.TOUCH.ROTATE,
	ONE: THREE.TOUCH.PAN
}

controls.mouseButtons = {
	LEFT: THREE.MOUSE.PAN
	// MIDDLE: THREE.MOUSE.DOLLY,
	// RIGHT: THREE.MOUSE.PAN
}

camera.refTarg = 3;

// camera.lookAt(THREE.Vector3(0, 0, 0));

camera.position.z = 5;

var cameraHomeX = camera.position.x;
var cameraHomeY = camera.position.y;
var cameraHomeZ = camera.position.z;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

var album_size = 2.1;
var numAlbums = 0; //to determine
const albumLocs = [];
const albumTargets = [];
const textures = [];
var albumDistanceStep = 1;
var centerAlbumZoom = 1.3;
var rotationAmount = 0.8;

function fileExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status != 404;
}

function setupAlbums() {
	while (true) {
		var next_cover_path = 'textures/cover_' + numAlbums + '.jpg';
		if (fileExists(next_cover_path)) {
			const texture = new THREE.TextureLoader().load(next_cover_path);
			texture.colorSpace = THREE.SRGBColorSpace;
			texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
			var material = new THREE.MeshBasicMaterial({ map: texture });
			textures.push(material);
			numAlbums += 1;
		} else {
			console.log('There are ' + (numAlbums - 1) + ' projects');
			break;
		}
	}

	for (let i = 0; i < numAlbums; i++) {
		const geometry = new THREE.PlaneGeometry(album_size, album_size);
		const album = new THREE.Mesh(geometry, textures[i]);
		if (i < 10) var num = "0" + i
		else var num = i
		album.name = "album" + num;
		album.position.x += albumDistanceStep * (i - curAlbum);
		albumLocs.push(album.position);
		albumTargets.push(album.position.x);
		scene.add(album);
	}
}
setupAlbums();

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	requestAnimationFrame(animate);

	frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

	var moveSpeed = calcMoveSpeed();
	for (let i = 0; i < numAlbums; i++) {
		if (i < 10) var num = "0" + i
		else var num = i
		var curAlbum = scene.getObjectByName("album" + num);

		curAlbum.position.x -= moveSpeed;

		//check if camera can see & infinitly loop albums
		if (!frustum.containsPoint(curAlbum.position)) {
			var offset = albumDistanceStep * numAlbums;
			if (curAlbum.position.x < 0) offset *= -1;
			curAlbum.position.x -= offset;
			albumTargets[i] -= offset;
		}

		//set scale & rotation of albums
		if (albumLocs[i].x >= albumDistanceStep) {
			curAlbum.rotation.y = -rotationAmount;
			curAlbum.position.z = 0;
		}
		else if (albumLocs[i].x <= -albumDistanceStep) {
			curAlbum.rotation.y = rotationAmount;
			curAlbum.position.z = 0;
		}
		else {
			curAlbum.rotation.y = -((curAlbum.position.x / albumDistanceStep) * rotationAmount); // smooth rotation
			curAlbum.position.z = ((albumDistanceStep - Math.abs(curAlbum.position.x)) / albumDistanceStep) * centerAlbumZoom;
		}
		curAlbum.scale.x = Math.max((albumDistanceStep - Math.abs(curAlbum.position.x)) / albumDistanceStep, albumDistanceStep);
	}

	var offset = camera.position.x - cameraHomeX;
	for (let j = 0; j < numAlbums; j++) {
		albumTargets[j] -= offset;
	}
	camera.position.x = cameraHomeX;
	camera.position.y = cameraHomeY;
	camera.position.z = cameraHomeZ;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	update();
	render();
	hover();
}

function calcMoveSpeed() {
	var refLoc = albumLocs[0].x;
	var refTarg = albumTargets[0];
	var dif = refLoc - refTarg;
	return dif / 16;
}

function moveLeft() {
	var distance = -albumDistanceStep;
	var curAlbum = (((curAlbum + 1) + numAlbums) % numAlbums);
	for (let i = 0; i < numAlbums; i++) {
		albumTargets[i] += distance;
	}
	return curAlbum
}

function moveRight() {
	var distance = albumDistanceStep;
	var curAlbum = (((curAlbum - 1) + numAlbums) % numAlbums);
	for (let i = 0; i < numAlbums; i++) {
		albumTargets[i] += distance;
	}
	return curAlbum
}

function update() {
	var distance = 0;
	keyboard.update();
	if (keyboard.down("left")) {
		curAlbum = moveLeft();
	}
	else if (keyboard.down("right")) {
		curAlbum = moveRight();
	}
	var centerAlbum = findNearestCenter();


	for (let i = 0; i < numAlbums; i++) {
		var orb = document.getElementById("o" + i);
		if (i == centerAlbum) orb.classList.add("active");
		else orb.classList.remove("active");

	}

	document.getElementById("albumTitle").innerHTML = albumNames[centerAlbum];
	document.getElementById("albumYear").innerHTML = albumYears[centerAlbum];
}

function render() {
	renderer.render(scene, camera);
	// camera.position.x = cameraPrev.x;
	// camera.position.y = cameraPrev.y;
	// camera.position.z = cameraPrev.z;
}

function albumInMid(album) {
	for (let i = 0; i < numAlbums; i++) {
		if (parseInt(album.name.slice(-2)) == i) {
			return albumTargets[i] == 0;
		}
	}
}

function moveAlbumToMid(album) {
	for (let i = 0; i < numAlbums; i++) {
		if (parseInt(album.name.slice(-2)) == i) {
			var offset = albumTargets[i];
			for (let j = 0; j < numAlbums; j++) {
				albumTargets[j] -= offset;
			}
			break;
		}
	}
}


function hover() {
	raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
		document.body.style.cursor = 'pointer';
	} else {
		document.body.style.cursor = 'default';
	}
}

function onPointerMove(event) {
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
	const intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
		$('html,body').css('cursor', 'pointer');
	} else {
		$('html,body').css('cursor', 'default');
	}
}

function onPointerClick(event) {
	raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length <= 0) return;
	curAlbum = parseInt(intersects[0].object.name.slice(-2));
	if (intersects.length > 0 && albumInMid(intersects[0].object)) {
		window.open(albumLinks[curAlbum], "_self")
	}
	moveAlbumToMid(intersects[0].object);
}

let moveLast = null;
let moveAmount = null;
let moveStart = null;

function findNearestCenter() {
	let bestIndex = null;
	let bestDistance = null;
	for (let i = 0; i < numAlbums; i++) {
		if (i < 10) var num = "0" + i
		else var num = i
		var curAlbum = scene.getObjectByName("album" + num);
		let testDistance = Math.abs(curAlbum.position.x);
		if (bestDistance == null || testDistance < bestDistance) {
			bestDistance = testDistance
			bestIndex = i
		}
	}
	return bestIndex;
}

function findProperEnd(dir) {
	for (let i = 0; i < numAlbums; i++) {
		if (dir > 0) albumTargets[i] = Math.ceil(albumTargets[i]);
		else albumTargets[i] = Math.floor(albumTargets[i]);
	}
}

function onTouchMove(event) {
	if (moveLast == null) moveStart = moveLast - event.touches[0].screenX;
	else moveAmount = event.touches[0].screenX - moveLast;
	moveLast = event.touches[0].screenX;
	for (let i = 0; i < numAlbums; i++) {
		albumTargets[i] += moveAmount / 100;
	}

}

function handleStart(event) {
	moveStart = event.touches[0].screenX;
}

function handleEnd(event) {
	findProperEnd(moveAmount);
	moveLast = null;
	moveAmount = null;
	moveStart = null;
}

function init() {
	window.addEventListener('mousemove', onPointerMove);
	window.addEventListener('mousedown', onPointerClick);
	window.addEventListener('resize', onWindowResize);

	window.addEventListener("touchmove", onTouchMove);
	window.addEventListener("touchstart", handleStart);
	window.addEventListener("touchend", handleEnd);

	document.getElementById("albumArrowLeft").addEventListener("click", moveLeft, false);
	document.getElementById("albumArrowRight").addEventListener("click", moveRight, false);
}

if (WebGL.isWebGLAvailable()) {
	// Initiate function or other initializations here
	init();
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}