const fileId = "1hExrDfWzO5RXb9Vg_wXORJgg3Nh1IjSLLsKkSvLS7Wo";
const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;

let data = [];

window.onload = () => {
  fetch(url)
    .then(res => res.arrayBuffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet);
      alert("Файл с Google Таблицы загружен. Можешь искать трек-коды.");
    })
    .catch(err => {
      console.error("Ошибка загрузки:", err);
      alert("Не удалось загрузить файл. Проверь доступ или ID.");
    });
};

function search() {
  const code = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");
  const found = data.find(row => row.Trackcodes === code);

  if (found) {
    resultDiv.innerHTML = `
      <strong>Трек-код:</strong> ${found.Trackcodes}<br>
      <strong>Дата:</strong> ${found.Date || "не указана"}
    `;
  } else {
    resultDiv.innerHTML = "Трек-код не найден.";
  }
}
