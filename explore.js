// Initialize the map
const malaysiaMap = L.map('malaysiaMap').setView([4.2105, 101.9758], 6);

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(malaysiaMap);

// State markers with Images
const states = [
  {
    name: "Johor", coords: [1.4927, 103.7414],
    foods: [
      { name: "Laksa Johor", img: "Images/laksa(1).jpg" },
      { name: "Mee Rebus", img: "Images/mee_rebus.jpeg" },
      { name: "Kacang Pool", img: "Images/kacang_pool.jpg" }
    ]
  },
  {
    name: "Kedah", coords: [6.125, 100.367],
    foods: [
      { name: "Nasi Ulam", img: "Images/nasi_ulam.jpg" },
      { name: "Kuah Daging", img: "Images/kuah_daging.jpeg" }
    ]
  },
  {
    name: "Kelantan", coords: [6.125, 102.250],
    foods: [
      { name: "Nasi Kerabu", img: "Images/nasi_kerabu.jpg" },
      { name: "Ayam Percik", img: "Images/ayam_percik.jpg" },
      { name: "Kuih Akok", img: "Images/kuih_akok.jpg" }
    ]
  },
  {
    name: "Perlis", coords: [6.4448, 100.199],
    foods: [
      { name: "Pulut Panggang", img: "Images/pulut_panggang.jpeg" },
      { name: "Nasi Tumpang", img: "Images/nasi_tumpang.jpg" }
    ]
  },
  {
    name: "Melaka", coords: [2.1896, 102.2501],
    foods: [
      { name: "Chicken Rice Ball", img: "Images/chicken_rice_ball.webp" },
      { name: "Satay Celup", img: "Images/satay_celup.jpg" }
    ]
  },
  {
    name: "Penang", coords: [5.4141, 100.3288],
    foods: [
      { name: "Char Kway Teow", img: "Images/char_kuey_teow(1).jpg" },
      { name: "Penang Laksa", img: "Images/laksa.jpg" }
    ]
  },
  {
    name: "Selangor", coords: [3.0738, 101.5183],
    foods: [
      { name: "Bak Kut Teh", img: "Images/bak_kut_teh.jpg" },
      { name: "Roti Canai", img: "Images/roti_canai.jpg" }
    ]
  },
  {
    name: "Negeri Sembilan", coords: [2.7256, 101.9426],
    foods: [
      { name: "Grilled Crab", img: "Images/grilled_crab.jpg" },
      { name: "Char Siew Pau", img: "Images/char_siew_pau.jpg" }
    ]
  },
  {
    name: "Pahang", coords: [3.8135, 102.2501],
    foods: [
      { name: "Satay Temerloh", img: "Images/satay_temerloh.jpg" },
      { name: "Roti Jala", img: "Images/roti_jala.jpg" }
    ]
  },
  {
    name: "Perak", coords: [4.5924, 101.0901],
    foods: [
      { name: "Ipoh White Coffee", img: "Images/white_coffee.jpg" },
      { name: "Bean Sprout Chicken", img: "Images/bean_sprout_chicken_rice.webp" }
    ]
  },
  {
    name: "Sabah", coords: [5.9804, 116.0735],
    foods: [
      { name: "Tuaran Mee", img: "Images/mee_tuaran.jpg" },
      { name: "Hinava", img: "Images/hinava.webp" }
    ]
  },
  {
    name: "Sarawak", coords: [1.5533, 110.3592],
    foods: [
      { name: "Kolo Mee", img: "Images/kolo_mee.jpg" },
      { name: "Manok Pansoh", img: "Images/manok_pansoh.jpg" }
    ]
  },
  {
    name: "Terengganu", coords: [5.3300, 103.1400],
    foods: [
      { name: "Nasi Dagang", img: "Images/nasi_dagang.jpg" },
      { name: "Keropok Lekor", img: "Images/keropok_lekor.jpg" }
    ]
  },

  {
    name: "Kuala Lumpur", coords: [3.1390, 101.6869],
    foods: [
      { name: "Hokkien Mee", img: "Images/hokkien_mee.jpg" },
      { name: "Nasi Lemak", img: "Images/nasi_lemak.jpg" }
    ]
  },
  {
    name: "Putrajaya", coords: [2.9264, 101.6969],
    foods: [
      { name: "Rojak", img: "Images/rojak(1).jpg" },
      { name: "Roti John", img: "Images/roti_john.jpg" }
    ]
  },
  {
    name: "Labuan", coords: [5.2800, 115.2300],
    foods: [
      { name: "Ambuyat", img: "Images/ambuyat.jpg" },
      { name: "Sambal Udang", img: "Images/sambal_udang(1).jpg" }
    ]
  }
];

// Add markers with image popups
states.forEach(state => {
  const numFoods = state.foods.length;
  const imgWidth = 100;
  const gap = 10;
  const containerWidth = numFoods * imgWidth + (numFoods - 1) * gap;

  const popupContent = `
  <strong>${state.name}</strong><br><br>
  <div style="
    display: flex;
    gap: ${gap}px;
    justify-content: center;
    flex-wrap: nowrap;
    width: ${containerWidth}px;
  ">
    ${state.foods.map(f => `
      <div style="text-align: center; white-space: nowrap;">
        <a href="fooddetail.html?name=${encodeURIComponent(f.name)}&img=${encodeURIComponent(f.img)}" style="text-decoration:none; color:inherit;">
          <strong style="display:block; overflow:hidden; text-overflow:ellipsis;">${f.name}</strong><br>
          <img src="${f.img}" width="${imgWidth}px" style="border-radius:6px; margin-top:5px;">
        </a>
      </div>
    `).join('')}
  </div>
`;


  L.marker(state.coords)
    .addTo(malaysiaMap)
    .bindPopup(popupContent, { maxWidth: containerWidth + 20 });
});

