
import React from 'react';
import {ConditionalQuestion} from "@/types/survey";

interface BooleanQuestionProps {
    question: ConditionalQuestion;
    updateQuestionAnswer: (newAnswers: any) => void;
}

const BooleanQuestion: React.FC<BooleanQuestionProps> = ({ question, updateQuestionAnswer }) => {
    const handleAnswerChange = (index: number, newValue: any) => {
        const newAnswers = [...question.answers];
        newAnswers[index] = {...newAnswers[index], value: newValue};
        updateQuestionAnswer(newAnswers);
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e) => handleAnswerChange(0, e.target.value)}
                placeholder="예"
            />
            <input
                type="text"
                onChange={(e) => handleAnswerChange(1, e.target.value)}
                placeholder="아니요"
            />
        </div>
    );
};

export default BooleanQuestion;
