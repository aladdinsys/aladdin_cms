import React, {useEffect} from 'react';

import useSurveyStore from "@/store/SurveyState";
import NextSectionSelector from "@/app/survey/_survey-components/question-components/NextSectionSelector";
import {ConditionalQuestion} from "@/app/survey/_types/survey";
import Input from "@/components/atoms/Input";

interface BooleanQuestionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const BooleanQuestion: React.FC<BooleanQuestionProps> = ({sectionId, question}) => {
    const {updateQuestionAnswer} = useSurveyStore();

    useEffect(() => {
        if (!question.answers || question.answers.length !== 2) {
            const defaultAnswers = [
                {value: true, label: '예', nextSection: ''},
                {value: false, label: '아니요', nextSection: ''}
            ];
            updateQuestionAnswer(sectionId, question.id, defaultAnswers);
        }
    }, [sectionId, question, updateQuestionAnswer]);

    const handleAnswerChange = (index: number, newValue: string) => {
        const newAnswers = question.answers.map((answer, i) => {
            if (i === index) {
                return {...answer, label: newValue};
            }
            return answer;
        });
        updateQuestionAnswer(sectionId, question.id, newAnswers);
    };

    return (
        <>
            {question.answers.map((answer, i) => (
                <div key={i} className={"flex flex-row gap-2"}>
                    <Input
                        type="text"
                        name={answer.name}
                        defaultValue={answer.label}
                        onChange={(e) => handleAnswerChange(i, e.currentTarget.value)}
                    />
                    <NextSectionSelector sectionId={sectionId} questionId={question.id} answerValue={answer.value}/>
                </div>
            ))}
        </>
    );
};

export default BooleanQuestion;
