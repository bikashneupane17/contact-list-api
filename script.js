const api = "https://randomuser.me/api/?results=8";
let userList = [];

const homeScreen = document.getElementById("home-screen");
const appScreen = document.getElementById("app-screen");

const contactApp = document.getElementById("contact-app");
const contactScreen = document.getElementById("contact-screen");

const scrollValue = document.getElementById("slider");

scrollValue.addEventListener("change", (event) => {
  const value = event.target.value;

  value >= "60"
    ? (document.getElementById("label").innerText = "")
    : (document.getElementById("label").innerText = "Slide To Unlock");

  if (value === "100") {
    homeScreen.remove();
    appScreen.style.display = "block";
  }
});

contactApp.addEventListener("click", () => {
  appScreen.remove();
  return (contactScreen.style.display = "block");
});

const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  userList = data.results;
  document.querySelector(".showSpinner").style.display = "block";
  displayContactList(userList);
};

const displayContactList = (users) => {
  document.querySelector(".contact-list").style.display = "block";

  let str = "";

  users.forEach((item, i) => {
    str += `
<div class="accordion-item bg-black">
<h2 class="accordion-header">
  <button
    class="accordion-button collapsed"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#collapse${i}"
    aria-expanded="false"
    aria-controls="collapse${i}"
  >
    <img
      src="${item.picture.large}"
      alt=""
      width="50px"
      class="rounded-circle"
    />
    <div class="ms-2">
      <div class="fw-bolder">${item.name.title} ${item.name.first}  ${item.name.last}</div>
      <small>${item.location.street.number} ${item.location.street.name}</small>
    </div>
  </button>
</h2>
<div
  id="collapse${i}"
  class="accordion-collapse collapse"
  data-bs-parent="#accordionExample"
>
  <div
    class="accordion-body d-flex flex-column align-items-center"
  >
  <img
      src="${item.picture.large}"
      alt=""
      width="150px"
      class="rounded-circle"
    />
    <div>
      <div class="fw-bolder">
        <i class="bi bi-person-circle"></i>
        ${item.name.title} ${item.name.first}  ${item.name.last}
      </div>
      <div>
        <a href="tel:${item.cell}">
          <i class="bi bi-phone-fill"></i>
          ${item.cell}
        </a>
      </div>
      <div>
        <a href="mailto:${item.email}">
          <i class="bi bi-envelope-fill"></i>
          ${item.email}
        </a>
      </div>

      <div>
        <a
          href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.country}"
          target="_blank"
        >
          <i class="bi bi-globe-asia-australia"></i>

          ${item.location.street.number} ${item.location.street.name} ${item.location.state}
        </a>
      </div>
    </div>
  </div>
</div>
</div>
`;
  });

  document.getElementById("total-contacts").innerText = users.length;
  document.getElementById("accordian").innerHTML = str;
};

fetchData(api);

// search contact

document.getElementById("search-area").addEventListener("keyup", (event) => {
  const { value } = event.target;

  const filteredUser = userList.filter((item) => {
    const fullName = (item.name.first + " " + item.name.last).toLowerCase();
    return fullName.includes(value.toLowerCase());
  });

  displayContactList(filteredUser);
});
