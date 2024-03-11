import React from 'react';
import useSurveyStore from "@/store/SurveyState";
import {ConditionalQuestion} from "@/app/survey/_types/survey";
import NextSectionSelector from "@/app/survey/_question-components/NextSectionSelector";

interface SingleSelectionProps {
    sectionId: string;
    question: ConditionalQuestion;
}

const SingleSelection: React.FC<SingleSelectionProps> = ({sectionId, question}) => {
    const {updateQuestionAnswer} = useSurveyStore();


    const handleAnswerChange = (index: number, newValue: string) => {
        const updatedAnswers = question.answers.map((answer, i) => {
            if (i === index) {
                return {...answer, label: newValue};
            }
            return answer;
        });
        updateQuestionAnswer(sectionId, question.id, updatedAnswers);
    };

    const handleAddAnswer = () => {
        if (question.answers.length > 10) {
            alert('최대 10개의 옵션만 추가할 수 있습니다.');
            return;
        }
        const newAnswer = {
            label: '',
            value: (question.answers.length + 1).toString(),
            nextSection: ''
        };
        const newAnswers = [...question.answers, newAnswer];
        updateQuestionAnswer(sectionId, question.id, newAnswers);
    };

    const handleDeleteAnswer = (index: number) => {
        const filteredAnswers = question.answers.filter((_, i) => i !== index);
        const renumberedAnswers = filteredAnswers.map((answer, i) => ({
            ...answer,
            value: (i + 1).toString(),
        }));
        updateQuestionAnswer(sectionId, question.id, renumberedAnswers);
    };


    return (
        <div>
            {question.answers.map((answer, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={answer.label}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <NextSectionSelector sectionId={sectionId} questionId={question.id} answerValue={answer.value}/>
                    <button onClick={() => handleDeleteAnswer(index)}>답변 삭제</button>
                </div>
            ))}
            <button onClick={handleAddAnswer}>답변 추가</button>
        </div>
    );
};

export default SingleSelection;
