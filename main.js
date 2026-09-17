const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const imageFiles = ['4.jpg']; 
const cards = [];

const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(6, 3.375); 

imageFiles.forEach((file) => {
  textureLoader.load(file, (texture) => {
    // Chỉ hiển thị mặt trước để không bị ngược chữ
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.FrontSide });
    const card = new THREE.Mesh(geometry, material);

    card.position.set(0, 0, 0);
    scene.add(card);
    cards.push(card);
  });
});

camera.position.set(0, 0, 4.5);
camera.lookAt(0, 0, 0);

// Hiệu ứng đung đung lắc nhẹ (Sweep Angle) chuẩn Esports
let angle = 0;
function animate() {
  requestAnimationFrame(animate);
  
  angle += 0.015;
  cards.forEach(card => {
    card.rotation.y = Math.sin(angle) * 0.15; // Lắc nhẹ qua lại 15 độ, không bị xoay lật mặt sau
  });

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
