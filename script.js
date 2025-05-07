const images = [
  "Ambrosia_01.jpg", "Ambrosia_03.jpg", "Ambrosia_05.jpg",
  "Boobie_Ike_01.jpg", "Boobie_Ike_03.jpg", "Boobie_Ike_04.jpg", "Boobie_Ike_landscape.jpg",
  "Brian_Heder_ultrawide.jpg", "Cal_Hampton_04.jpg", "Cal_Hampton_ultrawide.jpg",
  "DreQuan_Priest_02.jpg", "DreQuan_Priest_03.jpg", "DreQuan_Priest_04.jpg", "DreQuan_Priest_ultrawide.jpg",
  "Grassrivers_01.jpg", "Grassrivers_02.jpg", "Grassrivers_03.jpg", "Grassrivers_04.jpg",
  "Jason_and_Lucia_01_landscape.jpg", "Jason_and_Lucia_02_landscape.jpg", "Jason_and_Lucia_Motel_ultrawide.jpg",
  "Jason_Duval_05.jpg", "Jason_Duval_06.jpg",
  "Leonida_Keys_01.jpg", "Leonida_Keys_02.jpg", "Leonida_Keys_03.jpg", "Leonida_Keys_04.jpg", "Leonida_Keys_05.jpg",
  "Lucia_Caminos_01.jpg", "Lucia_Caminos_02.jpg", "Lucia_Caminos_03.jpg", "Lucia_Caminos_04.jpg", "Lucia_Caminos_05.jpg", "Lucia_Caminos_06.jpg",
  "Mount_Kalaga_National_Park_01.jpg", "Mount_Kalaga_National_Park_02.jpg", "Mount_Kalaga_National_Park_03.jpg",
  "Mount_Kalaga_National_Park_04.jpg", "Mount_Kalaga_National_Park_05.jpg", "Mount_Kalaga_National_Park_06.jpg",
  "Port_Gellhorn_04.jpg", "Port_Gellhorn_05.jpg",
  "Vice_City_01.jpg", "Vice_City_02.jpg", "Vice_City_03.jpg", "Vice_City_04.jpg", "Vice_City_05.jpg",
  "Vice_City_06.jpg", "Vice_City_07.jpg", "Vice_City_08.jpg", "Vice_City_09.jpg"
];

const bg = document.getElementById("slideshow-bg");
const countdownContainer = document.getElementById("countdown-container");

function isImageDark(imgElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  context.drawImage(imgElement, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

  let colorSum = 0;
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const avg = (r + g + b) / 3;
    colorSum += avg;
  }

  const brightness = colorSum / (imageData.length / 4);
  return brightness < 128;
}

function changeBackground() {
  const img = new Image();
  const randomIndex = Math.floor(Math.random() * images.length);
  img.src = images[randomIndex];
  img.onload = () => {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.style.backgroundImage = `url('${img.src}')`;
      bg.style.opacity = 1;

      const dark = isImageDark(img);
      countdownContainer.style.color = dark ? "white" : "black";
    }, 500);
  };
}

setInterval(changeBackground, 4000);
window.onload = () => {
  changeBackground();
  updateCountdown();
};

const targetDate = new Date("2026-05-26T00:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(3, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
