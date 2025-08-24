import { useState } from "react";

export default function GeneralCV(){

    return(
        <div className = "personalSection">
            <h1 id="personalHeader"></h1>
            <div className="bio">
                <p id = "email"></p>
                <p id = "phone"></p>
                <p id = "location"></p>
            </div>
            <div className = "bar"></div>
        </div>
    )
}

export function setGeneral(formData){
    const pHeader = document.getElementById("personalHeader");
    pHeader.innerHTML = formData.name;

    const email = document.getElementById("email")
    email.innerHTML = formData.email + " | ";

    const phone = document.getElementById("phone")
    phone.innerHTML = formData.number + " | ";

    const location = document.getElementById("location")
    location.innerHTML = formData.location
}