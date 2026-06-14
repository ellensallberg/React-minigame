import React, { useEffect, useState } from "react"
import Names from "./components/names"
import Countries from "./components/countries"

function API() {

    // fetch api data
    const getAge = async (name, countryCode) => {
        console.log("Fetching:", name, countryCode);
        const response = await fetch(
            `https://api.agify.io?name=${name}&country_id=${countryCode}`
        )

        return await response.json()
    }
    

    const [currentRound, setCurrentRound] = useState(null)
    const [guess, setGuess] = useState("")
    const [result, setResult] = useState(null)
    const [score, setScore] = useState(0)

    // load round
    const loadRound = async () => {
        const randomName =
        Names[Math.floor(Math.random() * Names.length)]

        const randomCountry =
        Countries[Math.floor(Math.random() * Countries.length)]
     
        const data = await getAge(
            randomName,
            randomCountry.code
        )

        setCurrentRound({
            name: randomName,
            country: randomCountry.name,
            actualAge: data.age
        })

        setResult(null)
        setGuess("")

        console.log("loadRound called");
    }

    useEffect(() => {
        loadRound()
    }, [])

    const submitGuess = () => {
        const difference = Math.abs(
            Number(guess) - currentRound.actualAge
        );

        let points = 1;
//FIX!!!
        if (difference === 0) points = 10;
        else if (difference <= 3) points = 8;
        else if (difference <= 6) points = 4;
        else if (difference <= 10) points = 2;
        else if (difference <= 15) points = 0;

        setScore((prev) => prev + points);

        setResult({
            actualAge: currentRound.actualAge,
            difference,
            points
        });
    };


    return(
        <div className="hero">
            {/* sidebar */}
            <div className="sidebar">
                <h1 className="gameTitle">Age stereotyping <span className="gameTitleSecond">(at work)</span></h1>
                <div className="scoreContainer">
                    <h2 className="scoreTitle">SCORE</h2>
                    <div className="scoreNumberContainer">
                        <p className="scoreNumber">{score}</p>
                    </div>
                </div>
            </div>

            <div className="game">
                {/* ID card */}
                <div className="idCard">
                    <img className="avatar" src="./src/assets/avatar.png" alt="" />
                    {/* Base card info */}
                    <div className="idCardInfo">
                        {currentRound && (
                        <div className="baseInfo">
                            <div className="infoSection">
                                <h2 className="infoTitle">Name</h2>
                                <p className="infoInfo">{currentRound.name}</p>
                            </div>

                            <div className="infoSection">
                                <h2 className="infoTitle">Nationality</h2>
                                <p className="infoInfo">{currentRound.country}</p>
                            </div>
                        </div>
                        )}

                        {/* guess input */}
                        <div className="infoSection">
                            <h4 className="infoTitle">Age</h4>
                            <input
                                className="guessInput"
                                placeholder="?"
                                type="number"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                            />
                        </div>
                        
                        {/* Results */}
                        {result && (
                            <div className="resultsContainer"> 
                                <div>
                                    <h4 className="resultsTitle">Accuracy</h4>

                                    <p className="resultsInfo">Actual age: {result.actualAge}</p>

                                    <p className="resultsInfo">Difference: {result.difference}</p>

                                    <p className="resultsInfo">Points earned: <span className="resultPoints"> +{result.points}</span></p>
                                </div>
                                <button onClick={loadRound} className="nextRoundBtn">Next Round</button>
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={submitGuess} className="submitBtn">SUBMIT IDENTIFICATION CARD</button>
            </div>
        </div>
        
    )
}

export default API