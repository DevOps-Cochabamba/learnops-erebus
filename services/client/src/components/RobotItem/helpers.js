import $ from 'jquery'

export function toggleQrCode(_id) {
  $(`.qrcode.${_id}`).slideToggle()
}