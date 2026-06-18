import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage(): JSX.Element {
  return <h1>Service Desk</h1>;
}
