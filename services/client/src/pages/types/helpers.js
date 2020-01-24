import $ from 'jquery'
import _ from 'lodash'

export function toggleForm(show) {
  const $form = $('.new.type.form')
  if (_.isNil(show)) {
    $form.slideToggle()
  } else {
    $form[show ? 'slideDown' : 'slideUp']()
  }
  return $form
}

export function buildItem({ name, displayName, icon }, groupName, size = 28) {
  return {
    text: displayName,
    value: `${groupName}.${name}`,
    image: { src: icon || `/assets/core/controls/${groupName}.${name}.svg`, width: size, height: size },
  }
}

export function buildItems({ name, displayName, modes }) {
  const group = { text: displayName, value: name, disabled: true }
  const modeItems = modes.map(mode => buildItem(mode, name))
  return [group, ...modeItems]
}

export function getDropdownItems(config) {
  return _.flatten(config.map(({ metadata }) => metadata).map(buildItems))
}
