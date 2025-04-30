import ProjectContent from './ProjectContent';

// This is a server component (no "use client" directive)
export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectContent id={params.id} />;
}