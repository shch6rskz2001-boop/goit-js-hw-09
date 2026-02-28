import throttle from "lodash.throttle";

const formEl = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

const formData = {
  email: "",
  message: "",
};

// ✅ Відновлення зі сховища
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// ✅ Обробка input з throttle 500ms
function handleInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) return;

  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

formEl.addEventListener("input", throttle(handleInput, 500));

// ✅ Submit
formEl.addEventListener("submit", event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formEl.reset();

  formData.email = "";
  formData.message = "";
});