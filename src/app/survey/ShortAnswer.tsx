import React from 'react';
import {Question} from "@/app/survey/types/survey";

interface ShortAnswerProps {
    question: Question;

}

const ShortAnswer: React.FC<ShortAnswerProps> = () => {
    return (
        <div>
            <input
                placeholder="단답형"
                readOnly={true}
            />
        </div>
    );
};

export default ShortAnswer;
