import React from 'react';

import useSurveyStore from "@/store/SurveyState";
import {Question, QuestionType} from "@/app/survey/_types/survey";
import {componentMap, questionTypeLabels} from "@/app/survey/_constants";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";
import {twMerge} from "tailwind-merge";

interface QuestionListProps {
    question: Question;
    sectionId: string;
}

const QuestionForm: React.FC<QuestionListProps> = ({question, sectionId}) => {
    const {deleteQuestion, updateQuestion, updateQuestionType} = useSurveyStore();

    const SpecificQuestionComponent = componentMap[question.type];
    const props = {
        question,
        ...(componentMap[question.type] && {sectionId})
    };

    const tempInputId = generateUID();
    const tempSelectId   = generateUID();

    return (
        <div
            className={twMerge(
                "question-wrapper",
                "flex flex-col gap-4 my-4 py-4"
            )}
        >
            <div className={"flex flex-row gap-2 px-2"}>
                <Input
                    type="text"
                    id={tempInputId}
                    name={tempInputId}
                    defaultValue={question.question_text}
                    onChange={(e) => updateQuestion(sectionId, question.id, e.currentTarget.value)}
                    placeholder="질문을 입력해주세요"
                />
                <Button color={"red"} onClick={() => deleteQuestion(sectionId, question.id)}>X</Button>
            </div>
            <div className={"px-2 flex flex-col gap-2"}>
                <select
                    value={question.type}
                    title={"survey"}
                    name={tempSelectId}
                    className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2 mb-4"}
                    onChange={(e) => updateQuestionType(sectionId, question.id, e.target.value as QuestionType)}
                >
                    {Object.entries(questionTypeLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                {SpecificQuestionComponent ? <SpecificQuestionComponent {...props} /> : null}
            </div>
        </div>
    );
};

export default QuestionForm;
