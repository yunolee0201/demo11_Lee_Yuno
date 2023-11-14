var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userInfo => {
                            //get the data fields of the user
                            var userName = userInfo.data().name;
                            var userSchool = userInfo.data().school;
                            var userCity = userInfo.data().city;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
                            if (userSchool != null) {
                                document.getElementById("schoolInput").value = userSchool;
                            }
                            if (userCity != null) {
                                document.getElementById("cityInput").value = userCity;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    document.getElementById("personalInfoFields").disabled= false;
}

function saveUserInfo(){
    // get entered information by user
    userName = document.getElementById("nameInput").value;
    userSchool = document.getElementById("schoolInput").value;
    userCity = document.getElementById("cityInput").value;

    // update the user document in firestore
    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity
    }).then(()=>{
        console.log("User Informaiton updated")
    })
    document.getElementById("personalInfoFields").disabled= true;
}