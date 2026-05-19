// style03
// green CRT scanline + warped black sans text

function renderStyle03(ctx, canvas, text) {
  const displayText = text || "P4I19";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = 1200;
  tempCanvas.height = 500;

  // 배경
  tempCtx.fillStyle = "#eaffdf";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // 전체 가로 CRT 라인
  for (let y = 0; y < tempCanvas.height; y += 5) {
    tempCtx.fillStyle = "#63ff5f";
    tempCtx.fillRect(0, y, tempCanvas.width, 2);
  }

  // 문구 길이에 따라 폰트 크기 조절
  const words = displayText.split(" ");
  const lines = words.length > 1 ? words : [displayText];
  const isMultiLine = lines.length > 1;

  const fontSize = isMultiLine ? 135 : 165;
  const lineGap = 115;

  tempCtx.fillStyle = "#111111";
  tempCtx.textAlign = "center";
  tempCtx.textBaseline = "middle";
  tempCtx.font = `500 ${fontSize}px Arial, Helvetica, sans-serif`;

  const startY = isMultiLine
    ? tempCanvas.height / 2 - lineGap / 2
    : tempCanvas.height / 2;

  lines.forEach((line, lineIndex) => {
    const chars = line.split("");
    const baseY = startY + lineIndex * lineGap;

    const spacing = isMultiLine ? 78 : 92;
    const totalWidth = (chars.length - 1) * spacing;
    const startX = tempCanvas.width / 2 - totalWidth / 2;

    chars.forEach((char, i) => {
      tempCtx.save();

      const x = startX + i * spacing + (Math.random() - 0.5) * 14;
      const y = baseY + (Math.random() - 0.5) * 28;
      const rotate = (Math.random() - 0.5) * 0.35;
      const scaleX = 0.8 + Math.random() * 0.28;
      const scaleY = 0.95 + Math.random() * 0.35;

      tempCtx.translate(x, y);
      tempCtx.rotate(rotate);
      tempCtx.scale(scaleX, scaleY);
      tempCtx.fillText(char, 0, 0);

      tempCtx.restore();
    });
  });

  // 검정 잔선 / 노이즈
  tempCtx.strokeStyle = "#111111";
  tempCtx.lineWidth = 1;

  for (let i = 0; i < 80; i++) {
    const x1 = Math.random() * tempCanvas.width;
    const y1 = Math.random() * tempCanvas.height;

    tempCtx.beginPath();
    tempCtx.moveTo(x1, y1);
    tempCtx.lineTo(
      x1 + Math.random() * 50 - 25,
      y1 + Math.random() * 24 - 12
    );
    tempCtx.stroke();
  }

  // 가로줄 단위 유동화
  const distortedCanvas = document.createElement("canvas");
  const distortedCtx = distortedCanvas.getContext("2d");

  distortedCanvas.width = tempCanvas.width;
  distortedCanvas.height = tempCanvas.height;

  distortedCtx.fillStyle = "#eaffdf";
  distortedCtx.fillRect(0, 0, distortedCanvas.width, distortedCanvas.height);

  const sliceHeight = 2;
  const overlap = 1;

  for (let sy = 0; sy < tempCanvas.height; sy += sliceHeight) {
    const wave = Math.sin(sy * 0.13) * 12;
    const jitter = (Math.random() - 0.5) * 14;

    distortedCtx.drawImage(
      tempCanvas,
      0,
      sy,
      tempCanvas.width,
      sliceHeight + overlap,
      wave + jitter,
      sy - overlap / 2,
      tempCanvas.width,
      sliceHeight + overlap
    );
  }

  // 최종 출력: 마스크 안을 꽉 채우게 출력
  ctx.fillStyle = "#eaffdf";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(
    distortedCanvas,
    0,
    0,
    distortedCanvas.width,
    distortedCanvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.imageSmoothingEnabled = true;
}