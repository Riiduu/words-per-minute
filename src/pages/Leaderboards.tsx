import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from '../../firebase.ts';
import { useEffect, useState } from "react";

const Leaderboards = () => {

    const [data, setData] = useState<any[]>([]);

    const getTheFuckingData = async () => {
        const querySnapshot = await getDocs(collection(db, "leaderboards"));
        const fetchedData: any[] = [];
        querySnapshot.forEach((doc) => {
            fetchedData.push(doc.data()); // Collect the data into an array
        });

        // Sort the fetched data by score in descending order
        const sortedData = fetchedData.sort((a, b) => b.score - a.score);

        // Update state with sorted data
        setData(sortedData);
    }

    useEffect(() => {
        getTheFuckingData();
    }, [])


    const navigate = useNavigate();


    const ScoreComponent = ({ names, scores }: { names: string; scores: any }) => {
        return (
            <div className="flex flex-row w-60 justify-between p-2 border-b border-gray-700">
                <div>
                    <h1>{names}</h1>
                </div>
                <div>
                    <h1>{scores}</h1>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-gray-900 h-screen w-screen px-10 py-20 justify-center items-center text-white flex flex-col relative">
                <div className="w-screen absolute h-10 flex text-center justify-center items-center bg-yellow-300 cursor-pointer top-0">
                    <h1 className="m-auto hover:underline cursor-pointer text-black" onClick={() => navigate('/')}>Back to Game ⌨️</h1>
                </div>
                <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
                <div>
                    {
                        data.map((entry, index) => {
                            return <ScoreComponent
                                names={entry.username}
                                scores={entry.score}
                                key={index}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default Leaderboards;
