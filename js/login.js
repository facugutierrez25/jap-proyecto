document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-login").addEventListener('submit', validForm); 
  });

  function validForm(e) {
    e.preventDefault()

    var emailImput = document.getElementById('email').value;
    var passwordImput = document.getElementById('password').value;
    if(emailImput.length == 0 || passwordImput.length == 0) {
      e.preventDefault();
      document.getElementById("formError").innerHTML =('<span>Todos los campos son obligatorios</span>');
    } else{
    this.submit();
    window.location.href = 'index.html';
    }
  };