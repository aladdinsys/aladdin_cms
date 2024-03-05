
import React from 'react';
import { useStore } from '@/store/SurveyState';
import {ConditionalQuestion} from "@/types/survey";

interface BooleanQuestionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const BooleanQuestion: React.FC<BooleanQuestionProps> = ({ sectionId, question }) => {
    const updateAnswer = useStore((state) => state.updateAnswer);

    const handleLabelChange = (answerIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateAnswer(sectionId, question.id, answerIndex, e.target.value);
    };

    return (
        <div>
            <label>{question.question_text}</label>
            {question.answers.map((option, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={option.label}
                        onChange={handleLabelChange(index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default BooleanQuestion;
