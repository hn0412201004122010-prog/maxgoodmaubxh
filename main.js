// 1. Khởi tạo Không gian (Scene), Camera và Bộ dựng hình (Renderer)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Danh sách ảnh bảng xếp hạng của bạn
const imageFiles = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']; 
const cards = [];

// 3. Tải ảnh và dán lên các tấm thẻ 3D (Mesh)
const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(4, 2.25); // Tỉ lệ khung hình 16:9

imageFiles.forEach((file, index) => {
  textureLoader.load(file, (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const card = new THREE.Mesh(geometry, material);

    // Xếp các thẻ nằm ngang cách nhau một khoảng
    card.position.x = (index - (imageFiles.length - 1) / 2) * 4.5;
    
    scene.add(card);
    cards.push(card);
  });
});

camera.position.z = 7;

// 4. Hàm Vòng lặp Animation (Cho các thẻ tự xoay nhẹ)
function animate() {
  requestAnimationFrame(animate);
  
  cards.forEach(card => {
    card.rotation.y += 0.005; // Hiệu ứng tự xoay 3D
  });

  renderer.render(scene, camera);
}
animate();