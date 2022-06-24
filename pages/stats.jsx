import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getMoods } from "../utils";
import { useSelector } from "react-redux";
import Account from "../components/Account";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats() {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const uid = useSelector((state) => state.moods.uid);

    useEffect(() => {
        async function gMoods() {
            if (uid && !loaded) {
                const moods_ = await getMoods(uid);
                setLoaded(true);
                const moodsData = {
                    happy1: 0,
                    happy2: 0,
                    happy3: 0,
                    sad1: 0,
                    sad2: 0,
                    sad3: 0,
                    angry1: 0,
                    angry2: 0,
                    angry3: 0,
                };
                moods_.forEach((m) => {
                    moodsData[m.mood.toLowerCase()] = moodsData[
                        m.mood.toLowerCase()
                    ]
                        ? moodsData[m.mood.toLowerCase()] + 1
                        : 1;
                });
                console.log(moodsData);
                setData(moodsData);
            }
        }
        gMoods();
    });

    const chartData = {
        labels: [
            "Little Happy",
            "Happy",
            "Very Happy",
            "Little Sad",
            "Sad",
            "Very Sad",
            "Little Angry",
            "Angry",
            "Very Angry",
        ],
        datasets: [
            {
                label: "# of Votes",
                data: [
                    data.happy1,
                    data.happy2,
                    data.happy3,
                    data.sad1,
                    data.sad2,
                    data.sad3,
                    data.angry1,
                    data.angry2,
                    data.angry3,
                ],
                backgroundColor: [
                    "#6eff75",
                    "#46e84e",
                    "#24ad2b",
                    "#8bb8f0",
                    "#517bad",
                    "#2b5180",
                    "#ed6a64",
                    "#bd362f",
                    "#7d110b",
                ],
            },
        ],
    };

    return (
        <>
            {uid ? (
                <div className="stats">
                    <Account />
                    <div className="chart">
                        <Doughnut data={chartData} />
                    </div>
                </div>
            ) : (
                <Account />
            )}
        </>
    );
}
