import SurveyForm from "@/app/survey/forms/edit/SurveyForm";

type SurveyEditProps = {
    searchParams: {
        id: string;
    },
}

export default function SurveyEdit(props: SurveyEditProps) {
    const { id } = props.searchParams;
    return <SurveyForm id={id} />;
}
