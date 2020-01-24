import $ from 'jquery'

export function openDocs(event, _id, detail) {
  event.preventDefault()
  if (detail) {
    window.open(detail, '_blank')
  } else {
    toggleQrCode(_id)
  }
}

export function toggleQrCode(_id) {
  $(`.qrcode.${_id}`).slideToggle()
}

export function toggleActions(_id) {
  $(`.actions.${_id}`).slideToggle()
}
