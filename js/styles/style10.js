// style10
// CRT 3-color separated sans-serif text

function renderStyle10(ctx, canvas, text) {
  const displayText = text || "5HTSB";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bg = "#c6feeb";
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const colorMain = "#000000";
  const colorR = "#ff433a";
  const colorG = "#00ff1e";
  const colorB = "#001eff";

  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  // 이름 단위 줄바꿈
  const words = displayText.split(" ");

  // 이름이 2개 이상이면 줄 분리
  const lines =
    words.length > 1
      ? words.map((word) => word.split(""))
      : [displayText.split("")];

  // 전체 글자 수 계산
  const totalCharCount = displayText.replaceAll(" ", "").length;

  const baseFontSize = totalCharCount > 10 ? 115 : 145;
  const lineGap = 105;

  lines.forEach((line, lineIndex) => {
    const baseY =
      canvas.height / 2 -
      ((lines.length - 1) * lineGap) / 2 +
      lineIndex * lineGap;

    // 글자별 랜덤값 먼저 저장
    const data = line.map((char) => {
      const scaleX = 0.95 + Math.random() * 0.75;
      const gap = -12 + Math.random() * 18;

      ctx.font = `500 ${baseFontSize}px Arial, Helvetica, sans-serif`;

      return {
        char,
        scaleX,
        gap,
        y: baseY + (Math.random() - 0.5) * 55,
        rotate: ((Math.random() - 0.5) * 12 * Math.PI) / 180,
        width: ctx.measureText(char).width * scaleX,
      };
    });

    const totalWidth = data.reduce((sum, item) => {
      return sum + item.width + item.gap;
    }, 0);

    let x = canvas.width / 2 - totalWidth / 2;

    data.forEach((item) => {
      const jitterX = (Math.random() - 0.5) * 14;

      // 메인 검정
      ctx.font = `500 ${baseFontSize}px Arial, Helvetica, sans-serif`;

      ctx.save();
      ctx.translate(x + jitterX, item.y);
      ctx.rotate(item.rotate);
      ctx.scale(item.scaleX, 1);
      ctx.fillStyle = colorMain;
      ctx.fillText(item.char, 0, 0);
      ctx.restore();

      ctx.globalCompositeOperation = "multiply";

      // R 채널
      ctx.save();
      ctx.translate(x - 7 + jitterX, item.y + (Math.random() - 0.5) * 10);
      ctx.rotate(item.rotate + ((Math.random() - 0.5) * 5 * Math.PI) / 180);
      ctx.scale(item.scaleX, 1);
      ctx.fillStyle = colorR;
      ctx.fillText(item.char, 0, 0);
      ctx.restore();

      // G 채널
      ctx.save();
      ctx.translate(x + jitterX, item.y - 5 + (Math.random() - 0.5) * 10);
      ctx.rotate(item.rotate + ((Math.random() - 0.5) * 5 * Math.PI) / 180);
      ctx.scale(item.scaleX, 1);
      ctx.fillStyle = colorG;
      ctx.fillText(item.char, 0, 0);
      ctx.restore();

      // B 채널
      ctx.save();
      ctx.translate(x + 7 + jitterX, item.y + (Math.random() - 0.5) * 10);
      ctx.rotate(item.rotate + ((Math.random() - 0.5) * 5 * Math.PI) / 180);
      ctx.scale(item.scaleX, 1);
      ctx.fillStyle = colorB;
      ctx.fillText(item.char, 0, 0);
      ctx.restore();

      ctx.globalCompositeOperation = "source-over";

      x += item.width + item.gap;
    });
  });

  // 가로 스캔라인
  ctx.fillStyle = "rgba(80, 69, 71, 0.4)";
  for (let y = 0; y < canvas.height; y += 6) {
    ctx.fillRect(0, y, canvas.width, 1);
  }
}
