const form = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

 
  if (username === 'your_username' && password === 'your_secure_password') {
    message.textContent = 'Login successful!';

  
    console.log('User logged in:', username);
  } else {
    message.textContent = 'Invalid username or password.';
  }
});
