using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

public interface IVoteRepository : IGenericRepository<Vote>
{
    Task<List<Vote>> GetByPollIdAsync(int pollId);
    Task<List<Vote>> GetByUserIdAsync(string userId);
    Task<Vote> GetByUserAndPollAsync(string userId, int pollId);
}

public class VoteRepository : GenericRepository<Vote>, IVoteRepository
{
    private readonly AppDbContext _context;
    public VoteRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Vote>> GetByPollIdAsync(int pollId)
    {
        return await _context.Vote.Where(v => v.PollId == pollId).ToListAsync();
    }

    public async Task<List<Vote>> GetByUserIdAsync(string userId)
    {
        return await _context.Vote.Where(v => v.UserId == userId).ToListAsync();
    }

    public async Task<Vote> GetByUserAndPollAsync(string userId, int pollId)
    {
        return await _context.Vote.FirstOrDefaultAsync(v => v.UserId == userId && v.PollId == pollId);
    }
}