import { Spacer } from '@danielpickett/components'
import './AppSample1.scss'

export const AppSample1 = () => {
  return (
    <div className="AppSample1">
      <div className="AppSample1__header">Super Cool App</div>
      <div className="AppSample1__body">
        <div className="AppSample1__greeting">Hi Daniel</div>
        <div className="AppSample1__greeting-subtext">Welcome back!</div>
        <Spacer />
        <div className="AppSample1__success">100% complete!</div>
      </div>
      <div className="AppSample1__toast">
        <span>Expires soon!</span>
        <div className="AppSample1__toast-button">Act now!</div>
      </div>
    </div>
  )
}
