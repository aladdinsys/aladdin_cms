'use client';

import React, {useCallback, useEffect, useState} from 'react';
import useSurveyStore from "@/store/SurveyState";
import SectionForm from "@/app/survey/_survey-components/SectionForm";
import {getCoord, getSurveyById, patchSurvey, postSurvey} from "@/apis/survey";
import {SurveyRequest} from "@/apis/types/survey";
import InputField from "@/components/molecule/InputField";
import Button from "@/components/atoms/Button";
import DaumPostcode from 'react-daum-postcode';
import MapComponent from "@/app/survey/_survey-components/Map";
import {useRouter} from "next/navigation";

const SurveyForm = () => {

    const router = useRouter();

    const { id, title, description, sections, center, setTitle, setDescription, setId, setSections, addSection, setCenter } = useSurveyStore();
    const [openPostcode, setOpenPostcode] = useState(true);

    const handleSubmit = async () => {
        const surveyRequest: SurveyRequest = {
            title: title,
            description: description,
            content: JSON.stringify(sections),
            center: center
        }

        try {
            let responseData: Response;

            if(id !== null) {
                responseData = await patchSurvey(id, surveyRequest);
            } else {
                responseData = await postSurvey(surveyRequest);
            }

            router.replace(`/survey/forms`);
            console.log(responseData);

        } catch (error) {

        }
    };

    const retrieveForm = useCallback(() => {
        if(id !== null) {
            getSurveyById(id).then((response) => {
                const {
                    title, description, center, content
                } = response.result;

                setTitle(title);
                setDescription(description);

                if(center && center.x !== 0 && center.y !== 0) {
                    setCenter(center);
                    setOpenPostcode(false);
                }

                setSections(JSON.parse(content));
            })
        }

    }, [id]);

    useEffect(() => {
        retrieveForm();
    }, [id, retrieveForm]);


    const handle = {
        selectAddress: async (data: any) => {

            const { roadAddress } = data;

            const response = await getCoord(roadAddress);
            const { result } = response;

            const { point } = JSON.parse(result).response.result;

            setCenter({
                x: Number(point.x),
                y: Number(point.y),
            });

            setOpenPostcode(false);
        },
    }

    if(!sections) return <div>Loading</div>;


    return (
        <div className="survey-form-container min-w-[33%] bg-white dark:bg-gray-100 border px-8 py-4">
            <InputField id={`title`} type={"text"} name={"title"} label={"타이틀"} className={"text-xl"} value={title} onChange={(event) =>{ setTitle(event.currentTarget.value); }} />
            <InputField id={`description`} type={"text"} name={"description"} label={"설명"} value={description} onChange={(event) => setDescription(event.currentTarget.value)}/>

            <div>
                {openPostcode &&
                    <div className={"p-2"}>
                        <p className={"block mb-2 font-bold"}> 주소지를 입력해주세요 </p>
                        <DaumPostcode
                            className={"border border-black"}
                            onComplete={handle.selectAddress}
                            autoClose={false}
                            defaultQuery='중앙로 1079 백석역 더리브스타일'
                        />
                    </div>
                }
                {!openPostcode &&
                    <MapComponent center={center}/>
                }

            </div>

            <div className={"sections-wrapper flex flex-col gap-4 py-2"}>
                {sections.map((section) => (
                    <SectionForm key={section.id} section={section}/>
                ))}
            </div>

            <div className={"button-wrapper flex flex-row justify-end gap-4"}>
                <Button onClick={addSection}>섹션 추가 하기</Button>
                <Button color={'gray'} onClick={handleSubmit}>제출 하기</Button>
            </div>
        </div>
    );
};

export default SurveyForm;
