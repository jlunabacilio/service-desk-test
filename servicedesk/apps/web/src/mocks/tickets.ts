import type { Ticket } from '@servicedesk/shared-types';

export const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Login page throws 500 on bad credentials',
    description: 'Users receive an HTTP 500 instead of a 401 when entering wrong password.',
    status: 'open',
    priority: 'high',
    createdAt: '2026-06-01T09:00:00Z',
    updatedAt: '2026-06-01T09:00:00Z',
    assigneeId: null,
    reporterId: 'user-42',
  },
  {
    id: '2',
    title: 'Export to CSV missing last column',
    description: 'The CSV export omits the "resolved date" column for closed tickets.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2026-06-03T14:30:00Z',
    updatedAt: '2026-06-10T08:15:00Z',
    assigneeId: 'user-7',
    reporterId: 'user-13',
  },
  {
    id: '3',
    title: 'Dark mode flickers on first load',
    description: 'Brief white flash visible before the dark theme is applied on page load.',
    status: 'open',
    priority: 'low',
    createdAt: '2026-06-05T11:00:00Z',
    updatedAt: '2026-06-05T11:00:00Z',
    assigneeId: null,
    reporterId: 'user-99',
  },
  {
    id: '4',
    title: 'Notification emails not sent after ticket update',
    description: 'Assignees stop receiving email notifications after the first status change.',
    status: 'resolved',
    priority: 'critical',
    createdAt: '2026-05-28T07:45:00Z',
    updatedAt: '2026-06-15T16:00:00Z',
    assigneeId: 'user-3',
    reporterId: 'user-21',
  },
];

export function findTicketById(id: string): Ticket | undefined {
  return MOCK_TICKETS.find((t) => t.id === id);
}
