import React from 'react';
import useSurveyStore from "@/store/SurveyState";

interface NextSectionSelectorProps {
    sectionId: string;
    questionId: string;
    answerValue: string;
}

const NextSectionSelector: React.FC<NextSectionSelectorProps> = ({sectionId, questionId, answerValue}) => {

    const { sections, updateQuestionAnswer} = useSurveyStore();

    const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const currentSection = sections.find(section => section.id === sectionId);
        const currentQuestion = currentSection?.questions.find(q => q.id === questionId);

        if (!currentQuestion) {
            return;
        }

        const updatedAnswers = currentQuestion.answers.map(answer => {
            if (answer.value === answerValue) {
                return {...answer, nextSection: e.target.value};
            }
            return answer;
        });

        updateQuestionAnswer(sectionId, questionId, updatedAnswers);
    };

    const isValidSection = (sectionId: string) => sections.some(section => section.id === sectionId);

    const currentSection = sections.find(section => section.id === sectionId);
    const currentQuestion = currentSection?.questions.find(q => q.id === questionId);
    const currentAnswer = currentQuestion?.answers.find(a => a.value === answerValue);
    const currentNextSection = currentAnswer?.nextSection;
    const isNextSectionValid = currentNextSection && isValidSection(currentNextSection);

    return (
        <select
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-2"}
            value={isNextSectionValid ? currentNextSection : ""}
            onChange={(e) => handleSectionChange(e)}>
            <option value="">다음 섹션 선택</option>
            {sections.map((section, index) => (
                sectionId !== section.id && (
                    <option key={index} value={section.id}>
                        {`${section.id}섹션(${section.title})로 이동`}
                    </option>
                )
            ))}
        </select>
    );
};

export default NextSectionSelector;
