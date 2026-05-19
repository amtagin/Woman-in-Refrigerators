// style04
// gray ghost outline mixed fonts

function renderStyle04(ctx, canvas, text) {
  const displayText = text || "4YEU";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const chars = displayText.split("");
  const len = chars.length;

  // 글자 수에 따라 폰트 크기 조절
  const baseFontSize = len <= 5 ? 120 : len <= 8 ? 110 : len <= 12 ? 95 : 82;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";

  // 박스 안에서 넓은 자간 유지
  const sidePadding = 90;
  const availableWidth = canvas.width - sidePadding * 2;

  const spacing = len <= 1 ? 0 : Math.min(72, availableWidth / (len - 1));

  const totalWidth = (len - 1) * spacing;
  const startX = canvas.width / 2 - totalWidth / 2;
  const baseY = canvas.height / 2;

  // 배경에 손으로 그은 듯한 랜덤 선
  ctx.strokeStyle = "#9b9b9b";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  for (let i = 0; i < 80; i++) {
    const startX =  Math.random() * (canvas.width + 100);

    const startY =  Math.random() * (canvas.height + 400);

    const length = canvas.width * (0.6 + Math.random() * 0.9);

    const angle = Math.random() * Math.PI * 2;

    ctx.beginPath();

    ctx.moveTo(startX, startY);

    const segments = 4 + Math.floor(Math.random() * 5);

    for (let j = 1; j <= segments; j++) {
      const progress = j / segments;

      const x =
        startX +
        Math.cos(angle) * length * progress +
        (Math.random() - 0.5) * 58;

      const y =
        startY +
        Math.sin(angle) * length * progress +
        (Math.random() - 0.5) * 28;

      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  chars.forEach((char, i) => {
    const x = startX + i * spacing;
    const y = baseY + (Math.random() - 0.5) * 16;
    const rotate = ((Math.random() - 0.5) * 28 * Math.PI) / 180;

    // 글자마다 극단적 크기 차이
    const randomSize = baseFontSize * (0.65 + Math.random() * 0.9);

    const fontOptions = [
      `300 ${randomSize}px Arial, Helvetica, sans-serif`,
      `400 ${randomSize}px Georgia, Times New Roman, serif`,
      `700 ${randomSize}px Times New Roman, serif`,
    ];

    const font = fontOptions[Math.floor(Math.random() * fontOptions.length)];

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate);
    ctx.font = font;

    // 번진 회색 외곽: 여러 번 살짝 어긋나게 stroke
    ctx.lineWidth = Math.max(3, randomSize * 0.04);
    ctx.strokeStyle = "#9b9b9b";

    for (let j = 0; j < 5; j++) {
      ctx.strokeText(
        char,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
    }

    // 안쪽은 완전 흰색보다 아주 연한 회색
    ctx.fillStyle = "#f4f4f4";
    ctx.fillText(char, 0, 0);

    // 얇은 진한 회색 잔상
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#6f6f6f";
    ctx.strokeText(char, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);

    ctx.restore();
  });

  // 약한 긁힘/노이즈
  ctx.fillStyle = "#9b9b9b";
  for (let i = 0; i < 80; i++) {
    ctx.fillRect(
      Math.random() * canvas.width,
      canvas.height / 2 - 90 + Math.random() * 180,
      1 + Math.random() * 5,
      1 + Math.random() * 2
    );
  }
}
