import { create } from 'zustand';
import {SurveyResponse} from "@/apis/types/survey";

type SurveyState = {
    survey: SurveyResponse[];
    setSurvey: (survey: SurveyResponse[]) => void;
}

const useSurveyState = create<SurveyState>((set) => ({
    survey: [],
    setSurvey: (survey: SurveyResponse[]) => set({ survey }),
}));

export default useSurveyState;