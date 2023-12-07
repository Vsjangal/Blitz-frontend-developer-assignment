const apiUrl = "http://universities.hipolabs.com/search?country=";

async function fetchUniversities(country) {
  try {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "flex";
    const api = apiUrl + country;
    const response = await fetch(api);
    const universities = await response.json();
    loadingScreen.style.display = "none";
    if (universities.length === 0) {
      alert(
        "No universities found for the entered country. Please enter a valid country name."
      );
      return;
    }
    return universities;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function updateUniversityList(universities) {
  const universityList = document.getElementById("universityList");
  universityList.innerHTML = "";

  universities.forEach((university) => {
    const listItem = document.createElement("li");
    listItem.textContent = university.name;
    universityList.appendChild(listItem);
  });
}
async function searchUniversities() {
  const countryInput = document.getElementById("countryInput");
  const country = countryInput.value;

  if (country === "") {
    alert("Please enter a country name");
    const universities = [];
    updateUniversityList(universities);
    document.getElementById("totalUniversities").textContent =
      universities.length;
    return;
  }

  const universities = await fetchUniversities(country);
  updateUniversityList(universities);

  document.getElementById("totalUniversities").textContent =
    universities.length;
}

async function findHighestLowest() {
  // const countryInput = document.getElementById("countryInput");
  // const country = countryInput.value;

  const universities = await fetchUniversities("");

  if (universities.length === 0) {
    document.getElementById("highestCountry").textContent =
      "Unable to fetch data from api";
    document.getElementById("lowestCountry").textContent =
      "Unable to fetch data from api";
    console.log("No universities found.");
    return;
  }

  const universityCountByCountry = {};

  universities.forEach((university) => {
    const country = university.country;

    if (universityCountByCountry[country] === undefined) {
      universityCountByCountry[country] = 1;
    } else {
      universityCountByCountry[country]++;
    }
  });
  let highestCountry = Object.keys(universityCountByCountry)[0];
  let lowestCountry = Object.keys(universityCountByCountry)[0];

  Object.keys(universityCountByCountry).forEach((country) => {
    if (
      universityCountByCountry[country] >
      universityCountByCountry[highestCountry]
    ) {
      highestCountry = country;
    }

    if (
      universityCountByCountry[country] <
      universityCountByCountry[lowestCountry]
    ) {
      lowestCountry = country;
    }
  });

  document.getElementById("highestCountry").textContent = highestCountry;
  document.getElementById("lowestCountry").textContent = lowestCountry;
}
