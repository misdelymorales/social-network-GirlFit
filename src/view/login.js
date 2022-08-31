import {Component} from './component.js';
import {login as loginFirebase} from '../lib/firebase.js';
import {signWithGoogle} from '../lib/firebase.js';
import {nav} from './components/nav.js';

const onLoad = () => {
    nav.render('nav');
    document.getElementById("btn-login").addEventListener("click", handleLoginClick);
    document.getElementById("login-google").addEventListener("click", signWithGoogle);
}

const handleLoginClick = () => {
    const email= document.getElementById("login-email").value;
    const password= document.getElementById("login-password").value;

    loginFirebase(email,password);
    
}

const template = `
<div id="login">
    <div id="container-sign-in">
    <div class="mobile-logo"><img src="img/logo/logo-rosa.png"></div>
    <form>
        <h2 class="form_title">Inicia Sesión para continuar</h2>
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

export const login = new Component(template, onLoad);