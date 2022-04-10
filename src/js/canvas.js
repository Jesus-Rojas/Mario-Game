import platformImage from '../img/platform.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const gravity = 0.5
canvas.width = 1024
canvas.height = 576

const image = new Image()
image.src = platformImage

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 1
    }
    this.width = 30
    this.height = 30
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
    // c.fillStyle = 'aqua'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player()
const platforms = [
  new Platform({
    x: -1,
    y: 470,
    image
  }),
  new Platform({
    x: image.width -3,
    y: 470,
    image
  }),
]

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
}

let scrollOffset = 0

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  platforms.forEach( platform => {
    platform.draw()
  })
  player.update()

  if (
    keys.right.pressed &&
    player.position.x < 400
  ) {
    player.velocity.x = 5
  } else if (
    keys.left.pressed &&
    player.position.x > 100
  ) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
    if (keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach( platform => {
        platform.position.x -= 5
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach( platform => {
        platform.position.x += 5
      })
    }
  }

  if (scrollOffset > 200) {
    // win
  }

  // platform collision detecting
  platforms.forEach( platform => {
    if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x && 
        player.position.x  <= platform.position.x + platform.width
      ) {
      player.velocity.y = 0
    }
  })
}
animate()

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 38:
      // up
      player.velocity.y -= 20
      break;

    case 40:
      // down
      break;

    case 37:
      // left
      keys.left.pressed = true
      break;
    case 39:
      // right
      keys.right.pressed = true
      break;

    default:
      break;
  }
})

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 38:
      // up
      break;

    case 40:
      // down
      break;

    case 37:
      // left
      keys.left.pressed = false
      break;
    case 39:
      // right
      keys.right.pressed = false
      break;

    default:
      break;
  }
})