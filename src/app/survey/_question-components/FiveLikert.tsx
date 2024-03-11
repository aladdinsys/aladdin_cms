import React, {useEffect} from 'react';

import useSurveyStore from "@/store/SurveyState";
import NextSectionSelector from "@/app/survey/_question-components/NextSectionSelector";
import {ConditionalQuestion} from "@/app/survey/_types/survey";
import {generateUID} from "@/utils/uid";
import Input from "@/components/atoms/Input";

interface FiveLikertQuestionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const FiveLikertQuestion: React.FC<FiveLikertQuestionProps> = ({sectionId, question}) => {
    const {updateQuestionAnswer} = useSurveyStore();

    useEffect(() => {
        if (!question.answers || question.answers.length !== 5) {
            const defaultAnswers = [
                {value: '1', label: '매우 동의', nextSection: ''},
                {value: '2', label: '동의', nextSection: ''},
                {value: '3', label: '중립', nextSection: ''},
                {value: '4', label: '비동의', nextSection: ''},
                {value: '5', label: '매우 비동의', nextSection: ''}
            ];

            updateQuestionAnswer(sectionId, question.id, defaultAnswers);
        }
    }, [sectionId, question, updateQuestionAnswer]);

    const handleAnswerChange = (index: number, newValue: string) => {
        const newAnswers = question.answers.map((answer, i) => {
            if (i === index) {
                return {...answer, value: newValue, label: newValue};
            }
            return answer;
        });

        updateQuestionAnswer(sectionId, question.id, newAnswers);
    };

    const tempInputId = generateUID();

    return (
        <div className={"flex flex-col gap-2"}>
            {question.answers.map((answer, index) => (
                <div key={index} className={"flex flex-row gap-2"}>
                    <Input
                        name={tempInputId}
                        type="text"
                        defaultValue={answer.label}
                        onChange={(e) => handleAnswerChange(index, e.currentTarget.value)}
                    />
                    <NextSectionSelector sectionId={sectionId} questionId={question.id} answerValue={answer.value}
                    />
                </div>
            ))}
        </div>
    );
};

export default FiveLikertQuestion;
