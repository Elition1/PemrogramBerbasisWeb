"use strict";

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

    render() {
        this.innerHTML = `
            <div class="toggle-content" id="toggle-theme">
                <div class="circle"></div>
            </div>
        `;
    }
}

class KartuKomentar extends HTMLElement {
    static MAXLIKE = 10;  
    #like = 0;

    static get observedAttributes() {
        return ["namaKomentar", "isiKomen", "waktuKomen"]
    };

    connectedCallback() {
        this.#like = Number(this.getAttribute('like')) || 0;
        this.render();
    }

    disconnectedCallback() {
        console.log("Element have been removed from the page");
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    render() {
        this.innerHTML = `
            <article class="comment-card">
                <div class="comment-header"><strong></strong><small></small></div>
                <p></p>
                <div class="comment-actions">
                    <button type="button" class="like-comment"></button>
                    <button type="button" class="edit-comment">Edit</button>
                    <button type="button" class="delete-comment">Hapus</button>
                </div>
            </article>
        `;

        this.querySelector("article").dataset.id = this.dataset.id;
        this.querySelector("strong").textContent = this.getAttribute("namaKomentar") ?? "";
        this.querySelector("p").textContent = this.getAttribute("isiKomen") ?? "";

        const tanggal = new Date(this.getAttribute("waktuKomen"));
        this.querySelector("small").textContent = isNaN(tanggal)
            ? (this.getAttribute("waktuKomen") ?? "")
            : tanggal.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

        const tombolLike = this.querySelector(".like-comment");
        tombolLike.textContent = `(${this.#like}) Like`;
        tombolLike.addEventListener("click", () => {
            if(this.#like >= KartuKomentar.MAXLIKE) return;

            this.#like++;
            tombolLike.textContent = `(${this.#like}) Like`;
            this.dispatchEvent(new CustomEvent("like-berubah", {
                detail: { id: this.dataset.id, jumlah: this.#like },
                bubbles: true
            }));
        });
    }
}

customElements.define("kartu-komentar", KartuKomentar);
customElements.define("tombol-tema", TombolTema);