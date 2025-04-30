import ProjectContent from './ProjectContent';

// Define types based on Next.js documentation for dynamic route segment pages
type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

// The Next.js App Router page component
export default function Page({ params }: Props) {
  return <ProjectContent id={params.id} />;
} 