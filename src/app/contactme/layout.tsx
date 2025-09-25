import React from "react";

type Props = { children: React.ReactNode };

export default function Layout(props: Props) {
    return (
        <div className="flex overflow-hidden min-h-screen">
            <div className="w-full">{props.children}</div>
        </div>
    );
}
