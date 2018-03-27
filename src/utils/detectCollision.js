const rectangleOverlap = (r1, r2) => {
  if (r1.x > r2.x + r2.width || r2.x > r1.x + r1.width) {
    return false
  }
  if (r1.y > r2.y + r2.height || r2.y > r1.y + r1.height) {
    return false
  }
  return true
}

export const detectCollision = (block, player, vx, vy)
  const collisions = []

  if (rectangleOverlap(block, player)) {
    const newData = {
      x: player.x,
      y: player.y,
      vx,
      vy,
    }
    // https://gamedev.stackexchange.com/questions/30619/how-to-determine-collision-direction-between-two-rectangles
    if (player.x > block.x && player.x < block.x + block.width) {
      // if the player goes right, the collisition comes from the right side of the player box
      collisions.push(vx > 0 ? 'right' : 'left')
    }
    if (player.y > block.y && player.y < block.y + block.height) {
      collisions.push(vy > 0 ? 'top' : 'bottom')
    }
    if (collisions.length === 1) {

    }
  }
  return {
    vx,
    vy,
    x,
    y,
  }
}
