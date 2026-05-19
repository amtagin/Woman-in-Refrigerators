const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const input = document.getElementById("textInput");
const buttons = document.querySelectorAll("button");

let currentStyle = 0;

const styles = [
  {
    color: "#ffffff",
    font: "120px Arial",
    bg: "#000000",
  },

  {
    color: "#ff0000",
    font: "140px Georgia",
    bg: "#111111",
  },

  {
    color: "#00ffcc",
    font: "110px Courier New",
    bg: "#000022",
  },

  {
    color: "#ffff00",
    font: "130px Impact",
    bg: "#220000",
  },

  {
    color: "#ff00ff",
    font: "100px Times New Roman",
    bg: "#001111",
  },

  {
    color: "#00ffff",
    font: "150px Verdana",
    bg: "#111100",
  },

  {
    color: "#ffffff",
    font: "120px monospace",
    bg: "#222222",
  },

  {
    color: "#ff8800",
    font: "135px serif",
    bg: "#000000",
  },

  {
    color: "#88ff00",
    font: "125px sans-serif",
    bg: "#111111",
  },

  {
    color: "#00aaff",
    font: "145px cursive",
    bg: "#220022",
  },
];

function render() {
  const style = styles[currentStyle];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = style.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = style.color;
  ctx.font = style.font;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(input.value, canvas.width / 2, canvas.height / 2);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStyle = Number(button.dataset.style);

    render();
  });
});

input.addEventListener("input", render);

render();
