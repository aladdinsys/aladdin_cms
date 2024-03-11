import React, {ChangeEvent, FormEvent} from 'react';

import QuestionForm from "@/app/survey/forms/edit/QuestionForm";
import useSurveyStore from "@/store/SurveyState";
import {Section} from "@/app/survey/_types/survey";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";

interface SurveySectionProps {
    section: Section;
}

export default function SectionForm({section}: SurveySectionProps) {

    const {deleteSection, updateSectionTitle, updateSectionDescription, addQuestion} = useSurveyStore();

    const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
        updateSectionTitle(section.id, e.currentTarget.value);
    };

    const handleDescriptionChange = (e: FormEvent<HTMLInputElement>) => {
        updateSectionDescription(section.id, e.currentTarget.value);
    };

    const tempTitleName = generateUID();
    const tempDescName = generateUID();

    return (
        <div className="flex flex-col gap-2 p-2 border rounded-md border-black">
            <Input
                name={tempTitleName}
                type="text"
                defaultValue={section?.title}
                onChange={handleTitleChange}
                className={"text-2xl"}
                placeholder="섹션 제목을 입력해주세요."
            />
            <Input
                name={tempDescName}
                type="text"
                defaultValue={section?.description}
                onChange={handleDescriptionChange}
                className={"text-xl"}
                placeholder="섹션 설명을 입력해주세요."
            />

            {section.questions.map((question, index) => (
                <QuestionForm key={index} question={question} sectionId={section.id}/>
            ))}
            <Button color={"green"} onClick={() => addQuestion(section.id, 'FIVE-LIKERT')}>질문 추가 하기</Button>
            <Button onClick={() => deleteSection(section.id)}>섹션 삭제 하기</Button>
        </div>
    );
};