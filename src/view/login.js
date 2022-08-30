import {Component} from './component.js';

// const onLoad = () => {
//     const welcomeBtn = document.getElementById('welcome-btn');
//     welcomeBtn.addEventListener("click", showWelcome);
// }

// const showWelcome = () => {
//     alert("Welcome");
// }

const Registrarse = () => {
    alert("Registro Exitoso");
}

const template = `
<div class="view active" id="container-sign-in">
<div class="mobile-logo"><img src="img/logo/logo-rosa.png"></div>

<form>
    <h2 class="form_title">Bienvenidas a la primera redSocial para mujeres deportistas</h2>
    <input type="email" id="login-email" placeholder="Correo Electronico">
    <input type="password" id="login-password" placeholder="Contraseña">
</form>
<button id="btn-login">Iniciar Sesión</button>
<div class="icons-login">
    <img id="login-facebook" src="img/Logo/facebook-rosa.png">
    <img id="login-google" src="img/Logo/google-rosa.png">
</div>
<p>¿Aun no tienes cuenta?<br></p>
<a href="#/register">¡Registrate aquí!</a>
</div>
`;

export const login = new Component(template);