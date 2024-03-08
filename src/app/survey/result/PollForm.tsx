import PollProgress from "@/app/survey/result/PollProgress";

type PollFormProps = {
    question: string;
    answers: any[];
}
const PollForm = ({question, answers}: PollFormProps) => {
    const total = answers.reduce((acc, answer) => acc + answer.count, 0);

    return (
        <div className={"border-2 border-violet-600 p-4"}>
            <div className="">
                <span className={""}>
                    {question}
                </span>
            </div>
            <div className="poll-area flex flex-col gap-4">
                {answers.map((answer, index) =>
                    <PollProgress key={index} label={answer.label ?? answer.value} total={total} count={answer.label ? answer.count: ''}></PollProgress>
                )}
            </div>
        </div>
    )
}

export default PollForm;


