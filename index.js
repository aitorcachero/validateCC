const input = document.querySelector('#input-cc');
const img = document.querySelector('#img');
const imgCheck = document.querySelector('#img-check');
const emisor = document.querySelector('#emisor');
const pais = document.querySelector('#pais');
const tipo = document.querySelector('#tipo');
const ciudad = document.querySelector('#ciudad');
const moneda = document.querySelector('#moneda');

const num = input.value;

input.addEventListener('keydown', (event) => {
  const numero = input.value;
  if (event.key === 'Backspace' && input.value.lenght === 5) {
    numero.replace(' ', '');
  }
});

input.oninput = function () {
  const num = input.value;

  if (this.value.length === 7) {
    let BIN = this.value.replace(' ', '');
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '9cc000c7c4mshf3c807ed5824206p19bb3ajsnf2813c93485b',
        'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com',
      },
      body: `{"bin":${BIN}`,
    };

    fetch(`https://bin-ip-checker.p.rapidapi.com/?bin=${BIN}`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.BIN.issuer.name == '') {
          emisor.innerHTML = 'Emisor: DESCONOCIDO';
        } else {
          emisor.innerHTML = `Emisor: ${response.BIN.issuer.name}`;
        }

        tipo.innerHTML = `Tipo: ${response.BIN.type}`;
        moneda.innerHTML = `Moneda: ${response.BIN.currency}`;
        pais.innerHTML = `Pais: ${response.BIN.country.name}`;
        ciudad.innerHTML = `Ciudad: ${response.BIN.country.capital}`;
      })

      .catch((err) => console.error(err));
  }

  if (this.value.length < 7) {
    emisor.innerHTML = '';
    tipo.innerHTML = ``;
    moneda.innerHTML = ``;
    pais.innerHTML = ``;
    ciudad.innerHTML = ``;
  }

  if (
    this.value.length === 4 ||
    this.value.length === 9 ||
    this.value.length === 14
  ) {
    this.value = this.value + ' ';
  }

  if (this.value.length > 19) {
    this.value = this.value.slice(0, 19);
  }

  if (num[0] === '4') {
    img.src = './img/visa.jpg';
    document.getElementById('img').width = '50';
    document.getElementById('img').height = '30';
  } else if (num[0] === '5') {
    img.src = './img/mastercard.png';
    document.getElementById('img').width = '50';
    document.getElementById('img').height = '30';
  } else {
    img.src = '';
    document.getElementById('img').width = '0';
    document.getElementById('img').height = '0';
  }
  if (this.value.length == 19) {
    trimArray();
    const validador = Array.from(input.value);
    if (getValidator() === validador[18]) {
      imgCheck.src = './img/yes.png';
      imgCheck.width = '25';
    } else if (getValidator() !== validador[18]) {
      imgCheck.src = './img/no.png';
      imgCheck.width = '25';
    }
  }

  if (this.value.length < 19) {
    imgCheck.src = '';
    imgCheck.width = '0';
  }
};

function trimArray() {
  const trim = Array.from(input.value);
  trim.splice(4, 1);
  trim.splice(8, 1);
  trim.splice(12, 1);
  trim.splice(15, 1);
  return trim;
}

function sumarImpares() {
  const num = trimArray();
  let arrayImpares = 0;
  for (let i = 1; i < trimArray().length - 1; i = i + 2) {
    arrayImpares = arrayImpares + Number(num[i]);
  }
  return arrayImpares;
}

function multiplicarPares() {
  const num = trimArray();
  let sumaTotal = 0;
  for (let i = 0; i < num.length; i = i + 2) {
    const suma = (num[i] * 2).toString();
    if (suma.length === 2) {
      sumaTotal = sumaTotal + (Number(suma[0]) + Number(suma[1]));
    } else {
      sumaTotal = sumaTotal + Number(suma);
    }
  }
  return sumaTotal;
}

const getValidator = () => {
  const total = (
    (Number(sumarImpares()) + Number(multiplicarPares())) *
    9
  ).toString();
  total;
  return total[total.length - 1];
};
