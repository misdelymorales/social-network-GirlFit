import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  sendEmailVerification,
  showPosts,
  likePost,
  //sendPasswordResetEmail//
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

import { 
  getFirestore ,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";

//Iniciar servicios
 const firebaseConfig = {
     apiKey: "AIzaSyAlSrkSdzAr2miMg3q0c0_ZWOqIL1EkANs",
     authDomain: "girlfit-94742.firebaseapp.com",
     databaseURL: "https://girlfit-94742-default-rtdb.firebaseio.com",
     projectId: "girlfit-94742",
     storageBucket: "girlfit-94742.appspot.com",
     messagingSenderId: "20460878579",
     appId: "1:20460878579:web:4e56d9c5aadeb762221586"
   };
 
export const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export async function createpost (textPost="texto por defecto"){
  try {
    let userEmail = localStorage.getItem('correo');
    const docRef = await addDoc(collection(db, "posts"), {
      name: userEmail,
      description: textPost,
      likesCounter: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//mostrar los posts//
export const showPosts = async () => {
  const posts = query(collection(db, 'posts'));
  const querySnapShot = await getDocs(posts);
  const allPosts = [];
  querySnapShot.forEach((doc) => {
    allPosts.push(doc.data());
  });
  return allPosts;
};

//dar like
 export const likePosts = async (id, userId) => {
  const postRef = doc(db, 'posts', id);
  const docLike = await getDoc(postRef);
  const dataLike = docLike.data();
  console.log(dataLike);
  const likesCount = dataLike.numberLike;
  if (dataLike.like.includes(userId)) {
    await updateDoc(postRef, {
      like: arrayRemove(userId),
      numberLike: likesCount - 1,
    });
  } else {
    await updateDoc(postRef, {
      like: arrayUnion(userId),
      numberLike: likesCount + 1,
    });
  }
};

//Función de Registarse
export function register(email, password){
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //// Signed in
        const user = userCredential.user;
      emailVerification(auth);

        alert("usuario creado correctamente");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.error("error al crear usuario");
      });
}

////Función de Iniciar sesión
export function login(email, password){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    //console.info("inicio sesion")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("usuario no encontrado");
  });
}

////Función para iniciar sesión con Google
export const signWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      //// This gives you a Google Access Token. You can use it to access the Google API.
      ////const credential = GoogleAuthProvider.credentialFromResult(result);
      //// const token = credential.accessToken;
      //// The signed-in user info.
      //// const user = result.user;
      //// ...
      //// console.log('resultó google jeje');
      return credential;
    })
    .catch((error) => {
      //// Handle Errors here.
      const errorCode = error.code;
      //// const errorMessage = error.message;
      //// The email of the user's account used.
      //// const email = error.customData.email;
      //// The AuthCredential type that was used.
      //// const credential = GoogleAuthProvider.credentialFromError(error);
      //// ...
      return errorCode;
    });
   
  };

  //función para autenticar con facebook//
  export const signWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
    // The signed-in user info.
    //const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    //const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    //const errorMessage = error.message;
    // The email of the user's account used.
    //const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }

    //funcion para verificar el correo//
    function emailVerification(auth) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          alert('Te hemos enviado una confirmación a tu correo por favor válida antes de comenzar.');
        });
    }

//Estado de autenticación y datos del usuario
export const stateUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('estoy logueada', user);
      localStorage.setItem('correo',user.email);
      window.location.hash = '#/feed';
      return;
    }
    localStorage.removeItem('correo');
    window.location.hash = '#/login';
    return ('not logged');
    
  })
};

//Cerrar sesión
signOut(auth).then(() => {
  // redirige a inicio de sesión
  window.location.hash = '#/login';
}).catch((error) => {
  // An error happened.
});

//recuperar contraseña//
//export const resetPass = (email ) => {
  //sendPasswordResetEmail(auth, email)
    //.then((userCredential) => {
      //callback(true);
      //return userCredential;
      // console.log('entraste jeje');
    //})
    //.catch((error) => {
      //callback(false);
      // const errorCode = error.code;
      //const errorMessage = error.message;
      //return errorMessage;
    //});
//};