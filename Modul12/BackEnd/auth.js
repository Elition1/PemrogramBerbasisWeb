"use strict";

const BASE_API = "https://dummyjson.com"
const KEY = "token-profil";

function simpanToken(token, ingat = false) {
    hapusToken();
    (ingat ? localStorage : sessionStorage).setItem(KEY, token);
}

function hapusToken() {
    sessionStorage.removeItem(KEY);
    localStorage.removeItem(KEY);
}

function ambilToken() {
    return sessionStorage.getItem(KEY) ?? localStorage.getItem(KEY);
}

function sudahLogin() {
    return ambilToken() !== null;
}

function bacaToken(token) {
    try {
        const data = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(data));
    } catch {
        return null;
    }
}

async function tryLogin(username, password, ingat = false) {
    const res = await fetch(`${BASE_API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password})    
        }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login Failed");
    simpanToken(data.accessToken, ingat);
    return data;
}

function logOut() {
    hapusToken();
    location.replace("login.html");
}

function wajibLogin (tujuan = "login.html") {
    if (!sudahLogin()) {
        document.documentElement.style.visibility = "hidden";
        location.replace(tujuan);
        return false
    }

    return true;
}

async function fetchAman (url, opsi = {}) {
    const token = ambilToken();
    if (!token) {
        location.replace("login.html");
        throw new Error("Belum Login");
    }

    const res = await fetch(url, {
        ...opsi,
        headers: { ...opsi.headers, Authorization: `Bearer ${token}`},
    });

    if(res.status === 401) {
        hapusToken();
        location.replace("login.html?sesi=habis");
        throw new Error("Sesi berakhir");
    }

    return res;
}

