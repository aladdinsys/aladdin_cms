type PollProgressProps = {
    key: number;
    color: string;
    label: string;
    total: number;
    count: number;
}

const calculatePercentage = (count: number, total: number): string =>  {
    if (total === 0) {
        return "Error: Denominator cannot be zero.";
    }
    const result = (count / total) * 100;
    return `${result.toFixed(2)}%`;
}

const PollProgress = ({color = "violet", label, total, count}: PollProgressProps) => {

    const progressStyleClass: string = `w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:bg-${color}-400 [&::-moz-progress-bar]:bg-${color}-400`;

    return (
        <div className={`flex flex-col gap-4 rounded-md bg-white p-2 border border-${color}-600`}>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div className={`w-6 h-6 rounded-full bg-transparent relative border-2 border-${color}-600`}>
                        <div className={`w-4 h-4 rounded-full bg-${color}-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
                    </div>
                    <span className="text">{label}</span>
                </div>
                <span className="percent">{calculatePercentage(count, total)}</span>
            </div>
            <progress
                className={progressStyleClass}
                value={count}
                max={total}
            ></progress>
        </div>
    )

}

export default PollProgress;