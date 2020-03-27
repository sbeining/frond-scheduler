export class Pokedex {
  constructor(selector) {
    this.selector = selector;
    this.initialize();
    $(this.selector).css('opacity', 0)
  }

  initialize() {
    $(this.selector)
      .addClass('closed')
      .append($('<div>').addClass('overlay'))
      .append($('<div>').addClass('mainscreen'))
      .append($('<div>').addClass('bottom_left'))
      .append($('<div>').addClass('top_right'))
      .append($('<div>').addClass('bottom_right').addClass('first'))
      .append($('<div>').addClass('bottom_right').addClass('second'))
  }

  show() {
    $(this.selector)
      .css('opacity', 1.0)
      .animateCss('rotateInUpLeft');
  }

  hide() {
    $(this.selector)
      .animateCss('rotateOutDownLeft')
      .then(
        $(this.selector).css('opacity', 0.0)
      )
  }

  close() {
    $(this.selector).removeClass('on');
    $(this.selector).removeClass('off');
    $(this.selector).addClass('closed');

    $(this.selector).empty();
    this.initialize();
  }

  open() {
    $(this.selector).removeClass('closed');
    $(this.selector).removeClass('on');
    $(this.selector).addClass('off');
  }

  on() {
    $(this.selector).removeClass('off');
    $(this.selector).removeClass('closed');
    $(this.selector).addClass('on');
  }

  display(pokemon) {
    this.close();

    this.show()

    $()
      .wait(1000)
      .then(() => {
        this.open();
      })

    $(`${this.selector} .mainscreen`).append(
      $('<img>').attr('src', pokemon.form.sprites.front_default)
    );

    $(`${this.selector} .top_right`).html(
      `${pokemon.species.names[2].name} - The ${pokemon.species.genera[2].genus}`
    )

    $(`${this.selector} .bottom_right.first`).addClass(pokemon.pokemon.types[0].type.name)
    if (pokemon.pokemon.types[1]) {
      $(`${this.selector} .bottom_right.second`).addClass(pokemon.pokemon.types[1].type.name)
    }
    // Populate with data

    $()
      .wait(1500)
      .then(() => {
        this.on();
      })

    $()
      .wait(6000)
      .then(() => {
        this.close()
        this.hide();
      })
  }
}
