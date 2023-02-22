function showAlerts(div,type,msg) {
    var putInDiv = document.getElementById(div)
    putInDiv.innerHTML = '<div class="alert alert-'+type+' alert-dismissible fade show" role="alert"><strong>'+msg+'</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
}

var currentUsersemail
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    
    var currentUsersemail = user.email;
    document.getElementById('logoutBtn').style.display='block'
    document.getElementById('logged_in').style.display='block'
    document.getElementById('not_logged_in').style.display='none'
    // mapinit()
    // installalert()
  } else {
    // User is signed out
    document.getElementById('logoutBtn').style.display='none'
    document.getElementById('not_logged_in').style.display='block'
    document.getElementById('logged_in').style.display = 'none'
  }
});

$('#sign_up_form').submit(function(e){
  e.preventDefault()

  var email = document.querySelector('#sign_up_email').value
  var pwd1 = document.querySelector('#sign_up_pwd1').value
  var pwd2 = document.querySelector('#sign_up_pwd2').value

  if(pwd1 == pwd2){
      firebase.auth().createUserWithEmailAndPassword(email, pwd1).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          showAlerts('sign_up_alerts', 'warning', errorMessage)
        });
        // .then((userCredential) => {
        //     // Signed in
        //     var user = userCredential.user;
        //     // ...
        // })
    }else{
      showAlerts('sign_up_alerts', 'warning', 'The passwords are not matching!');
  }
});

$('#sign_in_form').submit(function(e){
  e.preventDefault()
  var email = document.querySelector('#sign_in_email').value
  var pwd1 = document.querySelector('#sign_in_pwd').value
  firebase.auth().signInWithEmailAndPassword(email, pwd1).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    showAlerts('sign_in_alerts','warning',errorMessage)
    // mapinit()
  });
})

function logoutUser(){
  firebase.auth().signOut()
}

// function installalert(){
//   if (deferredPrompt){
//     deferredPrompt.prompt()
//     deferredPrompt = null
//   }
// }
