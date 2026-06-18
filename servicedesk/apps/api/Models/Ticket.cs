namespace api.Models;

// Mirrors the Ticket interface in libs/shared-types/src/lib/ticket.ts.
// Keep both in sync when adding fields.

public enum TicketStatus
{
    Open,
    InProgress,
    Resolved,
    Closed
}

public enum TicketPriority
{
    Low,
    Medium,
    High,
    Critical
}

public class Ticket
{
    public required string Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required TicketStatus Status { get; init; }
    public required TicketPriority Priority { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public required DateTimeOffset UpdatedAt { get; init; }
    public string? AssigneeId { get; init; }
    public required string ReporterId { get; init; }
}
