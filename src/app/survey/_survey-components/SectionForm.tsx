import React, {ChangeEvent, FormEvent} from 'react';

import QuestionForm from "@/app/survey/_survey-components/QuestionForm";
import useSurveyStore from "@/store/SurveyState";
import {Section} from "@/app/survey/_types/survey";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import {generateUID} from "@/utils/uid";
import InputField from "@/components/molecule/InputField";

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
        <div className="flex flex-col py-2 border rounded-md border-black">
            <div className={"flex flex-col px-2"}>
                <InputField
                    name={tempTitleName}
                    type="text"
                    label={"섹션 제목"}
                    defaultValue={section?.title}
                    onChange={handleTitleChange}
                    placeholder="섹션 제목을 입력해주세요."
                />
                <InputField
                    name={tempDescName}
                    type="text"
                    label={"섹션 설명"}
                    defaultValue={section?.description}
                    onChange={handleDescriptionChange}
                    placeholder="섹션 설명을 입력해주세요."
                />
            </div>

            {section.questions.map((question, index) => (
                <QuestionForm key={index} question={question} sectionId={section.id}/>
            ))}
            <div
                className={"w-full mt-6 flex flex-col gap-2 justify-end px-4"}
            >
                <Button color={"green"} onClick={() => addQuestion(section.id, 'FIVE-LIKERT')}>질문 추가 하기</Button>
                <Button color={"reversed:red"} onClick={() => deleteSection(section.id)}>섹션 삭제 하기</Button>
            </div>
        </div>
    );
};