import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const msg = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!msg) return null

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification