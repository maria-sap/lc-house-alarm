const firebaseConfig = {
  apiKey: "AIzaSyDuiGROW-6eI6jUcwB7yxrbuPk3Wp16_dk",
  authDomain: "cs-coursework-website-database.firebaseapp.com",
  databaseURL: "https://cs-coursework-website-database-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cs-coursework-website-database",
  storageBucket: "cs-coursework-website-database.appspot.com",
  messagingSenderId: "777266945228",
  appId: "1:777266945228:web:b4195b192be94b246e3669",
  measurementId: "G-FLSZKWCSG7"
};

// login JS
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    
    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Hello " + email_id;

      var ref = firebase.database().ref("users");
      ref.on("value", function(snapshot) {
      var childData = snapshot.val();
      var date_time = Object.values(childData)[0];    //this will return 1st key.
      var status = Object.values(childData)[1];    //this will return 2nd key.
      var device_user = Object.values(childData)[2];    //this will return 3rd key.
      document.getElementById('device_user').innerHTML =  device_user;
      document.getElementById('status').innerHTML =  status;
      document.getElementById('date_time').innerHTML = date_time;


      });



    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    
  }
});

// login button
function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

// create new account button
function signin() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
   // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}


function logout(){
  firebase.auth().signOut();
}



// animation JS
document.addEventListener('scroll', function (event) {
  var pageTop = $(document).scrollTop();
  var pageBottom = pageTop + $(window).height();
  var tags = $(".tag");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible");
    } else {
      $(tag).removeClass("visible");
    }
  }
});
