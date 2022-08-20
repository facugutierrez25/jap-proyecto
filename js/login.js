document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-login").addEventListener('submit', validForm); 
  });

  function validForm(e) {
    e.preventDefault()

    var emailInput = document.getElementById('email').value;
    var passwordInput = document.getElementById('password').value;
    if(emailInput.length == 0 || passwordInput.length == 0) {
      e.preventDefault();
      document.getElementById("formError").innerHTML =('<span>Todos los campos son obligatorios</span>');
    } else{
    this.submit();
    window.location.href = 'index.html';
    }
  };