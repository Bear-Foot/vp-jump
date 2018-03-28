```js
// x, y position for blocks start at the bottom left corner
// x, y position for blocks start at the bottom left corner
const levelFormat = {
  startPosition: { x: 0, y: 0 },
  wrappingBox: { width: 800, height: 600 },
  blocks: [{
    width: 100, height: 100, x: 200, y: 200,
  }],
  finishPoint: {
    radius: 20,
    x: 900,
    y: 900,
  },
  avatarSize: { width: 80, height: 160 },
  fps: 40,
  jumpForce: 1000,
  maxxSpeed: 400, // px/s
  horizontalAcceleration: 600, // px/s
  gravityForce: -1500,
  gameSpeed: 20,
}

```