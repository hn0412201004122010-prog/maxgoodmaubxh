const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Danh sách 16 ảnh PNG tương ứng với các file bạn tải lên GitHub
const imageFiles = [
  '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png',
  '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png'
];

let currentIndex = 0;
const cards = [];
const textureLoader = new THREE.TextureLoader();

// Khởi tạo khung hình tỷ lệ 16:9
const geometry = new THREE.PlaneGeometry(6, 3.375);

// Tải tất cả 16 ảnh vào không gian 3D
imageFiles.forEach((file, index) => {
  textureLoader.load(file, (texture) => {
    const material = new THREE.MeshBasicMaterial({ 
      map: texture, 
      side: THREE.FrontSide, 
      transparent: true 
    });
    const card = new THREE.Mesh(geometry, material);
    
    card.position.set(0, 0, 0);
    card.visible = index === 0; // Mặc định chỉ hiển thị ảnh đầu tiên (1.png)
    
    scene.add(card);
    cards.push({ mesh: card, index: index });
  });
});

camera.position.set(0, 0, 4.5);
camera.lookAt(0, 0, 0);

// Hiệu ứng đung đưa 3D nhẹ nhàng (Sweep Angle) chuẩn Esports
let angle = 0;
function animate() {
  requestAnimationFrame(animate);
  angle += 0.015;
  
  cards.forEach(item => {
    if (item.mesh.visible) {
      item.mesh.rotation.y = Math.sin(angle) * 0.12; // Lắc nhẹ quanh trục Y
    }
  });

  renderer.render(scene, camera);
}
animate();

// Tạo các nút điều hướng UI (TRƯỚC / SAU)
const controlsHTML = `
  <div style="position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; z-index: 10;">
    <button id="prevBtn" style="padding: 12px 28px; background: #ff4655; color: white; border: none; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;">◄ TRƯỚC</button>
    <button id="nextBtn" style="padding: 12px 28px; background: #ff4655; color: white; border: none; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;">SAU ►</button>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', controlsHTML);

// Thêm hiệu ứng hover cho nút bấm
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.onmouseover = () => btn.style.background = '#e03e4c';
  btn.onmouseout = () => btn.style.background = '#ff4655';
});

// Hàm hiển thị đúng slide ảnh được chọn
function showCard(index) {
  cards.forEach(item => {
    item.mesh.visible = item.index === index;
  });
}

// Xử lý sự kiện bấm nút
document.getElementById('prevBtn').onclick = () => {
  currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
  showCard(currentIndex);
};

document.getElementById('nextBtn').onclick = () => {
  currentIndex = (currentIndex + 1) % imageFiles.length;
  showCard(currentIndex);
};

// Căn chỉnh tự động khi kích thước trình duyệt thay đổi
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
