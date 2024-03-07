import React, { useState } from 'react';
import useSurveyStore from "@/store/SurveyState";
import { ConditionalQuestion } from "@/app/survey/types/survey";
import NextSectionSelector from "@/app/survey/NextSectionSelector";

interface SingleSelectionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const Selection: React.FC<SingleSelectionProps> = ({ sectionId, question }) => {
    const { updateQuestionAnswer } = useSurveyStore();
    const [answers, setAnswers] = useState([{ label: '', value: '' }]);

    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = answers.map((answer, i) =>
            i === index ? { ...answer, label: value, value: value } : answer
        );
        setAnswers(updatedAnswers);
    };

    const handleAddAnswer = () => {
        if (answers.length < 10) {
            setAnswers([...answers, { label: '', value: '' }]);
        } else {
            alert('최대 10개의 옵션만 추가할 수 있습니다.');
        }
    };

    const saveAnswers = () => {
        updateQuestionAnswer(sectionId, question.id, answers);
    };

    return (
        <div>
            {answers.map((answer, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={answer.label}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        onBlur={saveAnswers}
                    />
                    <NextSectionSelector sectionId={sectionId} questionId={question.id} answerValue={answer.value}/>
                </div>
            ))}
            <button onClick={handleAddAnswer}>답변 추가</button>
        </div>
    );
};

export default Selection;
