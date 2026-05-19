// style06
// pastel dots + ink drops + random lines + mixed hand/retro fonts

function renderStyle06(ctx, canvas, text) {
  const displayText = text || "1047";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 파스텔 점 노이즈
  const pastelColors = ["#f3a3b8", "#a7d8ff", "#b6e6c8", "#d8b4ff", "#ffe29a"];

  for (let i = 0; i < 900; i++) {
    ctx.fillStyle =
      pastelColors[Math.floor(Math.random() * pastelColors.length)];
    ctx.globalAlpha = 0.55 + Math.random() * 0.35;

    const size = 2 + Math.random() * 2;

    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      size,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  // 큰 검정 잉크 점
  for (let i = 0; i < 16; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 3 + Math.random() * 13;

    ctx.fillStyle = "#050505";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 랜덤 선들
  ctx.strokeStyle = "#050505";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  // 가로선 1개
  ctx.save();
  ctx.translate(
    canvas.width / 2,
    canvas.height / 2 + (Math.random() - 0.5) * 80
  );
  ctx.rotate(((Math.random() - 0.5) * 10 * Math.PI) / 180);
  ctx.beginPath();
  ctx.moveTo(-canvas.width * 0.55, 0);
  ctx.lineTo(canvas.width * 0.55, 0);
  ctx.stroke();
  ctx.restore();

  // 세로/사선 여러 개
  const lineCount = 5 + Math.floor(Math.random() * 4);

  for (let i = 0; i < lineCount; i++) {
    ctx.save();

    const x = Math.random() * canvas.width;
    const y = canvas.height / 2;

    ctx.translate(x, y);
    ctx.rotate(((Math.random() - 0.5) * 34 * Math.PI) / 180);

    ctx.beginPath();
    ctx.moveTo(0, -canvas.height * 0.7);
    ctx.lineTo(0, canvas.height * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  // 텍스트
  const fonts = [
    "300 160px Courier New, monospace",
    "900 160px Courier New, monospace",
  ];

  ctx.fillStyle = "#050505";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const chars = displayText.split("");

  const spacing = 70;
  const totalWidth = (chars.length - 1) * spacing;
  const startX = canvas.width / 2 - totalWidth / 2;
  const baseY = canvas.height / 2;

  chars.forEach((char, i) => {
    ctx.save();

    const x = startX + i * spacing + (Math.random() - 0.5) * 22;
    const y = baseY + (Math.random() - 0.5) * 42;

    const rotate = ((Math.random() - 0.5) * 22 * Math.PI) / 180;

    ctx.translate(x, y);
    ctx.rotate(rotate);

    ctx.font = fonts[Math.floor(Math.random() * fonts.length)];

    ctx.fillText(char, 0, 0);

    ctx.restore();
  });

  ctx.globalAlpha = 1;
}
