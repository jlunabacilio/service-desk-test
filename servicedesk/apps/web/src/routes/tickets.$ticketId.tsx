import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Descriptions, Tag, Button, Result } from 'antd';
import type { TicketPriority, TicketStatus } from '@servicedesk/shared-types';
import { findTicketById } from '../mocks/tickets';

export const Route = createFileRoute('/tickets/$ticketId')({
  loader: ({ params }): ReturnType<typeof findTicketById> => {
    const ticket = findTicketById(params.ticketId);
    if (!ticket) throw notFound();
    return ticket;
  },
  notFoundComponent: () => (
    <Result
      status="404"
      title="Ticket not found"
      subTitle="The ticket you are looking for does not exist."
      extra={<Button type="primary"><Link to="/">Back to list</Link></Button>}
    />
  ),
  component: TicketDetailPage,
});

const STATUS_COLOR: Record<TicketStatus, string> = {
  'open': 'blue',
  'in-progress': 'orange',
  'resolved': 'green',
  'closed': 'default',
};

const PRIORITY_COLOR: Record<TicketPriority, string> = {
  'low': 'default',
  'medium': 'gold',
  'high': 'orange',
  'critical': 'red',
};

function TicketDetailPage() {
  const ticket = Route.useLoaderData();

  if (!ticket) return null;

  return (
    <>
      <Button style={{ marginBottom: 16 }}>
        <Link to="/">← Back to list</Link>
      </Button>
      <Descriptions
        title={`#${ticket.id} — ${ticket.title}`}
        bordered
        column={2}
      >
        <Descriptions.Item label="Status">
          <Tag color={STATUS_COLOR[ticket.status]}>{ticket.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Priority">
          <Tag color={PRIORITY_COLOR[ticket.priority]}>{ticket.priority}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Reporter">{ticket.reporterId}</Descriptions.Item>
        <Descriptions.Item label="Assignee">
          {ticket.assigneeId ?? '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Created">
          {new Date(ticket.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated">
          {new Date(ticket.updatedAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {ticket.description}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
