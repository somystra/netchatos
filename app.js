import { auth, db, storage } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ELEMENTLAR
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const postText = document.getElementById("postText");
const imageInput = document.getElementById("imageInput");

// BUTTONLAR
document.getElementById("registerBtn").onclick = async () => {
  await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  alert("Account created!");
};

document.getElementById("loginBtn").onclick = async () => {
  await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  alert("Logged in!");
};

document.getElementById("googleBtn").onclick = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

document.getElementById("logoutBtn").onclick = () => signOut(auth);

// POST QO‘SHISH
document.getElementById("postBtn").onclick = async () => {
  let file = imageInput.files[0];
  let imageUrl = "";

  if (file) {
    let storageRef = ref(storage, "images/" + Date.now());
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
    text: postText.value,
    imageUrl,
    likes: 0,
    user: auth.currentUser?.email || "anon",
    time: Date.now()
  });

  postText.value = "";
};

// REALTIME POSTLAR
onSnapshot(collection(db, "posts"), (snapshot) => {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  snapshot.forEach(docSnap => {
    let post = docSnap.data();

    let div = document.createElement("div");
    div.className = "post glass";

    div.innerHTML = `
      <h4>${post.user}</h4>
      <p>${post.text}</p>
      ${post.imageUrl ? `<img src="${post.imageUrl}">` : ""}
      <button class="likeBtn">❤️ ${post.likes}</button>
    `;

    div.querySelector(".likeBtn").onclick = async () => {
      await updateDoc(doc(db, "posts", docSnap.id), {
        likes: post.likes + 1
      });
    };

    postsDiv.appendChild(div);
  });
});
