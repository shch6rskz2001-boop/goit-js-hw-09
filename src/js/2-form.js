const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

// 1) Відновлення зі сховища при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// 2) Делегування input: оновлюємо formData одразу + пишемо в localStorage
formEl.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 3) Submit: валідація + очищення
formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  formEl.reset();
});