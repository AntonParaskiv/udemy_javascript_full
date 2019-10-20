const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat arcu vel venenatis euismod. Pellentesque scelerisque, purus et feugiat porta, risus orci vehicula velit, sit amet sagittis dolor mi eu nisl.";
class Options {
  constructor(height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }
  createDiv(text) {
    let div = document.createElement("div");
    div.textContent = text;
    div.style.cssText += `height:${this.height}px;`;
    div.style.cssText += `width:${this.width}px;`;
    div.style.cssText += `background-color:${this.bg};`;
    div.style.cssText += `font-size:${this.fontSize}px;`;
    div.style.cssText += `text-align:${this.textAlign};`;
    return div;
  }
}

let div = new Options(100, 200, "pink", 20, "right").createDiv(lorem);
document.body.appendChild(div);
