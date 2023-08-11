// Copyright (c) ZeroC, Inc.

type HomeTitleProps = {
    title: string;
    description: string;
};

export const HomeTitle = ({ title, description }: HomeTitleProps) => (
    <>
        <p className="my-0">{description}</p>
        <h2 className="mt-0">{title}</h2>
    </>
)