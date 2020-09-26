import React from 'react'

const Notification = ({notification, setNotification}) => {
    const styles = {
        success: {
            color: 'green',
            background: 'lightgreen',
            fontSize: 20,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        },
        error: {
            color: 'red',
            background: 'pink',
            fontSize: 20,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
    }

    if (notification === null){
        return null
    }

    const duration = notification.hasOwnProperty('duration') ? notification.duration : 5000

    setTimeout(() => {
        setNotification(null)
    }, duration)
    return (
        <div style={styles[notification.status]}>
            {notification.message}
        </div>
    )
}

export default Notification
