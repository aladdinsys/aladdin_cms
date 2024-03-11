import {twMerge} from "tailwind-merge";

type PollProgressProps = {
    color?: string;
    label: string;
    total: number;
    count: number;
}

const calculatePercentage = (count: number, total: number): string =>  {
    if (total === 0) {
        throw new Error("분모는 0이 될 수 없습니다.");
    }
    const result = (count / total) * 100;
    return `${result.toFixed(2)}%`;
}

const borderColors: {[key: string]: string} = {
    primary: 'border-violet-600',
    red: 'border-red-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    violet: 'border-violet-600',
}

const bgColors: {[key: string]: string} = {
    primary: 'bg-violet-400',
    red: 'bg-red-400',
    blue: 'bg-blue-400',
    green: 'bg-green-400',
    violet: 'bg-violet-400',
}

const progressColors: {[key: string]: string} = {
    primary: '[&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400',
    red: '[&::-webkit-progress-value]:bg-red-400 [&::-moz-progress-bar]:bg-red-400',
    blue: '[&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-blue-400',
    green: '[&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400',
    violet: '[&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400',
}


const PollProgress = ({color = 'primary', label, total, count}: PollProgressProps) => {

    const progressStyleClass: string = `w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-200`;

    return (
        <div className={twMerge(
            `flex flex-col gap-4 rounded-md bg-white p-2 border`,
            borderColors[color],
            )}>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div className={twMerge(
                        `w-6 h-6 rounded-full bg-transparent relative border-2`,
                        borderColors[color],
                    )}>
                        <div className={twMerge(
                            `w-4 h-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`,
                            bgColors[color],
                        )}></div>
                    </div>
                    <p className="">{label}</p>
                </div>
                <span className="percent">{calculatePercentage(count, total)}</span>
            </div>
            <progress
                className={
                twMerge(
                    progressStyleClass,
                    progressColors[color],
                )}
                value={count}
                max={total}
            ></progress>
        </div>
    )

}

export default PollProgress;