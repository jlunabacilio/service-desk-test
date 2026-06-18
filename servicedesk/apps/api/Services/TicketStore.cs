using System.Collections.Concurrent;
using api.Models;

namespace api.Services;

// Registered as a singleton. All mutation goes through this class.
public class TicketStore
{
    private readonly ConcurrentDictionary<string, Ticket> _store;

    public TicketStore()
    {
        var seeds = BuildSeeds();
        _store = new ConcurrentDictionary<string, Ticket>(
            seeds.ToDictionary(t => t.Id));
    }

    public IReadOnlyList<Ticket> GetAll() =>
        _store.Values.OrderByDescending(t => t.CreatedAt).ToList();

    public Ticket? GetById(string id) =>
        _store.TryGetValue(id, out var ticket) ? ticket : null;

    public Ticket Add(Ticket ticket)
    {
        _store[ticket.Id] = ticket;
        return ticket;
    }

    // -----------------------------------------------------------------------

    private static IEnumerable<Ticket> BuildSeeds()
    {
        var now = DateTimeOffset.UtcNow;

        yield return new Ticket
        {
            Id = "seed-1",
            Title = "Login page throws 500 on bad credentials",
            Description = "Users receive an HTTP 500 instead of a 401 when entering wrong password.",
            Status = TicketStatus.Open,
            Priority = TicketPriority.High,
            CreatedAt = now.AddDays(-17),
            UpdatedAt = now.AddDays(-17),
            AssigneeId = null,
            ReporterId = "user-42"
        };

        yield return new Ticket
        {
            Id = "seed-2",
            Title = "Export to CSV missing last column",
            Description = "The CSV export omits the \"resolved date\" column for closed tickets.",
            Status = TicketStatus.InProgress,
            Priority = TicketPriority.Medium,
            CreatedAt = now.AddDays(-15),
            UpdatedAt = now.AddDays(-8),
            AssigneeId = "user-7",
            ReporterId = "user-13"
        };

        yield return new Ticket
        {
            Id = "seed-3",
            Title = "Dark mode flickers on first load",
            Description = "Brief white flash visible before the dark theme is applied on page load.",
            Status = TicketStatus.Open,
            Priority = TicketPriority.Low,
            CreatedAt = now.AddDays(-13),
            UpdatedAt = now.AddDays(-13),
            AssigneeId = null,
            ReporterId = "user-99"
        };

        yield return new Ticket
        {
            Id = "seed-4",
            Title = "Notification emails not sent after ticket update",
            Description = "Assignees stop receiving email notifications after the first status change.",
            Status = TicketStatus.Resolved,
            Priority = TicketPriority.Critical,
            CreatedAt = now.AddDays(-21),
            UpdatedAt = now.AddDays(-3),
            AssigneeId = "user-3",
            ReporterId = "user-21"
        };

        yield return new Ticket
        {
            Id = "seed-5",
            Title = "Search returns no results for accented characters",
            Description = "Queries with characters like 'é' or 'ñ' return empty results even when matches exist.",
            Status = TicketStatus.Open,
            Priority = TicketPriority.Medium,
            CreatedAt = now.AddDays(-5),
            UpdatedAt = now.AddDays(-5),
            AssigneeId = null,
            ReporterId = "user-55"
        };
    }
}
