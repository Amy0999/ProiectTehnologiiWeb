

function aplicatie() {
    const logInForm = document.querySelector("#logIn");
    const formAlegereRol = document.querySelector("#idAlegereRol");

    document.querySelector("#btnStudent").addEventListener("click", e => {
        e.preventDefault();
        formAlegereRol.style.display = "none";
        logInForm.style.display = "block";
    });

    document.querySelector("#btnBack").addEventListener("click", e => {
        e.preventDefault();
        formAlegereRol.style.display = "block";
        logInForm.style.display = "none";
    });
}

document.addEventListener('DOMContentLoaded', aplicatie);
