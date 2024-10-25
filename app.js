const canvas = document.querySelector("#drawing-board");
const toolBar = document.querySelector("#toolbar");
canvas.width = window.innerWidth - toolBar.style.width;
canvas.height = window.innerHeight - toolBar.style.height;
const ctx = canvas.getContext("2d");
let is_drawing = false;

canvas.addEventListener("mousedown", (e) => {
  is_drawing = true;
  ctx.beginPath();
  console.log(e.offsetX, e.offsetY);
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("mouseup", (e) => {
  is_drawing = false;
  // ctx.lineTo(e.offsetX, e.offsetY);
  // ctx.stroke();
});
// window.addEventListener("click",(e)=>{
//   console.log(e.screenX)//screen size
//   console.log(e.clientX)// window or view port
//   console.log(e.offsetX)// target element
// })

// to track mouse movements
canvas.addEventListener("mousemove", (e) => {
  if (!is_drawing) return;
  ctx.stroke();
  ctx.lineTo(e.offsetX, e.offsetY);
});

// event delegation in parent for better performance
toolBar.addEventListener("change", (e) => {
  if (e.target.id === "lineWidth") {
    ctx.lineWidth = e.target.value;
  } else {
    ctx.strokeStyle = e.target.value;
  }
});
document.querySelector("#clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// for mobile touches
canvas.addEventListener("touchstart", (e) => {
  is_drawing = true;
  const touch = e.touches[0]; // to get first touch
  const rect = canvas.getBoundingClientRect(); // to track canvas positon relative to screen or viewport
  const x = touch.clientX - rect.left; // x position
  const y = touch.clientY - rect.top; // y  position
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener("touchend", (e) => {
  is_drawing = false;
});

canvas.addEventListener("touchmove", (e) => {
  if (!is_drawing) return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  ctx.lineTo(x, y);
  ctx.stroke();
  e.preventDefault(); // Prevents scrolling when drawing
});
