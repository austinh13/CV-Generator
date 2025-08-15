export default function GeneralCV(){
    return(
        <div class = "personalSection">
            <h1 id="personalHeader"></h1>
        </div>
    )
}

export function setGeneral(formData){
    const pHeader = document.getElementById("personalHeader");
    pHeader.innerHTML = formData.name;
}