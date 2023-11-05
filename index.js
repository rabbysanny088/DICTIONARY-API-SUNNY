const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const loadingSpinner = document.getElementById("spinner");
const inpWordInput = document.getElementById("inp-word");
const errorMessage = document.getElementById("error-message");

btn.addEventListener("click", async () => {
  const inpWord = inpWordInput.value.trim(); // Trim leading and trailing spaces

  result.innerHTML = "";


  if (inpWord === "") {
    result.innerHTML = `<p class="Input">Please enter a valid word.</p>`;
  }else{
      try {
        loadingSpinner.style.display = "block"; // Show the loading spinner

        errorMessage.innerHTML = "";
    
        const response = await axios.get(`${url + inpWord}`);
        const data = response.data[0]; 
        console.log(data)
        result.innerHTML = `
          <div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound()">
              <i class="fas fa-volume-up"></i>
            </button>
          </div>
          <div class="details">
            <p>${data.meanings[0].partOfSpeech}</p>
            <p>/${data.phonetic}/</p>
          </div>
          <p class="word-meaning">
            ${data.meanings[0].definitions[0].definition || ""}
          </p>
          <p class="word-example">
            ${data.meanings[0].definitions[0].example || ""}
          </p>
          `;
        sound.setAttribute("src", `https:${data.phonetics[0].audio}`);
        loadingSpinner.style.display = "none";         
      } catch (error) {
        result.innerHTML = `<p class="Input">No Results Found</p>`;
        loadingSpinner.style.display = "none";
    }
  }

});

inpWordInput.addEventListener("input", () => {
  result.innerHTML = "";
  errorMessage.innerHTML = ""; 
});

// function showAlert(errorMes){
//     const alert = document.createElement("div");
//     alert.classList.add("alert", "alert-danger");
//     alert.textContent = errorMes;
//     alertContainer.appendChild(alert);

//     setTimeout(() => {
//         alert.remove(); // Remove the alert after 2 seconds
//       }, 2000);
// }
function playSound() {
  sound.play();
}