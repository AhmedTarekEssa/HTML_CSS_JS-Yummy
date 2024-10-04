//functions calls
document.getElementById("Search").addEventListener("click", function() {
    searchInputs()
    closeSideNav()
})
document.getElementById("Categories").addEventListener("click", function() {
    getCategories()
    closeSideNav()
})
document.getElementById("Area").addEventListener("click", function() {
    getArea()
    closeSideNav()
})
document.getElementById("Ingredients").addEventListener("click", function() {
    getIngredients()
    closeSideNav()
})
document.getElementById("Contact").addEventListener("click", function() {
    showContacts();
    closeSideNav();
})


//side bar nav
function openSideNav(){
    $(".sideNav").animate({
        left:0
    },1000)
    // $(".open-close-i").classList.replace("fa-align-justify", "fa-x")
    for(let i=0; i < 5 ; i++ ){
        $(".links li").eq(i).animate({top:0},(100 * i) +1000)
    }
}
function closeSideNav(){
    let boxWidth = $(".sideNav  .nav-tab").outerWidth()
    $(".sideNav").animate({
        left: - boxWidth
    },1000)
    // $(".open-close-i").classList.replace("fa-x", "fa-align-justify")
    $(".links li").animate({top:300},1000)
}

closeSideNav()//before any thing (on loading page the nav is closed)
$(".sideNav i.open-close-i").click(() => {
    if ($(".sideNav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

// side nav done

// over all display for the searched items >> will be used 
let rowData = document.getElementById("rowData")
let SRC = document.getElementById("SearchResultContainer")
function displayMeals(arr){
    let cartona = ""
    for(let i=0; i < arr.length ; i++){
        cartona += `
        <div class="col-md-3 Show">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative rounded-3 overflow-hidden ">
            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
            <div class="mealCover p-2">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    rowData.innerHTML= cartona
}

//search
function searchInputs(){
    SRC.innerHTML=`<div class="row py-4 ">
        <div class="col-md-6 Show searchShow">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6 Show searchShow">
            <input onkeyup="searchByNFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `
    rowData.innerHTML=""
    console.log("5555");
}
async function searchByName(name){
    closeSideNav()
    rowData.innerHTML=""
    $(".screenLoadingShow").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    console.log(response)

    response.meals ? displayMeals(response.meals): displayMeals([])
    $(".screenLoadingShow").fadeOut(500)

}
async function searchByNFirstLetter(l){
    closeSideNav()
    rowData.innerHTML=""
    $(".screenLoadingShow").fadeIn(500)

    l == "" ? l = "a" : ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
    response = await response.json()
    console.log(response)

    response.meals ? displayMeals(response.meals): displayMeals([])
    $(".screenLoadingShow").fadeOut(500)

}

$(document).ready(() => {
    searchByName("").then(() => {
        $(".screenLoadingShow").hide(500)
        $("body").css("overflow", "visible")

    })
})

// categories
async function getCategories(){
    rowData.innerHTML= ""
    $(".screenLoadingShow").fadeIn(500)
    SRC.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    
    
    displayCategories(response.categories)
    $(".screenLoadingShow").fadeOut(500)
    console.log(response)
}

function displayCategories(arr) {
    let cartona = ""
    for(let i=0; i < arr.length ; i++){
        cartona += `<div class="col-md-3 Show">
        <div onclick="displayCategoryMeals('${arr[i].strCategory}')" class="meal position-relative  rounded-2 cursor-pointer overflow-hidden">
            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer p-2">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML= cartona
    
}
async function displayCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".screenLoadingShow").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".screenLoadingShow").fadeOut(500)

}

//cat done isa
//area
async function getArea(){
    rowData.innerHTML= ""
    $(".screenLoadingShow").fadeIn(500)
    SRC.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response)


    displayArea(response.meals)
    $(".screenLoadingShow").fadeOut(500)
}

function displayArea(arr) {
    let cartona = ""
    for(let i=0; i < arr.length ; i++){
        cartona += `<div class="col-md-3 Show">
        <div onclick="displayAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${arr[i].strArea}</h3>
        </div>
    </div>
        `
    }

    rowData.innerHTML= cartona
    
}
async function displayAreaMeals(area) {
    rowData.innerHTML = ""
    $(".screenLoadingShow").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".screenLoadingShow").fadeOut(500)

}

//area done 
async function getIngredients() {
    rowData.innerHTML = ""
    $(".screenLoadingShow").fadeIn(500)
    searchContainer.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals)

    displayIngredients(respone.meals.slice(0, 20))
    $(".screenLoadingShow").fadeOut(500)

}

function displayIngredients(arr) {
    let cartona = ""

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="displayIngredientsMeals('${arr[i].strIngredient}')"  class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>

                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartona
}

async function displayIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".screenLoadingShow").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".screenLoadingShow").fadeOut(500)

}
// ingredient done 








// display how to cook a meal by details

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".screenLoadingShow").fadeIn(500)

    SRC.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json()

    displayMealDetails(respone.meals[0])
    $(".screenLoadingShow").fadeOut(500)
}

function displayMealDetails(meal) {
    SRC.innerHTML = "";
    let recipes = ``
    for (let i = 1; i <= 15; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags.split(",")
    if (!tags){
        tags=[]
    }
    let tag =``
    for(let i = 2; i <= tags.length; i++){
        tag +=`<li class=" alert alert-danger fit m-2 p-1">${tags[i]}</li>`
    }
    let cartona = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}"alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area:</span> ${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category:</span> ${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${recipes}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tag}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
    `
    rowData.innerHTML = cartona

}


let subBtn
//contact us
function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameError" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>

            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailError" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@abc.xyz
                </div>
            </div>

            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Phone">
                <div id="phoneError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>

            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>

            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>

            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repeat password again">
                <div id="repasswordError" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword
                </div>
            </div>
            
        </div>

        <button id="subBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
`
    subBtn = document.getElementById("subBtn")
    


}
function inputsValidation() {
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const ageInput = document.getElementById("ageInput");
    const passwordInput = document.getElementById("passwordInput");
    const repasswordInput = document.getElementById("repasswordInput");
    const submitBtn = document.getElementById("submitBtn");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const ageError = document.getElementById("ageError");
    const passwordError = document.getElementById("passwordError");
    const repasswordError = document.getElementById("repasswordError");

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const ageRegex = /^[0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    function validateName() {
        if (nameRegex.test(nameInput.value)) {
            nameError.classList.add("d-none");
            return true;
        } else {
            nameError.classList.remove("d-none");
            return false;
        }
    }

    function validateEmail() {
        if (emailRegex.test(emailInput.value)) {
            emailError.classList.add("d-none");
            return true;
        } else {
            emailError.classList.remove("d-none");
            return false;
        }
    }

    function validatePhone() {
        if (phoneRegex.test(phoneInput.value)) {
            phoneError.classList.add("d-none");
            return true;
        } else {
            phoneError.classList.remove("d-none");
            return false;
        }
    }

    function validateAge() {
        if (ageRegex.test(ageInput.value)) {
            ageError.classList.add("d-none");
            return true;
        } else {
            ageError.classList.remove("d-none");
            return false;
        }
    }

    function validatePassword() {
        if (passwordRegex.test(passwordInput.value)) {
            passwordError.classList.add("d-none");
            return true;
        } else {
            passwordError.classList.remove("d-none");
            return false;
        }
    }

    function validateRepassword() {
        if (repasswordInput.value === passwordInput.value) {
            repasswordError.classList.add("d-none");
            return true;
        } else {
            repasswordError.classList.remove("d-none");
            return false;
        }
    }

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isAgeValid = validateAge();
    const isPasswordValid = validatePassword();
    const isRepasswordValid = validateRepassword();

    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}