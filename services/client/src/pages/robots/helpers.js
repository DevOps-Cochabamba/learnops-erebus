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
