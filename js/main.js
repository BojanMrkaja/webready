//Type effect
const TypeWriter = function (textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function () {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    //Get full text of current word
    const fullText = this.words[current];

    // Check if deleteing
    if (this.isDeleting) {
        //Remove char
        this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
        //Add char
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    //Insert txt element
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type speed
    let typeSpeed = 200;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    //if word is complate
    if (!this.isDeleting && this.txt === fullText) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
};

//document.addEventListener("DOMContentLoaded", init);
////Init App

function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    //init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

setTimeout(init, 500);
