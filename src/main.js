import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

let aspecto = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  100, //campo de visao vertical
  aspecto, //aspecto da imagem (Largura/Altura)
  0.5, //Plano proximo
  100 //Plano distante
);
camera.position.z = 10;

//Luz
var light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

//Ponto de Luz
var plight = new THREE.PointLight(0xffff00, 100);
plight.position.set(-1, 1, 0);
scene.add(plight);

// Circle
const circle = new THREE.SphereGeometry(5);
const texture = new THREE.TextureLoader().load('public/basketball.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const circleTexture = new THREE.Mesh(circle, material);
scene.add(circleTexture);

let model;
const modelPath = 'models/earth/';
const mtlFile = 'earth.mtl';
const objFile = 'earth.obj';

const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(modelPath).load(mtlFile, (materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.setPath(modelPath).load(objFile, (object) => {
    model = object;
    model.scale.setScalar(0.03); //redimensiona o objeto
    model.position.y = -0.1;
    model.rotation.x = 0.5;
    // scene.add(model);
    animate();
  });
});

function animate() {
  renderer.render(scene, camera);
  circleTexture.rotation.y += 0.01;
  circleTexture.rotation.x += 0.01;
  // if (circleTexture.position.y === 0) circleTexture.position.y += 1;
  // if (circleTexture.position.y > -5) {
  //   circleTexture.position.y -= 1;
  // }

  // if (circleTexture.position.y < 5) {
  //   circleTexture.position.y += 1;
  // }
  // do {
  //   circleTexture.position.y -= 0.1;
  // } while (circleTexture.position.y > -5);

  console.log(circleTexture.position.y);

  requestAnimationFrame(animate);
}

// window.addEventListener('mousemove', (event) => {
//   let wh = window.innerHeight;
//   let my = event.clientY;
//   if (model) model.rotation.x += (my - wh / 2) / wh / 100;
// });
