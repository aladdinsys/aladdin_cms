import PollProgress from "@/app/survey/result/PollProgress";
import {twMerge} from "tailwind-merge";

type PollFormProps = {
    color?: string;
    question: string;
    answers: any[];
}
const PollForm = ({color = 'violet', question, answers}: PollFormProps) => {

    const total = answers.reduce((acc, answer) => acc + answer.count, 0);


    const colorClasses: {[key: string]: string} = {
        red: 'border-red-600',
        blue: 'border-blue-600',
        green: 'border-green-600',
        violet: 'border-violet-600',
    }

    return (
        <div className={twMerge(
        `flex flex-col gap-4 rounded-md bg-white p-2 border`,
            colorClasses[color]
        )}>
            <div className={"question-wrapper"}>
                <p className={"text-xl"}>
                    {question}
                </p>
            </div>
            <div className="poll-area flex flex-col gap-4">
                {answers.map((answer, index) =>
                    <PollProgress key={index} color={color} label={answer.label ?? answer.value} total={total} count={answer.label ? answer.count: ''}></PollProgress>
                )}
            </div>
        </div>
    )
}

export default PollForm;


