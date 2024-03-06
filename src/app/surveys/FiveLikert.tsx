import React, { useEffect } from 'react';
import {ConditionalQuestion, Section} from "@/types/survey";
import useSurveyStore from "@/store/SurveyState";

interface FiveLikertQuestionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const FiveLikertQuestion: React.FC<FiveLikertQuestionProps> = ({ sectionId, question}) => {
    const { updateQuestionAnswer } = useSurveyStore();

    useEffect(() => {
        if (!question.answers || question.answers.length !== 5) {
            const defaultAnswers = [
                { id: '1', value: '매우 동의', label: '매우 동의' },
                { id: '2', value: '동의', label: '동의' },
                { id: '3', value: '중립', label: '중립' },
                { id: '4', value: '비동의', label: '비동의' },
                { id: '5', value: '매우 비동의', label: '매우 비동의' }
            ];

            updateQuestionAnswer(sectionId, question.id, defaultAnswers);
        }
    }, [sectionId, question, updateQuestionAnswer]);

    const handleAnswerChange = (index: number, newValue: string) => {
        const newAnswers = question.answers.map((answer, i) => {
            if (i === index) { return { ...answer, value: newValue, label: newValue };}
            return answer;
        });

        updateQuestionAnswer(sectionId, question.id, newAnswers);
    };

    return (
        <div>
            {question.answers.map((answer, i) => (
                <input
                    key={i}
                    type="text"
                    value={answer.value}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                />
            ))}
        </div>
    );
};

export default FiveLikertQuestion;
