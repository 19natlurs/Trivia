

export default function StartPage(props) {

    return (
        <div>
            <div className="container">
                <div className="square">
                    {/* <p>Buncha random text</p> */}
                </div>

                <div className="front-content">
                    <h3>Quizzical</h3>
                    <p> Test how smart you are</p>
                    <button onClick={props.toggle}> Start quiz</button>
                </div>

                <div className="circle">
                    {/* <p>buncha random text</p> */}
                </div>
            </div>

        </div>
    )
} 