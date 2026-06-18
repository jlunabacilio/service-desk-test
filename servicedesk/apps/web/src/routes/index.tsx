import { createFileRoute, Link } from '@tanstack/react-router';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Ticket, TicketPriority, TicketStatus } from '@servicedesk/shared-types';
import { MOCK_TICKETS } from '../mocks/tickets';

export const Route = createFileRoute('/')({
  loader: (): Ticket[] => MOCK_TICKETS,
  component: TicketListPage,
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

const COLUMNS: ColumnsType<Ticket> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
    render: (id: string) => (
      <Link to="/tickets/$ticketId" params={{ ticketId: id }}>
        #{id}
      </Link>
    ),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    render: (title: string, record) => (
      <Link to="/tickets/$ticketId" params={{ ticketId: record.id }}>
        {title}
      </Link>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 120,
    render: (status: TicketStatus) => (
      <Tag color={STATUS_COLOR[status]}>{status}</Tag>
    ),
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    width: 100,
    render: (priority: TicketPriority) => (
      <Tag color={PRIORITY_COLOR[priority]}>{priority}</Tag>
    ),
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    width: 180,
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

function TicketListPage() {
  const tickets = Route.useLoaderData();

  return (
    <Table<Ticket>
      rowKey="id"
      columns={COLUMNS}
      dataSource={tickets}
      pagination={{ pageSize: 10 }}
    />
  );
}
