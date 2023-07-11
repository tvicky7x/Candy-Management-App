// Base axios
let axiosBase = axios.create({
  baseURL: "https://crudcrud.com/api/be1414e5c36d481e90a5ee06fa19bbfe",
});

// Onload Candy Added from Server
window.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await axiosBase.get("/candyInventory");
    candyArray = res.data;
    let n = candyArray.length;
    for (let i = 0; i < n; i++) {
      makeList(candyArray[i]);
    }
  } catch (error) {
    console.log(error);
  }
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
async function addCandy(e) {
  try {
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
    let res = await axiosBase.post("/candyInventory", candyObject);
    res = res.data;
    makeList(res);
  } catch (error) {
    console.log(error);
  }
}

// Adding List
function makeList(res) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<strong>₹${res.candyPrice}</strong> ${res.candyName} - ${res.candyDescription}
  <button class="btn btn-danger btn-sm fw-semibold float-end buy-3" id="buy-3">Buy 3</button>
  <button class="btn btn-warning btn-sm fw-semibold float-end ms-2 me-2 buy-2" id="buy-2">Buy 2</button>
  <button class="btn btn-success btn-sm fw-semibold float-end buy-1" id="buy-1">Buy 1</button>
  <button class="btn btn-outline-primary btn-sm fw-semibold float-end me-2">${res.candyQuantity}</button>`;
  li.id = res._id;
  candyList.appendChild(li);
}

// buy function
function buyFunction(e) {
  let li = e.target.parentNode;
  if (e.target.classList.contains("buy-3")) {
    updateCandy(li, 3);
  }
  if (e.target.classList.contains("buy-2")) {
    updateCandy(li, 2);
  }
  if (e.target.classList.contains("buy-1")) {
    updateCandy(li, 1);
  }
}

// Update Candy Quantity Function
async function updateCandy(li, minus) {
  let candyResponse = await axiosBase.get(`/candyInventory/${li.id}`);
  let candyObject = candyResponse.data;
  candyObject.candyQuantity = (
    Number(candyObject.candyQuantity) - minus
  ).toString();
  delete candyObject._id;
  li.children[4].innerHTML = candyObject.candyQuantity;
  await axiosBase.put(`/candyInventory/${li.id}`, candyObject);
}
