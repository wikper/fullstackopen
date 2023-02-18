const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationClass = type === 'error' ? 'error' : 'notification'

  return <div className={notificationClass}>{message}</div>
}

export default Notification
