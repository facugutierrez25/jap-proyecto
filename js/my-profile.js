const inputFile = document.getElementById('input-foto');
const image = document.getElementById('img-profile');

async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(file);
    });
};


function checkearLocalStorage(item, id) {
    if (localStorage.getItem(`${item}`) === null) {
        localStorage.setItem(`${item}`, "");
    } else {
        document.getElementById(`${id}`).value = localStorage.getItem(`${item}`);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    checkearLocalStorage("userNombre1", "input-primer-nombre");
    checkearLocalStorage("userNombre2", "input-segundo-nombre");
    checkearLocalStorage("userApellido1", "input-primer-apellido");
    checkearLocalStorage("userApellido2", "input-segundo-apellido");
    checkearLocalStorage("userTelefono", "input-telefono");

    if (localStorage.getItem("userEmail") === null) {
        localStorage.setItem("userEmail", `${localStorage.getItem("username")}`);
        document.getElementById("input-email").value = localStorage.getItem("userEmail");
    } else {
        document.getElementById("input-email").value = localStorage.getItem("userEmail");
    }

    if (localStorage.getItem("userImg") === null) {
        localStorage.setItem("userImg", "img/img_perfil.png");
        image.setAttribute('src', `${localStorage.getItem("userImg")}`);
    } else {
        image.setAttribute('src', `${localStorage.getItem("userImg")}`);
    }

    document.getElementById("btn-guardar-cambios").addEventListener("click", function (e) {

        if (!validarTextos()) {
            e.preventDefault()
            document.getElementById("form-datos").classList.add("was-validated")
        } else {
            e.preventDefault()
            localStorage.setItem("userNombre1", `${document.getElementById("input-primer-nombre").value}`);
            localStorage.setItem("userNombre2", `${document.getElementById("input-segundo-nombre").value}`);
            localStorage.setItem("userApellido1", `${document.getElementById("input-primer-apellido").value}`);
            localStorage.setItem("userApellido2", `${document.getElementById("input-segundo-apellido").value}`);
            localStorage.setItem("userTelefono", `${document.getElementById("input-telefono").value}`);
            alert('Los cambios han sido guardados', 'success')
        }
    })

    inputFile.addEventListener("input", async function (e) {
        const base64URL = await encodeFileAsBase64URL(inputFile.files[0]);
        localStorage.setItem("userImg", `${base64URL}`);
        image.setAttribute('src', `${localStorage.getItem("userImg")}`);

    })
});