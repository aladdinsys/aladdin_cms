import React from 'react';
import {Question} from "@/app/survey/types/survey";

interface LongAnswerQuestionProps {
    question: Question;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({question}) => {

    return (
        <div>
            <textarea
                placeholder="서술형"
                readOnly={true}
                rows={4}
            />
        </div>
    );
};

export default LongAnswerQuestion;
