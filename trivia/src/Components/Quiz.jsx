import { useEffect, useState } from "react"





export default function Quiz() {

    const [loading, setLoading] = useState(true)
    const [quest, setQuest] = useState([])
    const [ansArray, setAnsArray] = useState([])
    const [totalScore, setTotalScore] = useState(0)
    const [showAns, setShowAns] = useState(false)
    const [showScore, setShowScore] = useState(false)
    const [reset, setReset] = useState(false)


    console.log(ansArray, totalScore)

    function handleClick(answer, index) {

        // if (answer[index] === quest[index].incorrect_answers) {

        // }

        console.log(answer[index])

        if (answer === quest[index].correct_answer) {
            if (ansArray[index] === answer) return
            const newAnsArray = ansArray
            newAnsArray[index] = answer
            setAnsArray(newAnsArray)
            setTotalScore(totalScore + 1)


        } else {

            if (ansArray[index] === quest[index].correct_answer) {
                console.log("kachi")
                setTotalScore(Math.max(0, totalScore - 1))
            }

            const newAnsArray = ansArray
            newAnsArray[index] = answer
            setAnsArray(newAnsArray)






        }
    }

    function handleButton() {

        setShowAns(!showAns)
        setShowScore(!showScore)

    }

    function resetGame() {
        console.log('hey')
        setReset(!reset)
        setShowAns(false)
    }


    useEffect(
        () => {


            setLoading(true)
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => {
                    const newArray = data.results.map((items) => {

                        const random = Math.floor(Math.random() * items.incorrect_answers.length)

                        items.incorrect_answers.splice(random, 0, items.correct_answer)

                        // console.log(items)
                        return items
                    })


                    setAnsArray(new Array(data.results.length).fill(""))
                    setQuest(newArray)
                    setLoading(false)
                    setShowScore(false)
                    setTotalScore(0)


                })
        },
        [reset]
    )


    return (
        <div>
            {
                loading ? (
                    <p>Loading ...</p>
                ) : (
                    <div className="container-test">
                        <div className="excellence"> </div>
                        <div className="test">
                            {
                                quest.map((questions, index) => (
                                    <div key={index} className="test2">
                                        <p className="questions">{questions.question}</p>

                                        <div className="test-3">
                                            {questions.incorrect_answers.map((answer, key) => (
                                                <span className={`${"test-5"} ${answer === ansArray[index] ? "select" : ""}  ${showAns && answer === questions.correct_answer ? "correct" : ""} ${showAns && answer === ansArray[index] && answer !== questions.correct_answer ? "wrong" : ""}`} key={key} onClick={() => { handleClick(answer, index) }}>
                                                    {answer}
                                                </span>
                                            ))
                                            }
                                        </div>

                                    </div>


                                ))


                            }
                            {showScore ? <div className="final">{totalScore} : Your Score  <span onClick={resetGame} className="reset">Play Again</span> </div> : <button className="test-button" onClick={handleButton}>Check Answers</button>}
                        </div>
                        <div className="good"></div>
                    </div>
                )
            }

        </div >
    )
}