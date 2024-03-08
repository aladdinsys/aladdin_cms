import React from 'react';
import useSurveyStore from "@/store/SurveyState";
import SurveySection from "@/app/survey/SurveySection";
import {postSurvey} from "@/apis/survey";

const SurveyForm = ({surveyId}: { surveyId: number }) => {

    const {survey, addSection, setSurveyTitle, setSurveyDescription} = useSurveyStore();

    const handleSubmit = async () => {
        const content = JSON.stringify({contents: survey.contents});

        const surveyData = {
            title: survey.title,
            description: survey.description,
            content
        };

        try {
            let responseData;
            if (surveyId) {
                //responseData = await patchSurvey(surveyId, surveyData);
                responseData = await postSurvey(surveyData);
            }
            console.log('서버 응답:', responseData);
        } catch (error) {
            console.error('설문 저장 실패:', error);
        }
    };

    return (
        <div className="survey-form-container">
            <input
                type="text"
                placeholder="제목 없는 설문지"
                value={survey.title}
                onChange={(e) => setSurveyTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="설문지 설명(선택 사항)"
                value={survey.description}
                onChange={(e) => setSurveyDescription(e.target.value)}
            />
            {survey.contents.map((section, index) => (
                <SurveySection key={section.id} section={section}
                />
            ))}
            <button onClick={addSection}>섹션 추가하기</button>
            <button onClick={handleSubmit}>제출하기</button>
        </div>
    );
};

export default SurveyForm;
