import React from 'react';
import {Question} from "@/app/survey/_types/survey";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";

interface LongAnswerQuestionProps {
    question: Question;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({question}) => {

    const tempInputId = generateUID();

    return (
        <>
            <Input
                name={tempInputId}
                type={"text"}
                className={"bg-transparent dark:bg-transparent border-b border-dotted"}
                placeholder="서술형"
                readOnly={true}
            />
        </>
    );
};

export default LongAnswerQuestion;
