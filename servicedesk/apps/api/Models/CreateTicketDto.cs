using System.ComponentModel.DataAnnotations;

namespace api.Models;

// Mirrors CreateTicketDto in libs/shared-types/src/lib/ticket.ts.

public class CreateTicketDto
{
    [Required]
    [StringLength(120, MinimumLength = 1)]
    public required string Title { get; init; }

    [StringLength(2000)]
    public string Description { get; init; } = string.Empty;

    [Required]
    public TicketPriority Priority { get; init; }

    [Required]
    public required string ReporterId { get; init; }
}
