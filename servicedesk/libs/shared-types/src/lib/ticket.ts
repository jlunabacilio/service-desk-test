export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  assigneeId: string | null;
  reporterId: string;
}

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: TicketPriority;
  reporterId: string;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assigneeId?: string | null;
}
