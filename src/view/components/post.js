import {Component} from '../component.js';
import {likePost, deletePost} from '../../lib/firebase.js';

//función que se ejecuta al inicio
const onLoad = () => {
    const renderPost= [...document.querySelectorAll(".like-post")]; 
    renderPost.map(p => {
        p.addEventListener("click", (e)=>{
            const postId= e.target.getAttribute("data-post");
            likePost(postId);
        });
    })

    const deleteP= [...document.querySelectorAll(".delete-post")];
    deleteP.map(p => {
        p.addEventListener("click", (e)=>{
            const postIdDelete= e.target.getAttribute("data-post");
            if(confirm('¿Quieres eliminar el post?') === true){
                deletePost(postIdDelete);
            };
        });
    })

    const textPost= document.getElementById("inputPost");
    const textareaPost= document.getElementById("textareaPost");
    const edit=[...document.querySelectorAll('icon-pen')];
    edit.addEventListener('change', () => {
        preview.textPost=this.textareaPost.value
    });
    
}

export const post = (template) => {
    return new Component(template, onLoad);
} 