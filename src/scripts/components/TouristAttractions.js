export class TouristAttractions {
    constructor() {
        this.list = [
            {
                image: "./img/pao-de-acucar.png",
                name: "Pão de Açúcar",
                description:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },

            {
                image: "./img/cristo.png",
                name: "Cristo Redentor",
                description:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },

            {
                image: "./img/ilha-grande.png",
                name: "Ilha Grande",
                description:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },

            {
                image: "./img/paraty.png",
                name: "Centro Histórico de Paraty",
                description:
                    "Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.",
            },
        ];
        this.selectors();
        this.events();
        this.addSLick();
        this.render();
    }

    selectors() {
        this.inputFile = document.querySelector(".picture-input");
        this.pictureImage = document.querySelector(".picture-image");
        this.pictureImageText = "Imagem";
        this.titleText = document.querySelector(".title-input");
        this.descriptionText = document.querySelector(".description-input");
        this.form = document.querySelector(".tourist-form");
        this.items = document.querySelector(".card-items");
        this.pictureImage.innerHTML = this.pictureImageText;
    }

    events() {
        this.inputFile.addEventListener("change", this.showPicture.bind(this));
        this.form.addEventListener("submit", this.addItemForm.bind(this));
    }

    showPicture(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                const readerTarget = e.target;
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture-img");
                this.pictureImage.innerHTML = "";
                this.pictureImage.appendChild(img);
            });
            reader.readAsDataURL(file);
        } else {
            this.pictureImage.innerHTML = pictureImageText;
        }
    }

    addItemForm(event) {
        event.preventDefault();
        const itemName = event.target["title-input"].value;
        const itemDescription = event.target["desc-input"].value;
        const itemImage = this.pictureImage.children[0].src;
        const item = {
            name: itemName,
            description: itemDescription,
            image: itemImage,
        };

        this.list.push(item);
        this.render();
        this.reset();
    }

    render() {
        let itemsStructure = "";
        this.list.forEach((item) => {
            itemsStructure += `
            <li data-test="item-list"
            class="card">
                <figure>
                <img data-test="image-item-list"
                class="img-atr" src=${item.image}>
                </figure>
                <h3 data-test="title-item-list"
                class="name-atr">${item.name}</h3>
                <p data-test="description-item-list"
                class="desc-atr">${item.description}</p>
            </li>
      `;
        });

        this.removeSlick();
        this.items.innerHTML = itemsStructure;
        this.addSLick();
    }

    reset() {
        this.pictureImage.innerHTML = "Imagem";
        this.titleText.value = "";
        this.descriptionText.value = "";
    }

    addSLick() {
        if (window.innerWidth > 1024) {
            $(".card-items").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                Infinity: true,
                speed: 300,
                dots: true,
                arrrows: true,
                variableWidth: true,
            });
        }
    }

    removeSlick() {
        if (window.innerWidth > 1024) {
            $(".card-items").slick("unslick");
        }
    }
}
