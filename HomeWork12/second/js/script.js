let inputRub = document.getElementById("rub"),
  inputUsd = document.getElementById("usd");

inputRub.addEventListener("input", () => {
  let sendRequest = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", "js/current.json");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status == 200) {
        let data = JSON.parse(request.response);
        resolve(data.usd);
      } else if (request.readyState === 4) {
        reject(new Error("Что-то пошло не так!"));
      }
    });
  });

  sendRequest
    .then(usdRub => calcValue(usdRub))
    .catch(error => setError(error))
    .finally();
});

function calcValue(usdRub) {
  inputUsd.value = inputRub.value / usdRub;
}

function setError(error) {
  inputUsd.value = error;
}
