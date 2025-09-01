using System.ComponentModel.DataAnnotations;

namespace Models;

public class Poll
{
    [Key]
    public int Id { get; set; }  // primary key
    public string CreatorId { get; set; } // foreign key

    public string ImageUrl { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    // EF doesn't map List<string> well; use a separate entity or JSON conversion
    public List<string> Options { get; set; }

    public User Creator { get; set; }

    public IEnumerable<Vote> Votes { get; set; }
}