import { Form, Input, Modal, Select } from 'antd';
import type { Ticket, TicketPriority, TicketStatus } from '@servicedesk/shared-types';

/** Fields the user fills in; the rest are generated on submit. */
interface NewTicketFormValues {
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
}

interface NewTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ticket: Ticket) => void;
}

const PRIORITY_OPTIONS: { label: string; value: TicketPriority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

const STATUS_OPTIONS: { label: string; value: TicketStatus }[] = [
  { label: 'Open', value: 'open' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' },
];

export function NewTicketModal({ open, onClose, onSubmit }: NewTicketModalProps) {
  const [form] = Form.useForm<NewTicketFormValues>();

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        const now = new Date().toISOString();
        const ticket: Ticket = {
          id: crypto.randomUUID(),
          title: values.title,
          description: '',
          status: values.status,
          priority: values.priority,
          createdAt: now,
          updatedAt: now,
          assigneeId: null,
          reporterId: 'current-user',
        };
        onSubmit(ticket);
        form.resetFields();
      })
      .catch(() => {
        // validateFields rejects when there are validation errors;
        // Ant Design already displays inline messages, nothing else to do.
      });
  }

  function handleCancel() {
    form.resetFields();
    onClose();
  }

  return (
    <Modal
      title="New ticket"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      destroyOnClose
    >
      <Form<NewTicketFormValues>
        form={form}
        layout="vertical"
        initialValues={{ priority: 'medium', status: 'open' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: 'Title is required' },
            { max: 120, message: 'Title must be 120 characters or fewer' },
          ]}
        >
          <Input placeholder="Brief description of the issue" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Priority is required' }]}
        >
          <Select options={PRIORITY_OPTIONS} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Status is required' }]}
        >
          <Select options={STATUS_OPTIONS} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
