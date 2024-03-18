import SurveyForm from "@/app/survey/_survey-components/SurveyForm";
import Link from "next/link";
export default function SurveyEdit() {
    return <div
                className={"flex flex-col py-4"}
            >
            <Link
                className={"block mb-4 bg-green-500 min-w-96 text-white rounded-md p-2 text-center w-1/6 mx-auto hover:bg-green-600 transition-colors duration-300 ease-in-out cursor-pointer"}
                href={"/survey/forms"}>목록으로</Link>
            <SurveyForm />
        </div>;
}
