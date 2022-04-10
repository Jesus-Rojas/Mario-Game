const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const gravity = 0.5
canvas.width = innerWidth
canvas.height = innerHeight

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
  constructor() {
    this.position = {
      x: 200,
      y: 250
    }
    this.width = 200
    this.height = 20
  }

  draw() {
    c.fillStyle = 'aqua'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player()
const platform = new Platform()
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  player.update()
  platform.draw()

  if (keys.right.pressed) {
    player.velocity.x = 5
  } else if (keys.left.pressed) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
  }

  // platform collision detecting
  if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x && 
      player.position.x  <= platform.position.x + platform.width
    ) {
    player.velocity.y = 0
  }
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