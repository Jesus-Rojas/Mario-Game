const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

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

const player = new Player()
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
}

function animate () {
  c.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  player.update()

  if (keys.right.pressed) {
    player.velocity.x = 5
  } else if (keys.left.pressed) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
  }
}
// player.draw()
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
      // player.velocity.x = 1
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
      // player.velocity.y -= 20
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
      // player.velocity.x = 0
      keys.right.pressed = false
      break;

    default:
      break;
  }
})