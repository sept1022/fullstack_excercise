
const Notification = ({ message, className }) =>  {
  console.log(className)
  if (message === null) return null
  console.log(message)
  return <div className={className}>{message}</div>
}

export default Notification;
