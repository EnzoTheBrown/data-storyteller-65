import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    const renderChart = async () => {
      if (!chart || !containerRef.current) return;
      
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div 
      ref={containerRef}
      className="my-6 p-4 bg-secondary/30 rounded-lg overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
