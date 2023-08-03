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
    if (item.textContent === newItem) {
      alert("Already Present");
      return;
    }
  }

  //adding to UI
  const newLI = document.createElement("li");
  newLI.innerHTML = `<unit>${newItem}</unit>
                    <button class="remove-item btn-link text-red">
                    <i class="fa-solid fa-xmark"></i></button>`;
  itemList.append(newLI);
  resetUI();
}

function removeElement(e) {
  if (confirm("are you sure?")) {
    if (e.target.parentElement.classList.contains("remove-item")) {
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
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeElement);
clrAllBtn.addEventListener("click", clearItem);
filter.addEventListener("input", filterList);
resetUI();
