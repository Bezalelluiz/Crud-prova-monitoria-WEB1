import { writable } from "svelte/store";

export const currentPage = writable('home');
export const users = writable([]);
export const currentUser = writable(null);
export const instruments = writable([]);

users.subscribe(v => {
    const user = v.at(-1);
    
    if (!user) return;

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email)
    formData.append('password', user.pw);
    console.log(user.email);
    fetch('http://localhost:8000/add-user.php', {
        method: 'post',
        body: formData
    }); // non blocking
    console.log(user.email);
})

export function addInstruments(name, user_id, model, price) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', model);
    formData.append('user_id', user_id);
    formData.append('price', price);
    console.log(user_id);
    fetch('http://localhost:8000/add-instruments.php', {
        method: 'post',
        body: formData
    });

    loadInstruments(user_id)
}

export async function removeInstruments(id, user_id) {
    await fetch('http://localhost:8000/remove-instruments.php?id=' + id, {
        method: 'get'
    });
    loadInstruments(user_id)
}

async function loadInstruments(user_id) {
    // console.log('deve carregar os produtos do usuário ' + user_id)
    const response = await fetch('http://localhost:8000/get-instruments.php?user_id=' + user_id, {
        method: 'get'
    });
    const data = await response.json();
    instruments.set(data);
}

export const login = async (username, pw) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', pw);
    const response = await fetch('http://localhost:8000/login.php', {
        method: 'post',
        body: formData
    });
    if (!response.ok) {
        alert('usuário ou senha incorretos');
        return;
    }
    const data = await response.json();
    currentUser.set(data);
    loadInstruments(data.id)
}