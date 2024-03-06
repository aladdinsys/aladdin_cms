import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {ACCESS_TOKEN_COOKIE} from "@/constants/auth";

export async function GET() {

    const cookieStore = cookies();
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE);
    console.log('Token', token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/surveys`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    return NextResponse.json({data});
}