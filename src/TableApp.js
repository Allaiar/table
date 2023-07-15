// Функция для получения данных с URL и обработки JSON-ответа
async function fetchDataFromURL(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Функция для обновления блоков цветов с учетом количества контрибуций
function updateColorBlocks(data) {
  const colorBlocks = document.getElementsByClassName("ContributionCalendar-day");
  const colors = ["#02ffe609", "#02ffe637", "#02ffe657", "#02ffe6a8", "#00e3b6"];

  if (!data || typeof data !== "object") {
    console.error("Invalid data format");
    return;
  }

  for (const date in data) {
    const contributions = data[date];
    let colorIndex = 0;

    if (contributions >= 1 && contributions <= 9) {
      colorIndex = 1;
    } else if (contributions >= 10 && contributions <= 19) {
      colorIndex = 2;
    } else if (contributions >= 20 && contributions <= 29) {
      colorIndex = 3;
    } else if (contributions >= 30) {
      colorIndex = 4;
    }

    const cell = Array.from(colorBlocks).find((el) => el.getAttribute("data-date") === date);

    if (cell) {
      cell.style.backgroundColor = colors[colorIndex];
      const span = document.createElement("span");
      span.classList.add("sr-only");
      span.textContent = contributions + " contributions";
      cell.appendChild(span);

      cell.addEventListener("click", () => {
        span.style.display = "inline";
      });

      cell.addEventListener("mouseleave", () => {
        span.style.display = "none";
      });
    }
  }
}

// URL с данными
const url = "https://dpg.gg/test/calendar.json";

// Получаем данные с URL и обновляем блоки цветов
fetchDataFromURL(url)
  .then((data) => updateColorBlocks(data))
  .catch((error) => console.error("Error:", error));
