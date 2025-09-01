using Microsoft.EntityFrameworkCore;

namespace Models;

public class Vote
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int PollId { get; set; }
    public int ChoiceIndex { get; set; }
    public bool IsAnonymous { get; set; }

    public User User { get; set; }
    public Poll Poll { get; set; }
}