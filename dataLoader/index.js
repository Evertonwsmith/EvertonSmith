fetch("https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Detroit-Red-Wings")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Unable to fetch data:", error));
