document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-login").addEventListener('submit', validForm); 
  });

  function validForm(e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    if(email.length == 0) {
        
    }
    var password = document.getElementById('password').value;
    if (password.length == 0) {
   
    }
    this.submit();
  };