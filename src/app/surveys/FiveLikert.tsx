import React from 'react';
import {ConditionalQuestion, Question} from "@/types/survey";

interface FiveLikertProps {
    question: ConditionalQuestion;
}

const FiveLikert: React.FC<FiveLikertProps> = ({ question }) => {
    return (
        <div>
            <label>{question.question_text}</label>
            {[...Array(5)].map((_, index) => (
                <label key={index}>
                    <input type="text" name="FIVE-LIKERT" value={index + 1} />
                </label>
            ))}
        </div>
    );
};

export default FiveLikert;
