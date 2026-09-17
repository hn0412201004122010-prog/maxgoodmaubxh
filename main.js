const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Danh sách ảnh (thay đúng tên các file ảnh bạn có)
const imageFiles = ['4.jpg']; 
const cards = [];

const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.PlaneGeometry(6, 3.375); // Tăng kích thước bảng (tỷ lệ 16:9)

imageFiles.forEach((file, index) => {
  textureLoader.load(file, (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const card = new THREE.Mesh(geometry, material);

    // Căn chuẩn tọa độ về chính giữa không gian (X=0, Y=0, Z=0)
    card.position.set(0, 0, 0);
    
    scene.add(card);
    cards.push(card);
  });
});

// Đặt camera thẳng góc với tâm màn hình
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Vòng lặp xoay nhẹ 3D
function animate() {
  requestAnimationFrame(animate);
  
  cards.forEach(card => {
    card.rotation.y += 0.005; // Xoay nhẹ quanh trục Y
  });

  renderer.render(scene, camera);
}

animate();

// Tự động căn chỉnh khi thay đổi kích thước cửa sổ trình duyệt
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
