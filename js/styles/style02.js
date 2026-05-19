// style02
// checkerboard background + inverted text

function renderStyle02(ctx, canvas, text) {
  const displayText = text || "3N6J6";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const block = 81;

  // 캔버스를 충분히 덮을 만큼 칸 수 계산
  const colCount = Math.ceil(canvas.width / block) + 2;
  const rowCount = Math.ceil(canvas.height / block) + 2;

  // 전체 바둑판 크기
  const gridW = colCount * block;
  const gridH = rowCount * block;

  // 중앙 정렬용 시작점
  const offsetX = (canvas.width - gridW) / 2;
  const offsetY = (canvas.height - gridH) / 2;

  // 1. 바둑판 배경
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const isBlack = (col + row) % 2 === 0;

      ctx.fillStyle = isBlack ? "#000000" : "#ffffff";

      ctx.fillRect(offsetX + col * block, offsetY + row * block, block, block);
    }
  }

  // 2. 텍스트를 difference로 그림
  ctx.save();

  ctx.globalCompositeOperation = "difference";

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 170px Arial Narrow, sans-serif";
  ctx.scale(0.72, 1.35);

  ctx.fillText(displayText, canvas.width / 2 / 0.72, canvas.height / 2 / 1.35);

  ctx.restore();

  ctx.globalCompositeOperation = "source-over";
}
