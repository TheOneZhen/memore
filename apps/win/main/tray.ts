import { Menu, Tray, nativeImage } from 'electron'

export default function () {
  const tray = new Tray(nativeImage.createFromPath('/build/icon.png'))

  const trayContextMenu = Menu.buildFromTemplate([
    { label: 'openMainWindow', type: 'normal' },
  ])

  tray.setContextMenu(trayContextMenu)
  tray.setTitle('Memore')
  tray.setToolTip('Memore')
}
