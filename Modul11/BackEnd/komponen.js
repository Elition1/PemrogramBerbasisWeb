// Fungsi bawaan javascript yang membuat error semakin terlihat dan memperketat penulisan syntax
"use strict";

// Sebuah HTML Elemen yang tidak diperlihatkan pada web page dan bisa sebagai penyangga 
// jembatan dengan elemen yang bisa lihat dalam page 
const kartuKomentarTemplate = document.createElement("template");

// Elemen html dalam yang menggunakan style css yang hanya diperlukan dalam komponen tersebut
// Dan pemberian slot pada tag yang mempermudahkan menyisipkan data pada elemen container 
kartuKomentarTemplate.innerHTML = `
    <style>
        :host { 
            display: block; 
        }

        .comment-card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            padding: 15px;
            border: 3px solid var(--border);
            border-radius: var(--kartu-radius, 15px);
            color: var(--kartu-teks, #000);
            background: linear-gradient(154deg, var(--card-color_1) 0%, var(--card-color_2) 83%);
        }
        p {
            margin: 0;
            overflow-wrap: anywhere;
        }
        .comment-header {
            display: flex;
            flex-wrap: wrap;
            gap: 4px 12px;
            align-items: baseline;
        }
        .comment-actions {
            display: flex;
            flex-direction: row;
            gap: 10px;
        }
        button {
            padding: 8px 14px;
            border: 2px solid var(--border);
            border-radius: 10px;
            cursor: pointer;
        }
        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .like-comment { background-color: #42b0d4; }
        .edit-comment { background-color: #79d8f8; }
        .delete-comment { background-color: #f34040; color: white; }
    </style>
    <article class="comment-card">
                <div class="comment-header">
                    <strong>
                        <slot name="nama"> </slot>
                    </strong>
                    <small>
                    </small>
                </div>
                <p>
                    <slot name="pesan"></slot>
                </p>
                <div class="comment-actions">
                    <button type="button" class="like-comment" part="like-button"></button>
                    <button type="button" class="edit-comment">Edit</button>
                    <button type="button" class="delete-comment">Hapus</button>
                </div>
    </article>
`;

// Elemen ganti tema menggunakan custom komponen
class TombolTema extends HTMLElement {
    static get observedAttributes() {
        
    };

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    // Render hasil elemen untuk toggle tema
    render() {
        this.innerHTML = `
            <div class="toggle-content" id="toggle-theme">
                <div class="circle"></div>
            </div>
        `;
    }
}

// Elemen kartu komentar 
class KartuKomentar extends HTMLElement {
    static MAXLIKE = 10;  
    #like = 0;


    // Ketika sebuah objek dimuat maka hasil template html dan pasangan event 
    // listener sudah dipasang pada elemen button masing-masing
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(kartuKomentarTemplate.content.cloneNode(true));

        // Event listener menambahkan like dan menyimpan ke dalam localStorage
        this.shadowRoot.querySelector(".like-comment").addEventListener("click", () => {
            if (this.#like >= KartuKomentar.MAXLIKE) return;
            this.#like++;
            this.#updateLike();
            this.#simpanLike();
            this.#setEventDispatch("like-berubah", { id: this.dataset.id, jumlah: this.#like});
        });

        //  Event listener untuk mengedit nama dan isi sebuah komen
        this.shadowRoot.querySelector(".edit-comment").addEventListener("click", () => {
            this.#setEventDispatch("edit-komen", {
                id: this.dataset.id
            });
        });

        // Event listener untuk menghapus komen dari server maupun local storage
        this.shadowRoot.querySelector(".delete-comment").addEventListener("click", () => {
            this.#setEventDispatch("hapus-komen", {
                id: this.dataset.id
            });
        });

    }

    // pergantian elemen yang dilihat menjadi satu data saja yaitu waktu komen
    static get observedAttributes() {
        return ["waktu-komen"]
    };

    // Mengambil like dari komen id yang sudah ada 
    connectedCallback() {
        this.#muatLike();
        this.render();
    }

    // Menampilkan elemen sudah dihapus ketika sudah tidak ada dalam page
    disconnectedCallback() {
        console.log("Element have been removed from the page");
    }

    // Memanggil ketika sebuah perubahan pada objek tersebut
    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    setDisabled(nilai) {
        this.shadowRoot.querySelectorAll("button").forEach((b) => {
            b.disabled = nilai
        })
    }

    #setEventDispatch(namaEvent, detail) {
        this.dispatchEvent(new CustomEvent(namaEvent, {
                detail,
                bubbles: true
            }
        ));
    }

    // Mencoba apakah bisa mendapatkan like berdasarkan id tersebut ke objek elemen HTML
    #bacaSemuaLike() {
        try {
            return JSON.parse(localStorage.getItem("itemLike")) || {};
        } catch {
            return {};
        }
    }

    // Memuat like ke object elemen HTML
    #muatLike() {
        const smua = this.#bacaSemuaLike();
        this.#like = Number(smua[this.dataset.id]) || 0;
    }

    // function menyimpan like dalam local storage
    #simpanLike() {
        if (!this.dataset.id) return;
        const semua = this.#bacaSemuaLike();
        semua[this.dataset.id] = this.#like;
        localStorage.setItem("itemLike", JSON.stringify(semua));
    }

    // Function untuk mengupdate text like dalam page web
    #updateLike() {
        this.shadowRoot.querySelector(".like-comment").textContent = `(${this.#like}) Likes`
    }

    // Setiap render elemen tersebut maka menjalankan hasil bagian kode tersebut seperti pembaruan tanggal
    render() {
        const rootElemen = this.shadowRoot;
        const tanggal = new Date(this.getAttribute("waktu-komen"));
        rootElemen.querySelector("small").textContent = isNaN(tanggal)
            ? (this.getAttribute("waktu-komen") ?? "")
            : tanggal.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

        this.#updateLike();
    }
}

// Mengedefinisikan tag html buatan ke file html
customElements.define("kartu-komentar", KartuKomentar);
customElements.define("tombol-tema", TombolTema);