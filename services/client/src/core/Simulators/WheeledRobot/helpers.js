import $ from 'jquery'

export function toggleButtons(event) {
  event.persist()
  const more = $('#moreSimulatorButtons')
  .slideToggle(() => {
    const className = more.is(":visible") ? 'up' : 'down'
    const icon = $(event.target).closest('.show.more').find('i.icon')
    icon[0].className = `angle double ${className} icon`
  })
}