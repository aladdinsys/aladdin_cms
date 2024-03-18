import { create } from 'zustand';
import {SurveyResponse} from "@/apis/types/survey";

type SurveyResponseState = {
    survey: SurveyResponse;
    setSurvey: (survey: SurveyResponse) => void;
}

const useSurveyResponseState = create<SurveyResponseState>((set) => ({
    survey: {
        id: '',
        title: '',
        description: '',
        content: '',
        center: {
            x: 0,
            y: 0
        },
        publishId: '',
        owner: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
    },
    setSurvey: (survey: SurveyResponse) => set({ survey }),
}));

export default useSurveyResponseState;