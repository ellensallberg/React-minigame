import React, { useEffect, useState } from "react"
import Names from "./components/names"
import Countries from "./components/countries"

function API() {


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

        if (difference = 0) points = 10;
        else if (difference <= 5) points = 7;
        else if (difference <= 10) points = 5;

        setScore((prev) => prev + points);

        setResult({
            actualAge: currentRound.actualAge,
            difference,
            points
        });
    };


    return(
        <div>
            <h1>Match the age</h1>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
            />

            <button onClick={submitGuess}>Submit Guess</button>
            {result && (
                <div>
                    <h3>Results</h3>

                    <p>Actual age: {result.actualAge}</p>

                    <p>Difference: {result.difference}</p>

                    <p>Points earned: {result.points}</p>

                    <button onClick={loadRound}>
                    Next Round
                    </button>
                </div>
            )}
            {currentRound && (
            <>
            <h2>Name: {currentRound.name}</h2>
            <h3>Country: {currentRound.country}</h3>
            </>
            )}
        </div>
        
    )
}

export default API