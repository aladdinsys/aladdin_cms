import React from 'react';
import {Question} from "@/app/survey/types/survey";

interface LongAnswerQuestionProps {
    question: Question;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({question}) => {

    return (
        <div>
            <input placeholder="서술형" readOnly={true}/>
        </div>
    );
};

export default LongAnswerQuestion;
