// style09
// pink / gray pixel stretched sans captcha

function renderStyle09(ctx, canvas, text) {
  const displayText = text || "grumpy cat";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = 900;
  tempCanvas.height = 260;

  const pink = "#ffd4f4";
  const gray = "#5b6260";

  // 배경
  tempCtx.fillStyle = pink;
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  const fonts = [
    "200 70px Arial, Helvetica, sans-serif",
    "900 78px Arial Black, Impact, sans-serif",
    "600 72px Helvetica, Arial, sans-serif",
  ];

  tempCtx.textAlign = "left";
  tempCtx.textBaseline = "middle";

  const chars = displayText.split("");
  const baseY = tempCanvas.height / 2;

  // 랜덤값 먼저 저장
  const letterData = chars.map((char) => {
    const font = fonts[Math.floor(Math.random() * fonts.length)];
    tempCtx.font = font;

    const charWidth = tempCtx.measureText(char).width;
    const gap = 6 + Math.random() * 12;
    const scaleX = 0.85 + Math.random() * 0.55;
    const scaleY = 0.95 + Math.random() * 0.25;

    return {
      char,
      font,
      charWidth,
      gap,
      scaleX,
      scaleY,
      y: baseY + (Math.random() - 0.5) * 28,
      hasReverseBg: Math.random() < 0.25,
    };
  });

  // 전체 폭 계산
  const totalWidth = letterData.reduce((sum, item) => {
    return sum + item.charWidth * item.scaleX + item.gap;
  }, 0);

  // 중앙 시작점
  let x = Math.max(60, tempCanvas.width / 2 - totalWidth / 2);

  letterData.forEach((item) => {
    tempCtx.save();

    tempCtx.font = item.font;

    const bgW = item.charWidth * item.scaleX + 12;
    const bgH = 60 + Math.random() * 18;

    if (item.hasReverseBg) {
      tempCtx.fillStyle = gray;
      tempCtx.fillRect(x - 5, item.y - bgH / 2, bgW, bgH);
      tempCtx.fillStyle = pink;
    } else {
      tempCtx.fillStyle = gray;
    }

    tempCtx.translate(x, item.y);
    tempCtx.scale(item.scaleX, item.scaleY);
    tempCtx.fillText(item.char, 0, 0);

    tempCtx.restore();

    x += item.charWidth * item.scaleX + item.gap;
  });

  // 가로 슬라이스 왜곡
  const distortedCanvas = document.createElement("canvas");

  const distortedCtx = distortedCanvas.getContext("2d");

  distortedCanvas.width = tempCanvas.width;
  distortedCanvas.height = tempCanvas.height;

  distortedCtx.fillStyle = pink;
  distortedCtx.fillRect(0, 0, distortedCanvas.width, distortedCanvas.height);
  for (let y = 0; y < tempCanvas.height; y += 3) {
    const h = 5;

    const offsetX = Math.sin(y * 0.06) * 8 + (Math.random() - 0.5) * 6;

    distortedCtx.drawImage(
      tempCanvas,
      0,
      y,
      tempCanvas.width,
      h,
      offsetX - 20,
      y - 1,
      tempCanvas.width + 40,
      h + 2
    );
  }

  // 픽셀 노이즈
  for (let i = 0; i < 120; i++) {
    distortedCtx.fillStyle = Math.random() < 0.5 ? gray : pink;

    distortedCtx.fillRect(
      Math.random() * distortedCanvas.width,
      Math.random() * distortedCanvas.height,
      2 + Math.random() * 8,
      1 + Math.random() * 3
    );
  }

  // 최종 출력
  ctx.fillStyle = pink;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = false;

  const outputScale = 0.8;

  const outputW = canvas.width * outputScale;
  const outputH = canvas.height * outputScale;

  ctx.drawImage(
    distortedCanvas,
    0,
    0,
    distortedCanvas.width,
    distortedCanvas.height,

    canvas.width / 2 - outputW / 2,
    canvas.height / 2 - outputH / 2,

    outputW,
    outputH
  );

  ctx.imageSmoothingEnabled = true;
}
