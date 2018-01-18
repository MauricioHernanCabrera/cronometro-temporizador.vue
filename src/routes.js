import Temporizador from './components/Temporizador'
import Cronometro from './components/Cronometro'
import Manual from './components/Manual'
// import RedesSociales from './components/RedesSociales'

const routes = [
  { path: '/', component: Temporizador, name: 'temporizador' },
  { path: '/cronometro', component: Cronometro, name: 'cronometro' },
  { path: '/manual', component: Manual, name: 'manual' }
  // { path: '/redes-sociales', component: RedesSociales, name: 'redes-sociales' }
]

export default routes
