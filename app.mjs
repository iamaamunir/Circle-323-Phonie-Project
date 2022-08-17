"use strict"

function startApp() {

  const input = document.querySelector(".input");
  const img = document.querySelector("img");
  const removeHiddenClass = function() {
    img.classList.remove("hidden");
  };

  const mtnRegex = /^(0803|0806|0703|0706|0810|0813|0814|0816)/;
  const mtnRegex234 = /^[+]234(0803|0806|0703|0706|0810|0813|0814|0816)/;
  const mtnRegexOther = /^[+]234(803|806|703|706|810|813|814|816)/;
  const gloRegex = /^(0805|0807|0705|0905|0815|0811)/;
  const gloRegex234 = /^[+]234(0805|0807|0705|0905|0815|0811)/;
  const gloRegexOther = /^[+]234(805|807|705|905|815|811)/;
  const airtelRegex = /^(0808|0708|0701|0902|0907|0901)/;
  const airtelRegex234 = /^[+]234(0808|0708|0701|0902|0907|0901)/;
  const airtelRegexOther = /^[+]234(808|708|701|902|907|901)/;
  const etisalatRegex = /^(0809|0818|0817|0909)/;
  const etisalatRegex234 = /^[+]234(0809|0818|0817|0909)/;
  const etisalatRegexOther = /^[+]234(809|818|817|909)/;

  function checkMtnRegex() {
    return (
      mtnRegex.test(input.value) ||
      mtnRegex234.test(input.value) ||
      mtnRegexOther.test(input.value)
    );
  }

  function checkGloRegex() {
    return (
      gloRegex.test(input.value) ||
      gloRegex234.test(input.value) ||
      gloRegexOther.test(input.value)
    );
  }

  function checkAirtelRegex() {
    return (
      airtelRegex.test(input.value) ||
      airtelRegex234.test(input.value) ||
      airtelRegexOther.test(input.value)
    );
  }

  function checkEtisalatRegex() {
    return (
      etisalatRegex.test(input.value) ||
      etisalatRegex234.test(input.value) ||
      etisalatRegexOther.test(input.value)
    );
  }

  input.addEventListener("input", () => {
    switch (true) {
      case checkMtnRegex():
        img.src = "images/mtn.jpg";
        removeHiddenClass();
        break;

      case checkGloRegex():
        img.src = "images/glo.jpg";
        removeHiddenClass();
        break;

      case checkAirtelRegex():
        img.src = "images/airtel.png";
        removeHiddenClass();
        break;

      case checkEtisalatRegex():
        img.src = "images/etisalat.png";
        removeHiddenClass();
        break;

      default:
        img.classList.add("hidden");
    }
  });

  const numPrefixes = [
  "0803",
  "0806",
  "0703",
  "0706",
  "0810",
  "0813",
  "0814",
  "0816",
  "0903",
  "0906",
  "0805",
  "0807",
  "0705",
  "0815",
  "0811",
  "0905",
  "0808",
  "0701",
  "0708",
  "0902",
  "0907",
  "0901",
  "0809",
  "0818",
  "0817",
  "0909",
];

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  let currentFocus;

  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);

    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");

        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);

        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;

      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;

      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();

      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;

    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the numPrefixes array as possible autocomplete values:*/
autocomplete(document.querySelector(".input"), numPrefixes);
  // Your entire app should not necessarily be coded inside this 
  // single function (though there's no penalty for that), 
  // so create and use/call additional functions from here

  // pls remove the below and make some magic in here!
  //   console.log('make magic in here!');

  //   const header = document.querySelector('h2');
  //   if(header) {
  //     header.textContent = 'make some magic here!!';
  //   }
  // };
}

// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //