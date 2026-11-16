/* Web Engineering - Assignment 3 (JavaScript)
   */

var toast = document.getElementById("toast");

function showMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 3500);
}

/* Clicking "Choose this piece" pre-selects the product in the form */
document.querySelectorAll(".product-link").forEach(function (link) {
    link.addEventListener("click", function () {
        document.getElementById("product").value = link.getAttribute("data-product");
    });
});

/* ---------- Task 5: Type conversion - age verification ---------- */
var birthInput = document.getElementById("birth-year");
var discountMsg = document.getElementById("discountMsg");

function checkDiscount() {
    var value = birthInput.value.trim();
    discountMsg.className = "hint";

    if (value === "") {
        discountMsg.textContent = "";
        return;
    }

    var birthYear = parseInt(value, 10);          // string -> integer
    var thisYear = new Date().getFullYear();
    var age = thisYear - birthYear;

    if (isNaN(birthYear) || birthYear < 1900 || birthYear > thisYear) {
        discountMsg.textContent = "Please enter a valid birth year, like 2002.";
    } else if (age >= 18 && age <= 25) {
        discountMsg.textContent = "Student discount confirmed (age " + age + ")!";
        discountMsg.classList.add("ok");
    } else if (age >= 60) {
        discountMsg.textContent = "Senior discount confirmed (age " + age + ")!";
        discountMsg.classList.add("ok");
    } else {
        discountMsg.textContent = "Age " + age + ": no student or senior discount applies.";
    }
}

birthInput.addEventListener("input", checkDiscount);

/* ---------- Task 1: Interactive form handling and validation ---------- */
var orderForm = document.getElementById("orderForm");
var formMessage = document.getElementById("formMessage");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();                       // stop the page refreshing

    var username = document.getElementById("username").value.trim();
    var email = document.getElementById("email").value.trim();
    var product = document.getElementById("product").value;
    var payment = document.querySelector('input[name="payment"]:checked');

    if (username === "" || email === "" || product === "" || payment === null) {
        formMessage.textContent = "Please complete all required fields.";
        return;
    }

    formMessage.textContent = "Thank you for visiting, " + username +
        "! We will contact you at " + email + ".";
    showMessage("Thank you, " + username + "! Your demo order is ready.");

    orderForm.reset();
    document.getElementById("charCount").textContent = "100 characters remaining";
    document.getElementById("charCount").classList.remove("low");
    discountMsg.textContent = "";
});

/* ---------- Task 2: Table row highlighting ---------- */
document.querySelectorAll("#menuTable tbody tr").forEach(function (row) {
    row.addEventListener("mouseover", function () {
        row.style.backgroundColor = "#ffd3e3";
    });
    row.addEventListener("mouseout", function () {
        row.style.backgroundColor = "";
    });
});

/* ---------- Task 3: Theme / style switcher ---------- */
document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

/* ---------- Task 4: Interactive order total calculator ---------- */
var picks = document.querySelectorAll(".pick");
var totalText = document.getElementById("total");

function updateTotal() {
    var total = 0;
    picks.forEach(function (box) {
        if (box.checked) {
            total += parseInt(box.getAttribute("data-price"), 10);
        }
    });
    totalText.textContent = "Total: Rs. " + total;
}

picks.forEach(function (box) {
    box.addEventListener("change", updateTotal);
});

/* ---------- Task 6: "Read More" toggle on the article ---------- */
var extraParagraphs = document.querySelectorAll("#story .more");
var readMoreBtn = document.getElementById("readMore");

extraParagraphs.forEach(function (p) {
    p.style.display = "none";                     // truncate to start
});

readMoreBtn.addEventListener("click", function () {
    var hidden = extraParagraphs[0].style.display === "none";
    extraParagraphs.forEach(function (p) {
        p.style.display = hidden ? "block" : "none";
    });
    readMoreBtn.textContent = hidden ? "Read Less" : "Read More";
});

/* ---------- Task 7: Live category filter ---------- */
var filterButtons = document.querySelectorAll(".filter-btn");
var filterItems = document.querySelectorAll("[data-category]");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var chosen = button.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
            b.classList.remove("active");
        });
        button.classList.add("active");

        filterItems.forEach(function (item) {
            var show = chosen === "all" || item.getAttribute("data-category") === chosen;
            item.style.display = show ? "" : "none";
        });
    });
});

/* ---------- Task 8: Dynamic opening status ---------- */
var statusBanner = document.getElementById("status");
var hour = new Date().getHours();

if (hour >= 8 && hour < 22) {
    statusBanner.textContent = "We are Open!";
    statusBanner.classList.add("open");
} else {
    statusBanner.textContent = "Closed - Open at 8 AM";
    statusBanner.classList.add("closed");
}

/* ---------- Task 9: Character counter for special request box ---------- */
var notes = document.getElementById("special-notes");
var charCount = document.getElementById("charCount");

notes.addEventListener("input", function () {
    var left = notes.maxLength - notes.value.length;
    charCount.textContent = left + " characters remaining";
    charCount.classList.toggle("low", left <= 20);
});

/* Newsletter box */
document.getElementById("newsForm").addEventListener("submit", function (event) {
    event.preventDefault();
    showMessage("Thanks for subscribing!");
    event.target.reset();
});