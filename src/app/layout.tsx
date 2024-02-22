import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ChildrenProps} from "@/types";
import MainHeader from "@/components/Header";
import Nav from "@/components/Nav";
import MainFooter from "@/components/Footer";


export const metadata: Metadata = {
    title: "관리자 페이지",
    description: "aladdin sys admin page",
};


export default function RootLayout({children}: Readonly<ChildrenProps>) {
    return (
        <html>
        <body className={`h-screen flex flex-col`}>
        <MainHeader/>
        <Nav/>
        <div className={`h-full p-2`}>
            {children}
        </div>
        <MainFooter/>
        </body>
        </html>
    );
}
