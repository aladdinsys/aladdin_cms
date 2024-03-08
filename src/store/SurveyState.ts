import { create } from 'zustand';
import {SurveyResponse} from "@/apis/types/survey";

type SurveyState = {
    survey: SurveyResponse;
    setSurvey: (survey: SurveyResponse) => void;
}

const useSurveyState = create<SurveyState>((set) => ({
    survey: {
        id: 0,
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

export default useSurveyState;