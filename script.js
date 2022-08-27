"use strict"

const inputBoxWithLabel = ({
    type,
    placeholder = "",
    name,
    id,
    label,
    pattern,
    title,
    customClasses,
    max = 0,
    eventListenerType = "click" ,
    handleInput,
    autocomplete,
}) => {
    const labelElement = document.createElement("label") ;
    labelElement.innerText = label ;
    labelElement.htmlFor = id ;

    const inputElement = document.createElement("input") ;
    inputElement.type = type ;
    inputElement.placeholder = placeholder ;
    inputElement.name = name ;
    inputElement.id = id ;
    inputElement.title = title ;

    if (autocomplete) inputElement.autocomplete = autocomplete ;
    if (pattern) inputElement.setAttribute("data-pattern" , pattern) ;
    if (max) inputElement.maxLength = max ;
    if (handleInput && eventListenerType)
    inputElement.addEventListener (eventListenerType , handleInput) ;
if (customClasses) inputElement.classList.add(...customClasses);

const divElement = document.createElement ("div");
divElement.classList.add("inputBox");
divElement.append(labelElement);
divElement.append(inputElement);

return divElement;
};

const createForm = () => {
    const firstNameInputBox = inputBoxWithLabel ({
        type: "text",
        placeholder: "Enter your First Name",
        name: "firstName",
        id: "first-name",
        label: "First Name",
        pattern: "^[a-zA-Z]{3,}" ,
        title: "First Name must have 3 letters and must not contain numbers",
    });

    const lastNameInputBox = inputBoxWithLabel ({
        type: "text" ,
        placeholder: "Enter your Last Name" ,
        name: "lastName" ,
        id: "last-name" ,
        label: "Last Name" ,
        pattern: "^[a-zA-Z]{3,}" ,
        title: "Last Name must have 3 letters and must not contain numbers" ,
    });

    const nameInputDivElement = document.createElement ("div");
    nameInputDivElement.classList.add ("flex", "flex-row");
    nameInputDivElement.style = "gap: 1rem" ;
    nameInputDivElement.append (firstNameInputBox ,lastNameInputBox) ;

    const emailInputBox = inputBoxWithLabel ({
        type: "text" ,
        placeholder: "abc@xyz.com" ,
        name: "email",
        id: "email" ,
        label: "Email" ,
        pattern: "^[a-z0-9._&+-]+@[a-z0-9.-]+.[a-z]{2,}$" ,
        title: "Email must be in the format abc@xyz.com" ,
    });

const schoolregistrationnumberInputBox = inputBoxWithLabel ({
        type: "text",
        placeholder: "Enter your School Registration Number" ,
        name: "schoolRegistrationNumber" ,
        id: "school-registration-number" ,
        label: "School Registration Number" ,
        pattern: "^[0-9]{10}$" ,
        title: "Insert your 10 Digit School Registration Number" ,
        max: 10,
});

const phoneInputBox = inputBoxWithLabel({
        type: "text" ,
        placeholder: "Enter your Phone Number" ,
        name: "phone" ,
        id: "phone-number" ,
        label: "Phone Number" ,
        pattern: "^[0-9]{11}$" ,
        title: "Phone Number must be 11 numbers" ,
        max: 11,
        handleInput: (e) => {
            const regex = new RegExp ("[0-9]") ;
            if (!regex.test(e.key)) {
                e.returnValue = false ;
            }
        },
        eventListenerType: "key-press",
});

const dateInputBox = inputBoxWithLabel ({
        type: "date" ,
        name: "dob" ,
        id: "date-of-birth" ,
        label: "Date of Birth" ,
        title: "You must be 16 years and older" ,
});

const debitcardInputBox = inputBoxWithLabel ({
        type: "text" ,
        placeholder: "Enter your Card Number" ,
        name: "cardNumber" ,
        id: "card-number" ,
        label: "Card Details" ,
        title: "Debit Card must be 16 numbers" ,
        customClasses: ["input-uppercase"] ,
        max: 19 ,
        handleInput: (e) => {
            const regex = new RegExp ("[0-9]") ;
                const isBackspace = e.key === "Backspace";
    
                if (!regex.test(e.key) && !isBackspace) {
            e.returnValue = false ;
        } else {
            setTimeout(() => {
                const ccInputArray = e.target.value.split (" ") ;
                const isFourNumbers = 
                              ccInputArray[ccInputArray.length - 1].length === 4 ? true : false ;
                                if (isBackspace && ccInputArray[ccInputArray.length - 1].length === 0) {
                                    e.target.value = e.target.value.substring(0, e.target.value.length - 1);
                                } else if (isFourNumbers && ccInputArray.length < 4) {
                e.target.value += " " ;
            }
                }, 0);
        }
},
eventListenerType: "keydown" ,
autocomplete: "cc-number" ,
});

return [
    nameInputDivElement,
    emailInputBox ,
    schoolregistrationnumberInputBox ,
    phoneInputBox ,
    dateInputBox ,
    debitcardInputBox ,
];
};

const setErrorOnInputBox = (errorMsg, inputBox) => {
    if (
        inputBox.children[2] &&
        inputBox.children[2].tagName === "P" &&
        inputBox.children[2].innerText === errorMsg
    ) {
        return;
    } else if (
        inputBox.children[2] &&
        inputBox.children[2].tagName === "P" &&
        inputBox.children[2].innerText  !== errorMsg
    ) {
         inputBox.children[2].innerText = errorMsg;
        return;
    }
const errorElement = document.createElement ("p");
errorElement.innerText = errorMsg;
errorElement.classList.add ("err-msg");

inputBox.append(errorElement);
const formInputElement = inputBox.children[1];
formInputElement.classList.add("err-input");
};

const removeErrorOnInputBox = (inputBox) => {
    if (!inputBox.children[2] || inputBox.children[2].tagName !== "P") {
        return;
    }

    inputBox.children[2].remove ();
    inputBox.children[1].classList.remove ("err-input");
};

const checkValidation = () => {
    document.querySelectorAll (".inputBox").forEach ((item) => {
const formInputElement = item.children[1];
const value = formInputElement.value;
const regex = new RegExp (formInputElement.getAttribute("data-pattern",));

if (value === "") {
    setErrorOnInputBox("Required field", item);
} else if (!regex.test(value) && formInputElement.getAttribute("data-pattern")) {
    setErrorOnInputBox(formInputElement.title, item);
} else {
    removeErrorOnInputBox(item);
}
    });
};

const constructForm = () => {
    const root = document.getElementById ("form");

    const lineElement = document.createElement ("div");
    lineElement.classList.add ("line");
    root.append (lineElement);

    const formElements = createForm();
    root.append (...formElements);

    const submitButton =document.createElement ("button");
    submitButton.innerText = "Submit" ;
    submitButton.type = "submit" ;

    submitButton.addEventListener ("click" , function (e) {
        e.preventDefault();

        if (checkValidation(formElements)) console.log("Registered Successfully");
    });

    root.append (submitButton);
};

constructForm();