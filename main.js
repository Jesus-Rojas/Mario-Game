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
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }
}

const player = new Player()

function animate () {
  c.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  player.update()
}
// player.draw()
animate()

addEventListener('keydown', ({ keyCode }) => {
  console.log(keyCode)
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

      break;
    case 39:
      // right
      break;

    default:
      break;
  }
})