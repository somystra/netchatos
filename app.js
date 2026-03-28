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

const provider = new GoogleAuthProvider();

// GOOGLE LOGIN
window.googleLogin = async () => {
  await signInWithPopup(auth, provider);
  alert("Google login success!");
};

// EMAIL REGISTER
window.register = async () => {
  let email = email.value;
  let password = password.value;
  await createUserWithEmailAndPassword(auth, email, password);
};

// LOGIN
window.login = async () => {
  let email = email.value;
  let password = password.value;
  await signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
window.logout = () => signOut(auth);

// ADD POST
window.addPost = async () => {
  let text = postText.value;
  let file = document.getElementById("imageInput").files[0];

  let imageUrl = "";

  if (file) {
    let storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
    text,
    imageUrl,
    likes: 0,
    user: auth.currentUser.email,
    time: Date.now()
  });
};

// REALTIME POSTS
onSnapshot(collection(db, "posts"), (snapshot) => {
  let postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  snapshot.forEach(docSnap => {
    let post = docSnap.data();

    postsDiv.innerHTML += `
      <div class="post glass">
        <h4>${post.user}</h4>
        <p>${post.text}</p>
        ${post.imageUrl ? `<img src="${post.imageUrl}">` : ""}
        <button onclick="likePost('${docSnap.id}', ${post.likes})">
          ❤️ ${post.likes}
        </button>
      </div>
    `;
  });
});

// LIKE
window.likePost = async (id, likes) => {
  let postRef = doc(db, "posts", id);
  await updateDoc(postRef, {
    likes: likes + 1
  });
};
