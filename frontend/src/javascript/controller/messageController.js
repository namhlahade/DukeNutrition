

const Alert = ({ message, type }) => {
    return <div className={`alert alert-${type}`}>{message}</div>;
}

const error = (error) => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
}