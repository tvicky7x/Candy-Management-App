// Base axios
let axiosBase = axios.create({
  baseURL: "https://crudcrud.com/api/5040e8f402724c878d98628972d89d78",
});

// Onload Candy Added from Server
window.addEventListener("DOMContentLoaded", () => {
  axiosBase
    .get("/candyInventory")
    .then((res) => {
      let n = res.data.length;
      for (let i = 0; i < n; i++) {
        makeList(res.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Adding Events
let form = document.getElementById("candyForm");
form.addEventListener("submit", addCandy);
let candyList = document.getElementById("candyList");
candyList.style.textTransform = "capitalize";
candyList.addEventListener("click", buyFunction);

// Document Variables
let cName = document.getElementById("candyName");
let cdName = document.getElementById("candyDescription");
let cp = document.getElementById("candyPrice");
let cq = document.getElementById("candyQuantity");

// Add Candy Form
function addCandy(e) {
  e.preventDefault();
  let candyName = cName.value;
  let candyDescription = cdName.value;
  let candyPrice = cp.value;
  let candyQuantity = cq.value;
  let candyObject = {
    candyName: candyName,
    candyDescription: candyDescription,
    candyPrice: candyPrice,
    candyQuantity: candyQuantity,
  };
  axiosBase
    .post("/candyInventory", candyObject)
    .then((res) => {
      makeList(res.data);
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Adding List
function makeList(res) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<strong>₹${res.candyPrice}</strong> ${res.candyName} - ${res.candyDescription}
  <button class="btn btn-danger btn-sm fw-semibold float-end buy-3" id="buy-3">Buy 3</button>
  <button class="btn btn-warning btn-sm fw-semibold float-end ms-2 me-2 buy-2" id="buy-2">Buy 2</button>
  <button class="btn btn-success btn-sm fw-semibold float-end buy-1" id="buy-1">Buy 1</button>
  <button class="btn btn-outline-primary btn-sm fw-semibold float-end me-2 quantity">${res.candyQuantity}</button>`;
  li.id = res._id;
  candyList.appendChild(li);
}

// Buy Function
function buyFunction(e) {
  if (e.target.classList.contains("buy-3")) {
    let li = e.target.parentNode;
    let candyName;
    let candyDescription;
    let candyPrice;
    let candyQuantity;
    axiosBase
      .get(`/candyInventory/${li.id}`)
      .then((res) => {
        candyName = res.data.candyName;
        candyDescription = res.data.candyDescription;
        candyPrice = res.data.candyPrice;
        candyQuantity = res.data.candyQuantity - 3;
      })
      .then(() => {
        li.children[4].innerHTML = candyQuantity;
        axiosBase.put(`/candyInventory/${li.id}`, {
          candyName: candyName,
          candyDescription: candyDescription,
          candyPrice: candyPrice,
          candyQuantity: candyQuantity,
        });
      });
  }
  if (e.target.classList.contains("buy-2")) {
    let li = e.target.parentNode;
    let candyName;
    let candyDescription;
    let candyPrice;
    let candyQuantity;
    axiosBase
      .get(`/candyInventory/${li.id}`)
      .then((res) => {
        candyName = res.data.candyName;
        candyDescription = res.data.candyDescription;
        candyPrice = res.data.candyPrice;
        candyQuantity = res.data.candyQuantity - 2;
      })
      .then(() => {
        li.children[4].innerHTML = candyQuantity;
        axiosBase.put(`/candyInventory/${li.id}`, {
          candyName: candyName,
          candyDescription: candyDescription,
          candyPrice: candyPrice,
          candyQuantity: candyQuantity,
        });
      });
  }
  if (e.target.classList.contains("buy-1")) {
    let li = e.target.parentNode;
    let candyName;
    let candyDescription;
    let candyPrice;
    let candyQuantity;
    axiosBase
      .get(`/candyInventory/${li.id}`)
      .then((res) => {
        candyName = res.data.candyName;
        candyDescription = res.data.candyDescription;
        candyPrice = res.data.candyPrice;
        candyQuantity = res.data.candyQuantity - 1;
      })
      .then(() => {
        li.children[4].innerHTML = candyQuantity;
        axiosBase.put(`/candyInventory/${li.id}`, {
          candyName: candyName,
          candyDescription: candyDescription,
          candyPrice: candyPrice,
          candyQuantity: candyQuantity,
        });
      });
  }
}

// Subtraction from Inventory
function candySubtraction(res, minus) {
  let candyObject = res.data;
  let number = candyObject.candyQuantity - minus;
  candyObject.candyQuantity = number.toString();
}

// axiosBase.patch("/candyInventory/64a9a588c632b703e8309ffb", {
// candyName: "candyName",
// candyDescription: "candyDescription",
// candyPrice: "55",
// candyQuantity: "120",
// });
