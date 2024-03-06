import {useQuery} from 'react-query';
import {getSurveys} from "@/apis/survey";

const useSurvey = () => {
    return useQuery('survey', async () => getSurveys());
}

export default useSurvey;
