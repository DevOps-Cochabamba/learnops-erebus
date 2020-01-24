import $ from 'jquery'
import _ from 'lodash'

export function toggleButtons(event) {
  event.persist()
  const more = $('#moreJoystickButtons')
  .slideToggle(() => {
    const className = more.is(":visible") ? 'up' : 'down'
    const icon = $(event.target).closest('.show.more').find('#showMore i.icon')
    icon[0].className = `angle double ${className} icon`
  })
}

export function buildActionObject(actions) {
  const data = {}
  const lines = actions.split('\n')

  _.forEach(lines, (line) => {
    const [key, value] = line.split('=')
    data[(key || "").toLowerCase()] = value
  })

  return data
}

export function showHelp(e, actions, t) {
  const data = buildActionObject(actions)
  console.log(data)

  const tour = {
    id: 'hello-hopscotch',

    steps: [
      {
        target: 'helpAction',
        title: t('pages.gamepad.main'),
        content: t('pages.gamepad.description'),
        placement: 'left'
      },
      {
        target: 'main-button-group-one-x',
        title: t('pages.gamepad.buttonX'),
        content: data.x,
        placement: 'top'
      },
      {
        target: 'main-button-group-one-y',
        title: t('pages.gamepad.buttonY'),
        content: data.y,
        placement: 'left'
      },
      {
        target: 'main-button-group-one-a',
        title: t('pages.gamepad.buttonA'),
        content: data.a,
        placement: 'left'
      },
      {
        target: 'main-button-group-one-b',
        title: t('pages.gamepad.buttonB'),
        content: data.b,
        placement: 'left'
      },
      {
        target: 'main-button-axis',
        title: t('pages.gamepad.axis'),
        content: data.axis,
        placement: 'right'
      },
      {
        target: 'showMore',
        title: t('pages.gamepad.extra'),
        content: data.extra,
        placement: 'left'
      }
    ]
  }

  window.hopscotch.startTour(tour, 0);
}

export function toggleVideoStream(event, stream) {
  event.persist()
  const $showStreamAction = $('#showStreamAction')
  $showStreamAction.toggleClass('active')

  if ($showStreamAction.hasClass('active')) {
    $('#expandStreamAction').show()
    $('#content').addClass('active')
    $('#content iframe').attr('src', stream)
  } else {
    $('#expandStreamAction').hide()
    $('#content').removeClass('active')
    $('#content iframe').attr('src', '')
  }
}

export function toggleExpandStream(event) {
  const $icon = $('#expandStreamAction').find('i.icon')
  if ($icon.hasClass('expand')) {
    $icon[0].className = 'compress icon'
    $('#content iframe').removeClass('compress')
  } else {
    $icon[0].className = 'expand icon'
    $('#content iframe').addClass('compress')
  }
}

export function gamepadButton(index, title, disabled, className) {
  return `<button title="${title}" ${disabled ? 'disabled="true"' : ''} class="erebus circular command ui real circular real huge button ${className}">${index}</button>`
}

export function updateGamepadButtons(gamepads, $container, action) {
  const html = _.map(gamepads, (pad, index) => {
    const exist = !!pad
    return gamepadButton(index, exist ? pad.id : 'N/A', !pad, '')
  }).join('')

  $container.html(html).find('button').click(event => {
    const $button = $(event.target)

    if ($button.hasClass('blue')) {
      $button.removeClass('blue')
      $('#moreJoystickButtons #selected').html('')
      action(null)
    } else {
      $('#gamepad-options button').removeClass('blue')
      $button.addClass('blue')
      $('#moreJoystickButtons #selected').html(event.target.title)
      action(event.target.title)
    }
  })
}
