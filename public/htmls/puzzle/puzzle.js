function onConfirmClicked() {
    let src = document.getElementById('input-pic-address').value;
    let rows = document.getElementById('input-rows').value;
    Puzzle.newPuzzle(src, rows, rows, height, height, false);
}

function onInitClicked() {
    Puzzle.newPuzzle(init_image_address, init_rows, init_rows, height, height, true)
}

let init_image_address = "https://s1.ax1x.com/2018/10/25/isght0.md.png";
let init_rows = 3;
const height = 350;

class Puzzle {

    static newPuzzle(src, rows, columns, width, height, isInit) {
        init_image_address = src;
        init_rows = rows;
        document.getElementById("puzzle").innerHTML = "";
        new Puzzle(src, rows, columns, width, height, isInit);
        document.getElementById("img-bg").setAttribute("src", src)
    }

    constructor(src, rows, columns, width, height, isInit) {
        this.src = src;
        // this.rows = rows;
        // this.columns = columns;
        this.width = width;
        this.height = height;
        this.tileWidth = width / columns;
        this.tileHeight = height / rows;

        // tile: 地砖 瓦片
        this.tiles = Array.from({length: rows * columns}).map((_, i) => {
            const x = i % columns;
            const y = Math.floor(i / columns);
            return {
                x, y,
                imageX: x,
                imageY: y,
                empty: false
            };
        });

        this.emptyTile = this.tiles[this.tiles.length - 1];
        this.emptyTile.empty = true;
        if (isInit) {
            this.initPuzzle();
        }
        this.createElements();
    }

    slideTile(tile) {
        const {emptyTile} = this;
        if (!Puzzle.areNearby(tile, emptyTile)) return;
        Puzzle.swapTiles(tile, emptyTile);
        this.updateTileElPosition(tile);
        this.updateTileElPosition(emptyTile);
    }

    // 交换
    static swapTiles(a, b) {
        const {x: ax, y: ay} = a;
        const {x: bx, y: by} = b;
        a.x = bx;
        a.y = by;
        b.x = ax;
        b.y = ay;
    }

    // 打乱
    initPuzzle() {
        const {emptyTile} = this;
        let last = null;
        const isValidTile = (tile) => tile !== last && tile !== emptyTile && Puzzle.areNearby(tile, emptyTile);

        for (let i = 0; i < 1000; i++) {
            const nextTile = last = randomTile(this.tiles.filter(isValidTile));
            Puzzle.swapTiles(emptyTile, nextTile);
        }
    }

    updateTileElPosition(tile) {
        const {tileWidth, tileHeight} = this;
        const {el, x, y} = tile;
        el.style.left = `${x * tileWidth}px`;
        el.style.top = `${y * tileHeight}px`;
    }

    static areNearby(tileA, tileB) {
        const {x: ax, y: ay} = tileA;
        const {x: bx, y: by} = tileB;
        return (tileA !== tileB) && ((ax === bx && (ay === by + 1 || ay === by - 1)) || (ay === by && (ax === bx + 1 || ax === bx - 1)))
    }

    createElements() {
        const tileEls = this.tiles.map((tile) => {
            const {imageX, imageY, empty} = tile;
            let tileEl = createEl("div", "tile");
            Object.assign(tileEl.style, {
                "width": `${this.tileWidth}px`,
                "height": `${this.tileHeight}px`,
                "background-image": `url(${this.src})`,
                "background-size": `${this.width}px ${this.height}px`,
                "background-position": `-${imageX * this.tileWidth}px -${imageY * this.tileHeight}px`,
            });
            if (empty) {
                tileEl.style.opacity = "0.05";
                tileEl.style.cursor = "default";
            }

            tileEl.onclick = this.slideTile.bind(this, tile);
            tile.el = tileEl;
            this.updateTileElPosition(tile);
            return tileEl;
        });

        const puzzleEl = document.getElementById("puzzle");

        Object.assign(puzzleEl.style, {
            width: `${this.width}px`,
            height: `${this.height}px`
        });

        tileEls.forEach((el) => puzzleEl.appendChild(el));
    }
}

function createEl(tag, classNames) {
    const el = document.createElement(tag);
    if (classNames.length) el.classList.add(classNames);
    return el;
}

function randomTile(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

Puzzle.newPuzzle(init_image_address, init_rows, init_rows, height, height);

$(document).ready(function () {
    $.adaptiveBackground.run();
});

$(".mat-input").focus(function () {
    $(this).parent().addClass("is-active is-completed");
});

$(".mat-input").focusout(function () {
    if ($(this).val() === "")
        $(this).parent().removeClass("is-completed");
    $(this).parent().removeClass("is-active");
});