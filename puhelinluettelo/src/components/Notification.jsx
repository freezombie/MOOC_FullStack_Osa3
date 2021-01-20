import './notification.css'

const Notification = ({ message, err }) => {
    if (message === '') {
        return null
    }
    return (       
        <div className={err ? "error" : "success"}>       
            {message}
        </div>
    )
}

export default Notification;