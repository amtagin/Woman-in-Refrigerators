// style08
// broken chunky serif + blue fragments + pink mesh background

function renderStyle08(ctx, canvas, text) {
  const displayText = text || "Blue";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 배경
  ctx.fillStyle = "#eeeeee";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 작은 캔버스에서 텍스트를 만든 뒤 조각내기
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

  const color = "#00ff24";

  tempCtx.textAlign = "center";
  tempCtx.textBaseline = "middle";

  const chars = displayText.split("");
  const len = chars.length;

  // 박스 안 여백
  const sidePadding = 30;
  const availableWidth = canvas.width - sidePadding * 2;

  // 글자 수에 따라 폰트 크기 조절
  const fontSize = len <= 5 ? 145 : len <= 8 ? 115 : len <= 12 ? 92 : 76;

  // 자간도 박스 안에서 자동 조절
  const maxSpacing = len <= 5 ? 95 : len <= 8 ? 72 : len <= 12 ? 54 : 42;

  const spacing =
    len <= 1 ? 0 : Math.min(maxSpacing, availableWidth / (len - 1));

  const totalWidth = (len - 1) * spacing;
  const startX = canvas.width / 2 - totalWidth / 2;
  const baseY = canvas.height / 2 + 8;

  chars.forEach((char, i) => {
    tempCtx.save();

    const x = startX + i * spacing + (Math.random() - 0.5) * 22;
    const y = baseY + (Math.random() - 0.5) * 50;
    const rotate = ((Math.random() - 0.5) * 35 * Math.PI) / 180;
    const scaleX = 0.85 + Math.random() * 0.45;
    const scaleY = 0.75 + Math.random() * 0.4;

    tempCtx.translate(x, y);
    tempCtx.rotate(rotate);
    tempCtx.scale(scaleX, scaleY);

    tempCtx.fillStyle = color;
    tempCtx.font = "700 145px Georgia, Times New Roman, serif";

    tempCtx.fillText(char, 0, 0);

    tempCtx.restore();
  });

  tempCtx.globalAlpha = 1;

  // 글리치 느낌: 가로 슬라이스 밀림
  for (let sy = 0; sy < canvas.height; sy += 4) {
    const sliceH = 3 + Math.random() * 10;

    if (Math.random() < 0.55) {
      const offsetX = (Math.random() - 0.5) * 55;

      ctx.drawImage(
        tempCanvas,
        0,
        sy,
        canvas.width,
        sliceH,
        offsetX,
        sy + (Math.random() - 0.5) * 4,
        canvas.width,
        sliceH
      );
    }
  }

  // 블루 채널 어긋남
  ctx.globalAlpha = 1;

  ctx.drawImage(tempCanvas, -8 + Math.random() * 16, -4 + Math.random() * 8);

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  // 흰색으로 글자 일부를 긁어낸 듯한 구멍
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#00ff24";

  for (let i = 0; i < 160; i++) {
    const w = 2 + Math.random() * 14;
    const h = 1 + Math.random() * 5;

    ctx.fillRect(
      Math.random() * canvas.width,
      canvas.height / 2 - 115 + Math.random() * 230,
      w,
      h
    );
  }

  ctx.globalAlpha = 1;
}
