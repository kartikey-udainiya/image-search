document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Please enter a search term");

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=28`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await response.json();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  data.results.forEach((img) => {
    const imgEl = document.createElement("img");
    imgEl.src = img.urls.small;
    imgEl.alt = img.alt_description;
    imgEl.addEventListener("click", () => {
      window.location.href = `editor.html?img=${img.id}`;
    });

    // Create a button under the image
    const buttonEl = document.createElement("button");
    buttonEl.textContent = "Add Caption"; // You can change the text here
    buttonEl.addEventListener("click", () => {
      window.location.href = `editor.html?img=${img.id}`;

      // You can add any action here for the button click (it does nothing for now)
    });

    // Create a container div for the image and button
    const container = document.createElement("div");
    container.appendChild(imgEl);
    container.appendChild(buttonEl);

    // Append the container to the results div
    resultsDiv.appendChild(container);
  });
});
