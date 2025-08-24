import { use, useState } from "react"
import {setGeneral} from "./GeneralCV"
export default function General({ formData, handleGeneralChange }){

    const handleSubmit = (e) => {
        e.preventDefault();
        setGeneral(formData);
    }
    return(
        <div className = "personalInfo">
            <h1>Personal Information</h1>
            <form onSubmit={handleSubmit} className="formGeneral">
            <p>Name</p>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => handleGeneralChange("name", e.target.value)}
                required
            />

            <p>Email</p>
            <input
                type="text"
                value={formData.email}
                onChange={(e) => handleGeneralChange("email", e.target.value)}
                required
            />

            <p>Phone Number</p>
            <input
                type="text"
                value={formData.number}
                onChange={(e) => handleGeneralChange("number", e.target.value)}
                required
            />

            <p>Location</p>
            <input
                type="text"
                value={formData.location}
                onChange={(e) => handleGeneralChange("location", e.target.value)}
                required
            />

            <button type="submit" id="generalSubmit">Submit</button>
            </form>
        </div>
    )
}