
type SurveyPageProps = {
    params: {
        id: number;
    }
}

export default function SurveyPage({params}: SurveyPageProps) {
    return (
        <div className={"h-screen flex"}>
            {params.id} 서베이 화면
        </div>
    );
}
