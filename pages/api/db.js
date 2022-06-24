import Cors from "cors";
import { getMoods, addMood, deleteMood, updateMood } from "../../firebase";

const whitelist = ["http://localhost:3000", "https://mood-rho.vercel.app", "https://mood.sebastianogirotto.me"];
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
    switch (req.method) {
        case "GET":
            const moods = await getMoods(req.query.uid);
            res.json(moods);
            break;
        case "POST":
            await addMood(req.body);
            res.send({success: true})
            break;
        case "DELETE":
            await deleteMood(req.query.id);
            res.send({success: true})
            break;
        case "PATCH":
            await updateMood(req.query.id, req.body);
            res.send({success: true})
            break;
        default:
            res.status(400).json({
                error: "Invalid action",
            });
            break;
    }
}

export default handler;
