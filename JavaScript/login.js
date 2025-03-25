const mainSection = document.getElementById("main-section");
const bannerSection = document.getElementById("banner-section");
const getStarted = document.getElementById("get-started");


// Event Listener (Get Started Button) ---
getStarted.addEventListener("click", function () { 
    console.log(`This is second con console.log()`);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const validPassword = parseInt(password);
    console.log("Email");
    console.log("Password");
    if (email.length >= 3 && email.length < 28) {
      if (validPassword === 123456) {
        // alert --
        alert("successfully login compleat....👌👌👌")
        const banner = bannerSection;
        banner.classList.add("hidden");
        const main = mainSection;
        main.classList.remove("hidden");
        } else {
        alert("Password is not valid.😒😒");
        } 
    }
    else {
        alert("Email is not valid.😑😑 ");  
        }
    });



    
// Log Out (Button) ---
const logOut = document.getElementById("log-out");
logOut.addEventListener("click", function () { 
    location.reload();
} )
