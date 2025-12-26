import ReactMarkdown from "react-markdown";
import MermaidDiagram from "./MermaidDiagram";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 mt-8 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3 mt-6">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-display font-medium text-foreground mb-2 mt-4">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-2 mb-4 ml-4">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary/50 before:rounded-full">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="text-foreground font-semibold">
            {children}
          </strong>
        ),
        code: ({ className, children }) => {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match ? match[1] : "";
          const codeContent = String(children).replace(/\n$/, "");

          if (lang === "mermaid") {
            return <MermaidDiagram chart={codeContent} />;
          }

          if (className) {
            return (
              <pre className="bg-secondary/50 rounded-lg p-4 overflow-x-auto my-4">
                <code className="text-sm text-foreground font-mono">
                  {children}
                </code>
              </pre>
            );
          }

          return (
            <code className="bg-secondary/50 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground my-4">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
