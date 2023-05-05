// Copyright (c) ZeroC, Inc.

import mermaidAPI from 'mermaid';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type Props = {
  value: string;
};

const MermaidDiagram = (props: Props) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'default';
  const { value } = props;

  const [svg, setSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        await mermaidAPI.initialize({
          startOnLoad: false,
          theme: theme
        });
        const renderResult = await mermaidAPI.render('mermaid', value);
        setSvg(renderResult.svg);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setSvg('');
        setIsLoading(false);
      }
    };
    renderDiagram();
  }, [value, theme]);

  if (isLoading) {
    // TODO: Add a loading spinner
    return <div>Loading diagram...</div>;
  }

  return (
    <div
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
