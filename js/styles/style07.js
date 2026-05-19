// style07
// thin tall serif + gray noise + small symbols

function renderStyle07(ctx, canvas, text) {
  const displayText = text || "55PSJ8";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 회색 배경
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 작은 검정 점 노이즈
  ctx.fillStyle = "#d9d9d9";

  for (let i = 0; i < 420; i++) {
    const size = Math.random() < 0.85 ? 2 : 3;

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

  // 메인 텍스트
  ctx.fillStyle = "#d9d9d9";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const chars = displayText.split("");

  // 자간
  const spacing = 70;
  const totalWidth = (chars.length - 1) * spacing;
  const startX = canvas.width / 2 - totalWidth / 2;
  const baseY = canvas.height / 2 + 5;

  chars.forEach((char, i) => {
    ctx.save();

    const x = startX + i * spacing + (Math.random() - 0.5) * 10;
    const y = baseY + (Math.random() - 0.5) * 16;
    const size = 138 + Math.random() * 24;

    ctx.translate(x, y);

    // 아주 살짝만 회전
    ctx.rotate(((Math.random() - 0.5) * 8 * Math.PI) / 180);

    ctx.font = `400 ${size}px Georgia, "Times New Roman", serif`;

    // 세로로 살짝 길게
    ctx.scale(0.78, 2);

    ctx.fillText(char, 0, 0);

    ctx.restore();
  });

  // 찍찍 그은 듯한 불규칙 가로선
  ctx.strokeStyle = "#d9d9d9";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  for (let i = 0; i < 18; i++) {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height;
    const length = 25 + Math.random() * 90;

    ctx.beginPath();

    ctx.moveTo(startX, startY);

    const segments = 3 + Math.floor(Math.random() * 4);

    for (let j = 1; j <= segments; j++) {
      const x = startX + (length / segments) * j;
      const y = startY + (Math.random() - 0.5) * 10;

      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  // 랜덤 특수기호
  const symbols = ["*", "$", "@", "%", "&", "#", "+", "?", "!"];

  for (let i = 0; i < 14; i++) {
    ctx.save();

    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 28 + Math.random() * 42;

    ctx.translate(x, y);
    ctx.rotate(((Math.random() - 0.5) * 80 * Math.PI) / 180);

    ctx.fillStyle = "#d9d9d9";
    ctx.font = `400 ${size}px Georgia, "Times New Roman", serif`;

    ctx.fillText(symbol, 0, 0);

    ctx.restore();
  }
}
