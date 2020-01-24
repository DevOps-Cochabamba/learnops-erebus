# Erebus - Client SDK 

```js
import erebus, { publish, subscribe } from 'erebus-sdk'
```

### Usage - Send Messages

```js
const message = {
  cmd: String('axis' | 'button'),
  selector: Number(> 0 && < 16),
  modifier: 111 | 000 / 'on' | 'off',
  values: [axis1, axis2, ...],
}
```

```js
const aliases = {
  'on': 0b111,
  'off': 0b000,
}

export function modifier(code) {
  return _.isString(code) ? aliases[code] : code
}
```

### Examples 

```js
const button_0_on = {
  cmd: 'button',
  selector: 0,
  modifier: modifier('on'),
}

const button_10_off = {
  cmd: 'button',
  selector: 10,
  modifier: modifier('off'),
}
```

```js
const [100, 50, 0] = normilize(0.99, 0, -0.99)

function axis(...values) {
  return _.map(values, normilize)
}
```

```js
const axis_0_on = {
  cmd: 'button',
  selector: 0,
  modifier: modifier('on'),
  values: axis(-0.87, -0.170)
}

const axis_1_off = {
  cmd: 'button',
  selector: 0,
  modifier: modifier('off'),
  values: axis(0.87, -0.170)
}
```

```js
import erebus, { publish, subscribe } from 'erebus-sdk'

const send = publish(client, protocol)
send(axis_0_on)
send(button_0_on)
```

### Usage - Subscribe to Messages

```js
import erebus, { publish, subscribe } from 'erebus-sdk'

observer(client, protocol).on('message', message => {
  console.log(message)
})
```
