// style05
// thin blue sans + close spacing + pixel wavy strike line

function renderStyle05(ctx, canvas, text) {
  const displayText = text || "2ES";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const pink = "#ff00fc";

  ctx.fillStyle = pink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "200 115px Helvetica Neue, Arial, sans-serif";

  const chars = displayText.split("");

  const spacing = 55;
  const totalWidth = (chars.length - 1) * spacing;
  const startX = canvas.width / 2 - totalWidth / 2;
  const baseY = canvas.height / 2;

  chars.forEach((char, i) => {
    const x = startX + i * spacing;
    const y = baseY + (Math.random() - 0.5) * 70;

    ctx.fillText(char, x, y);
  });

  // 랜덤 픽셀 취소선

  const pixel = 6;

  const lineY = canvas.height / 2 + (Math.random() - 0.5) * 45;

  const linePadding = 50 + Math.random() * 70;

  const lineStartX = canvas.width / 2 - totalWidth / 2 - linePadding;

  const lineEndX = canvas.width / 2 + totalWidth / 2 + linePadding;

  const freq1 = 0.02 + Math.random() * 0.04;
  const freq2 = 0.06 + Math.random() * 0.05;

  const amp1 = 2 + Math.random() * 7;
  const amp2 = 1 + Math.random() * 4;

  ctx.fillStyle = pink;

  for (let x = lineStartX; x < lineEndX; x += pixel) {
    // 일부 끊김
    if (Math.random() < 0.08) continue;

    const wave =
      Math.sin((x - lineStartX) * freq1) * amp1 +
      Math.sin((x - lineStartX) * freq2) * amp2;

    const jitter = (Math.random() - 0.5) * 3;

    ctx.fillRect(
      Math.round(x / pixel) * pixel,
      Math.round((lineY + wave + jitter) / pixel) * pixel,
      pixel,
      pixel
    );
  }

  // 주변에 날아다니는 * 기호
  ctx.fillStyle = pink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < 18; i++) {
    ctx.save();

    const starX =
      canvas.width / 2 -
      totalWidth / 2 -
      100 +
      Math.random() * (totalWidth + 200);

    const starY = canvas.height / 2 - 110 + Math.random() * 220;

    const starSize = 18 + Math.random() * 42;

    const rotate = Math.random() * Math.PI * 2;

    ctx.translate(starX, starY);
    ctx.rotate(rotate);

    ctx.font = `200 ${starSize}px Helvetica Neue, Arial, sans-serif`;
    ctx.fillText("*", 0, 0);

    ctx.restore();
  }
}
