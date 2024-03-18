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
        publishId: '',
        owner: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
    },
    setSurvey: (survey: SurveyResponse) => set({ survey }),
}));

export default useSurveyResponseState;