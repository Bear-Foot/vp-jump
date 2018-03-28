const rectangleOverlap = (r1, r2) => {
  if (r1.x > r2.x + r2.width || r2.x > r1.x + r1.width) {
    return false
  }
  if (r1.y > r2.y + r2.height || r2.y > r1.y + r1.height) {
    return false
  }
  return true
}

export const detectCollision = (block, player, dx, dy) => {
  if (rectangleOverlap(block, player)) {
    const newData = {
      ...player,
    }

    const xEdgePlayer = dx > 0 ? player.x + player.width : player.x
    if (xEdgePlayer > block.x && xEdgePlayer < block.x + block.width) {
      newData.vx = 0
      newData.x = dx > 0 ? block.x - player.width : block.x + block.width
    }

    const yEdgePlayer = dy > 0 ? player.y + player.height : player.y
    if (yEdgePlayer > block.y && yEdgePlayer < block.y + block.height) {
      newData.vy = 0
      newData.y = dy > 0 ? block.y - player.height : block.y + block.height + 1
    }

    return newData
  }
}
