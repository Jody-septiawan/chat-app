export default function MessageAuth({message}) {
    return (
        <>
            {
                message.text && (
                    message.isSuccess ? (
                        <div class="alert alert-success py-1" role="alert">
                            <small>{message.text}</small>
                        </div>
                    ):(
                        <div class="alert alert-danger py-1" role="alert">
                            <small>{message.text}</small>
                        </div>
                    )
                )
            }
        </>
    )
}
