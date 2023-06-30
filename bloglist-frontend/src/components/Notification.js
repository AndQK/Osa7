import { useSelector } from 'react-redux/es/hooks/useSelector'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return null
  }
  return <div className={notification.name}>{notification.msg}</div>
}
Notification.displayName = 'Notification'

export default Notification
