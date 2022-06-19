import Cors from "cors";
import { getMoods, addMood, deleteMood } from "../../firebase";

const whitelist = ["http://localhost:3000", "https://mood-rho.vercel.app"];
const cors = Cors({
    methods: ["GET", "HEAD"],
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

async function handler(req, res) {
    await runMiddleware(req, res, cors);
    console.log(req.method);
    switch (req.method) {
        case "GET":
            const moods = await getMoods(req.query.uid);
            res.json(moods);
            break;
        case "POST":
            await addMood(req.body);
            res.send({added: true})
            break;
        case "DELETE":
            await deleteMood(req.query.id);
            res.send({added: true})
            break;
        default:
            console.log('iasjoiasdj')
            res.status(400).json({
                error: "Invalid action",
            });
            break;
    }
}

export default handler;
