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

    const distX = dx > 0 ?
      Math.abs((newData.x + newData.width) - block.x) :
      Math.abs(newData.x - (block.x + block.width))

    const distY = dy > 0 ?
      Math.abs((newData.y + newData.height) - block.y) :
      Math.abs(newData.y - (block.y + block.height))

    const timeX = Math.abs(distX / dx)
    const timeY = Math.abs(distY / dy)

    if (timeX < timeY) {
      if (dx > 0) {
        newData.x = block.x - newData.width
      } else {
        newData.x = block.x + block.width
      }
    } else if (dy > 0) {
      newData.y = block.y - newData.height
      newData.vy = 0
    } else {
      newData.y = block.y + block.height
      newData.vy = 0
    }
    return newData
  }
  return null
}
