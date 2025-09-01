using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Models;

public class User : IdentityUser
{
    public IEnumerable<Poll> CreatedPolls;
    public IEnumerable<Vote> Votes;
}