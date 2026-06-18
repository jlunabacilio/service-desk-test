import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Ticket, TicketPriority, TicketStatus } from '@servicedesk/shared-types';
import { MOCK_TICKETS } from '../mocks/tickets';
import { NewTicketModal } from '../components/NewTicketModal';

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
    width: 80,
    render: (id: string) => (
      <Link to="/tickets/$ticketId" params={{ ticketId: id }}>
        #{id.slice(0, 8)}
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
  const initialTickets = Route.useLoaderData();
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [modalOpen, setModalOpen] = useState(false);

  function handleNewTicket(ticket: Ticket) {
    // Optimistic insert: prepend to list immediately, no network round-trip needed yet.
    setTickets((prev) => [ticket, ...prev]);
    setModalOpen(false);
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          New ticket
        </Button>
      </div>

      <Table<Ticket>
        rowKey="id"
        columns={COLUMNS}
        dataSource={tickets}
        pagination={{ pageSize: 10 }}
      />

      <NewTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewTicket}
      />
    </>
  );
}
