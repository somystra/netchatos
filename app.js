import { auth, db, storage } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// REGISTER
window.register = async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  await createUserWithEmailAndPassword(auth, email, password);
  alert("Account created!");
};

// LOGIN
window.login = async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, password);
  alert("Logged in!");
};

// ADD POST
window.addPost = async () => {
  let text = document.getElementById("postText").value;

  await addDoc(collection(db, "posts"), {
    text: text,
    time: Date.now()
  });

  loadPosts();
};

// LOAD POSTS
window.loadPosts = async () => {
  let querySnapshot = await getDocs(collection(db, "posts"));
  let container = document.getElementById("posts");

  container.innerHTML = "";

  querySnapshot.forEach(doc => {
    let post = doc.data();

    container.innerHTML += `
      <div class="post glass">
        <h3>${post.text}</h3>
      </div>
    `;
  });
};
