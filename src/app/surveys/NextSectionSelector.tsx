
import React from 'react';
import useSurveyStore from "@/store/SurveyState";

interface NextSectionSelectorProps {
    sectionId: string;
    questionId: string;
    answerId: string;
}

const NextSectionSelector: React.FC<NextSectionSelectorProps> = ({ sectionId , questionId, answerId}) => {
    const { sections, updateQuestionAnswer } = useSurveyStore();

    const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAnswers = sections.map((section) => {
            if (section.id === answerId) {
                return { ...section, nextSection: e.target.value };
            }
            return section;
        });

        updateQuestionAnswer(sectionId, questionId, newAnswers);
    };

    return (
        <select onChange={(e) => handleSectionChange(e)}>
            <option value="">다음 섹션 선택</option>
            {sections.map((section, index) => (
                sectionId !== section.id && (
                    <option key={section.id} value={section.id}>
                        {`섹션 ${index+1} ${section.title} 로 이동`}
                    </option>
                )
            ))}
        </select>
    );
};

export default NextSectionSelector;
