const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clrAllBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();

  //checking for empty value
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("PLEASE ADD ANY ITEM");
    return;
  }
  //checking for repeat value
  const listitems = document.querySelectorAll("unit");
  for (item of listitems) {
    if (item.textContent.toLowerCase() === newItem.toLowerCase()) {
      alert("Already Present");
      return;
    }
  }

  //adding to UI
  addItemToDOM(newItem);
  addItemTOLoacalStorge(newItem);
  resetUI();
}

function addItemToDOM(newItem) {
  const newLI = document.createElement("li");
  newLI.innerHTML = `<unit>${newItem}</unit>
                    <button class="remove-item btn-link text-red">
                    <i class="fa-solid fa-xmark"></i></button>`;
  itemList.append(newLI);
}

function addItemTOLoacalStorge(newItem) {
  const itemsInLocalStorage = getItemfromLocalStorage();

  itemsInLocalStorage.push(newItem);
  localStorage.setItem("list", JSON.stringify(itemsInLocalStorage));
}

function getItemfromLocalStorage() {
  if (localStorage.getItem("list") === null) {
    itemsInLocalStorage = [];
  } else {
    itemsInLocalStorage = JSON.parse(localStorage.getItem("list"));
  }
  return itemsInLocalStorage;
}

function displayItems() {
  const itemsInLocalStorage = getItemfromLocalStorage();
  itemsInLocalStorage.forEach((item) => addItemToDOM(item));
  resetUI();
  // console.log(itemsInLocalStorage);
}

function removeElement(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("are you sure?")) {
      let itemsInLocalStorage = getItemfromLocalStorage();
      itemsInLocalStorage = itemsInLocalStorage.filter(
        (i) => i !== e.target.parentElement.parentElement.firstChild.textContent
      );
      console.log(itemsInLocalStorage);
      localStorage.setItem("list", JSON.stringify(itemsInLocalStorage));

      e.target.parentElement.parentElement.remove();
    }
  }
  resetUI();
}

function clearItem(e) {
  if (confirm("Do you want to clear the list?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("list");
    resetUI();
  }
}

function resetUI() {
  const itemList = document.getElementById("item-list");
  if (!itemList.firstElementChild) {
    filter.style.display = "none";
    clrAllBtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clrAllBtn.style.display = "block";
  }
}

function filterList(e) {
  const items = document.querySelectorAll("li");
  const search = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstElementChild.textContent.toLowerCase();
    if (itemName.indexOf(search) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//EevntListeners
function init() {
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", removeElement);
  clrAllBtn.addEventListener("click", clearItem);
  filter.addEventListener("input", filterList);
  document.addEventListener("DOMContentLoaded", displayItems);
  resetUI();
}

init();
