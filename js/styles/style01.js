// style01
// bold blue liquid-pixel distortion
// 긴 문구는 줄바꿈해서 크게 유지

function renderStyle01(ctx, canvas, text) {
  const displayText = text || "2XXN";

  // 캔버스 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 단어 기준 줄바꿈
  // ex) "Paige Embry" → ["Paige", "Embry"]
  const words = displayText.split(" ");

  // 띄어쓰기가 없으면 한 줄 유지
  const lines = words.length > 1 ? words : [displayText];

  // 여러 줄 여부
  const isMultiLine = lines.length > 1;

  // 실제 텍스트를 그릴 작은 캔버스
  // 확대하면서 픽셀 느낌 생성
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  // 긴 문구면 세로 공간 증가
  tempCanvas.width = isMultiLine ? 950 : 760;
  tempCanvas.height = isMultiLine ? 320 : 240;

  // 여러 줄이면 폰트 약간 축소
  const fontSize = isMultiLine ? 180 : 200;

  // 글자 간격
  const gapBase = isMultiLine ? 100 : 45;
  const gapRandom = isMultiLine ? 30 : 18;

  // 줄 간격
  const lineGap = 110;

  // 배경
  tempCtx.fillStyle = "#ffffff";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // 텍스트 기본 설정
  tempCtx.fillStyle = "#1438ff";
  tempCtx.textAlign = "center";
  tempCtx.textBaseline = "middle";

  tempCtx.font = `900 ${fontSize}px Arial Black, Impact, sans-serif`;

  // 시작 Y 위치
  const startY = isMultiLine
    ? tempCanvas.height / 2 - lineGap / 2
    : tempCanvas.height / 2 + 8;

  // 줄마다 반복
  lines.forEach((line, lineIndex) => {
    const chars = line.split("");

    const baseY = startY + lineIndex * lineGap;

    // 랜덤 자간 생성
    const gaps = chars.map(() => gapBase + Math.random() * gapRandom);

    // 좌우 여백
    const padding = 120;

    // 전체 길이 계산
    let totalWidth = padding * 2;

    gaps.forEach((gap) => {
      totalWidth += gap;
    });

    // 중앙 정렬 시작점
    let x = tempCanvas.width / 2 - totalWidth / 2 + gapBase / 2 + padding;
    // 글자 반복
    chars.forEach((char, i) => {
      tempCtx.save();

      // 랜덤 위치
      const y = baseY + (Math.random() - 0.5) * 20;

      // 랜덤 회전
      const rotate = (Math.random() - 0.5) * 0.3;

      // 랜덤 비율
      const scaleX = 0.9 + Math.random() * 0.3;

      const scaleY = 0.88 + Math.random() * 0.22;

      tempCtx.translate(x, y);

      tempCtx.rotate(rotate);

      tempCtx.scale(scaleX, scaleY);

      // 글자 출력
      tempCtx.fillText(char, 0, 0);

      tempCtx.restore();

      // 다음 글자 위치
      x += gaps[i];
    });
  });

  // 파란색 삐침 조각 추가
  tempCtx.fillStyle = "#1438ff";

  for (let i = 0; i < 18; i++) {
    const px = 45 + Math.random() * (tempCanvas.width - 90);

    const py = 30 + Math.random() * (tempCanvas.height - 60);

    tempCtx.beginPath();

    tempCtx.moveTo(px, py);

    tempCtx.lineTo(px + Math.random() * 26 - 8, py + Math.random() * 18 - 4);

    tempCtx.lineTo(px + Math.random() * 20 - 22, py + Math.random() * 32);

    tempCtx.closePath();

    tempCtx.fill();
  }

  // 왜곡용 캔버스
  const distortedCanvas = document.createElement("canvas");

  const distortedCtx = distortedCanvas.getContext("2d");

  distortedCanvas.width = tempCanvas.width;
  distortedCanvas.height = tempCanvas.height;

  distortedCtx.fillStyle = "#ffffff";

  distortedCtx.fillRect(0, 0, distortedCanvas.width, distortedCanvas.height);

  // 세로 슬라이스 왜곡
  const sliceWidth = 4;
  const overlap = 2;

  for (let sx = 0; sx < tempCanvas.width; sx += sliceWidth) {
    const wave = Math.sin(sx * 0.05) * 7;

    const randomMove = (Math.random() - 0.5) * 8;

    distortedCtx.drawImage(
      tempCanvas,
      sx,
      0,
      sliceWidth + overlap,
      tempCanvas.height,

      sx - overlap / 2,
      wave + randomMove,

      sliceWidth + overlap,
      tempCanvas.height
    );
  }

  // 최종 출력
  ctx.fillStyle = "#ffffff";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 픽셀 느낌 유지
  ctx.imageSmoothingEnabled = false;

  // 출력 크기
  const drawW = isMultiLine ? 860 : 760;
  const drawH = isMultiLine ? 340 : 280;

  // 중앙 출력
  ctx.drawImage(
    distortedCanvas,

    0,
    0,
    distortedCanvas.width,
    distortedCanvas.height,

    canvas.width / 2 - drawW / 2,
    canvas.height / 2 - drawH / 2,

    drawW,
    drawH
  );

  ctx.imageSmoothingEnabled = true;
}
