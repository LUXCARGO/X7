const url = "https://drive.google.com/uc?export=download&id=167Fr6Bzh2pE_bDxiLSXh_hMYmPO7fMHx";

let data = [];

window.onload = () => {
  fetch(url)
    .then(res => res.arrayBuffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet);
      alert("Файл Excel загружен. Можешь искать трек-коды.");
    })
    .catch(err => {
      console.error("Ошибка загрузки файла:", err);
      alert("Не удалось загрузить Excel-файл. Проверь доступ.");
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
