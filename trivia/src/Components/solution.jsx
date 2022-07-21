import React, { useState } from "react"

export default function Quiz() {

    const [quests, setQuest] = useState([])
    const [loading, setLoading] = useState(true)
    const [ansArray, setAnsArray] = useState([])
    const [totalScore, setTotalScore] = useState(0)
    const [showAns, setShowAns] = useState(false)

    console.log(ansArray, totalScore)
    const handleAnswerClick = (answer, index) => {





        if (answer === quests[index].correct_answer) {
            if (ansArray[index]) return
            const newAnsArray = ansArray
            newAnsArray[index] = answer
            setAnsArray(newAnsArray)
            setTotalScore(totalScore + 1)
        } else {

            const newAnsArray = ansArray
            newAnsArray[index] = answer
            setAnsArray(newAnsArray)
            setTotalScore(Math.max(0, totalScore - 1))
        }
    }

    React.useEffect(
        () => {
            setLoading(true)
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => {
                    const newArray = data.results.map((item) => {
                        const randomIndex = Math.floor(Math.random() * item.incorrect_answers.length)
                        item.incorrect_answers.splice(randomIndex, 0, item.correct_answer)
                        console.log(item)

                        return item
                    })

                    setAnsArray(new Array(data.results.length).fill(""))
                    setQuest(newArray)
                    setLoading(false)
                })
        }, []
    )


    return (
        <div>
            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {
                            quests.map((question, index) => (
                                <div key={index}>
                                    <p >{question.question}</p>
                                    <div>
                                        {question.incorrect_answers.map((answer, key) => (
                                            <span key={key} className={`${showAns && answer === question.correct_answer ? "correct" : ""} ${showAns && answer === ansArray[index] && answer !== question.correct_answer ? "wrong" : ""}`} onClick={() => { handleAnswerClick(answer, index) }} > {answer}</span>
                                        ))}
                                    </div>

                                </div>

                            ))
                        }


                        <button onClick={() => { setShowAns(true) }}>Show</button>
                    </div>
                )
            }
        </div>
    )
}