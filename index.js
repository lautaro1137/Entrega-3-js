const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const searchForm = document.getElementById("searchForm");
const idInput = document.getElementById("idInput");
const resultadoContenedor = document.getElementById("resultadoContenedor");

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  renderLastSearchedPizza();
  searchForm.addEventListener("submit", handleFormSubmit);
}

function saveLastSearchedPizza(pizza) {
  localStorage.setItem("lastSearchedPizza", JSON.stringify(pizza));
}

function renderLastSearchedPizza() {
  const lastSearchedPizza = JSON.parse(
    localStorage.getItem("lastSearchedPizza")
  );
  if (lastSearchedPizza) {
    const pizzaCard = createPizzaCard(lastSearchedPizza);
    resultadoContenedor.innerHTML = pizzaCard;
  } else {
    resultadoContenedor.innerHTML = "";
  }
}

function createPizzaCard(pizza) {
  return `
    <div class="card">
      <img src="${pizza.imagen}" alt="${pizza.nombre}" style="max-width: 100px;">
      <h2>${pizza.nombre}</h2>
      <p>Precio: $${pizza.precio}</p>
    </div>
  `;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const pizzaId = parseInt(idInput.value);

  if (isNaN(pizzaId) || pizzaId < 1 || pizzaId > pizzas.length) {
    showError("Ingresa un ID válido");
    return;
  }

  const pizzaEncontrada = pizzas.find((pizza) => pizza.id === pizzaId);

  if (pizzaEncontrada) {
    clearError();
    const pizzaCard = createPizzaCard(pizzaEncontrada);
    resultadoContenedor.innerHTML = pizzaCard;
    saveLastSearchedPizza(pizzaEncontrada);
  } else {
    showError("No se encontró ninguna pizza con ese ID");
  }

  searchForm.reset();
}

function showError(message) {
  resultadoContenedor.innerHTML = `<p>${message}</p>`;
}

function clearError() {
  resultadoContenedor.innerHTML = "";
}
