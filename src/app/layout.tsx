import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ChildrenProps} from "@/types";
import Nav from "@/components/templates/Nav";
import MainFooter from "@/components/templates/Footer";
import Contents from "@/components/templates/Contents";


export const metadata: Metadata = {
    title: "콘텐츠 관리 페이지",
    description: "aladdin sys admin page",
};


export default function RootLayout({children}: Readonly<ChildrenProps>) {
    return (
        <html lang={"ko"}>
            <body className={"relative m-0 p-0"}>
                <Nav/>
                <Contents>
                        {children}
                </Contents>
                <MainFooter/>
            </body>
        </html>
    );
}
