'use client';

import Image from "next/image";
import nextLogo from "/public/next.svg";
import React, {useEffect, useState} from "react";
import {ElasticQuery, ElasticSurveyHit, Match} from "@/apis/types/survey_elastic";
import {getResultByQuery} from "@/apis/survey_elastic";
import {getSurveyById} from "@/apis/survey";
import useSurveyResponseState from "@/store/SurveyResponseState";
import PollForm from "@/app/survey/_survey-components/PollForm";
import {Question, Section} from "@/app/survey/_types/survey";

type SurveyResultFormProps = {
    id: string;
}

const refineData = (data: any): ElasticSurveyHit[] => {
    return data.hits.hits;
}

const makeQuery = (surveyId: string): ElasticQuery<Match> => {
    return { query: { match: { surveyId: surveyId } } };
}

const SurveyResultForm = (props: SurveyResultFormProps) => {

    const [ sections, setSections] = useState([]);
    const { survey, setSurvey } = useSurveyResponseState();

    const { id } = props;

    useEffect(() => {

        const query = makeQuery(id);

        Promise.all([
            getResultByQuery(query),
            getSurveyById(id)
        ]).then(([result, survey]) => {
            const sections: Section[]  = JSON.parse(survey.result.content);
            const refinedResult: ElasticSurveyHit[] = refineData(result);

            const mergedSections = sections.reduce((acc: any, section: Section) => {
                section.questions = section.questions.map((question: Question) => {
                    if(question.type === "FIVE-LIKERT" || question.type === "SINGLE_SELECTION" || question.type === "MULTIPLE_SELECTION" || question.type === "BOOLEAN") {
                        question.answers = question.answers.map((answer: any) => {
                            answer.count = refinedResult.filter((hit: ElasticSurveyHit) => hit._source.sections[section.id][question.id] === answer.value).length;
                            return answer;
                        });
                    } else if(question.type === "SHORT_ANSWER" || question.type === "LONG_ANSWER") {
                        question.answers = refinedResult
                            .filter((hit: any) => hit._source.sections[section.id][question.id] !== "" && hit._source.sections[section.id][question.id] !== null)
                            .map((hit: any) => {
                                const value = hit._source.sections[section.id][question.id];
                                return { value: value, label: value, count: 1 }
                        });

                        question.answers = question.answers.reduce((acc: any, answer: any) => {
                            const existing = acc.find((a: any) => a.value === answer.value);
                            if(existing) {
                                existing.count += 1;
                            } else {
                                acc.push(answer);
                            }
                            return acc;
                        }, []);

                    }

                    return question;
                });

                acc.push(section);
                return acc;
            }, []);

            setSections(mergedSections);
            setSurvey(survey);
        });
    }, [id, setSurvey]);

    return (
        <>
            <div className={"flex flex-col items-center"}>
                <Image src={nextLogo} alt={"넥스트 로고"}/>
                <p className={"py-4"}>{survey.title}</p>
                <div className={"flex flex-col gap-2"}>
                    {sections.map((section: Section, index: number) =>
                        <div className={"flex flex-col gap-4 p-2 border-4 border-amber-600"} key={index}>
                            <h1 className={"text-4xl"}>{section.title}</h1>
                            {section.questions
                                .map((question: any) =>
                                <PollForm key={question.id} question={question.question_text} answers={question.answers}></PollForm>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SurveyResultForm;