import React, {useEffect} from 'react';
import {ConditionalQuestion} from "@/types/survey";
import useSurveyStore from "@/store/SurveyState";
import NextSectionSelector from "@/app/surveys/NextSectionSelector";

interface BooleanQuestionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const BooleanQuestion: React.FC<BooleanQuestionProps> = ({sectionId, question}) => {
    const {updateQuestionAnswer} = useSurveyStore();

    useEffect(() => {
        if (!question.answers || question.answers.length !== 2) {
            const defaultAnswers = [
                {id: '1', value: '예', label: '예'},
                {id: '2', value: '아니요', label: '아니요'}
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

    return (
        <div>
            <div>
                {question.answers.map((answer, i) => (
                    <div key={i}>
                        <input
                            type="text"
                            value={answer.value}
                            onChange={(e) => handleAnswerChange(i, e.target.value)}
                        />
                        <NextSectionSelector sectionId={sectionId} questionId={question.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooleanQuestion;
