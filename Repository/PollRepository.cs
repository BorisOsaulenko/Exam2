using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

public interface IPollRepository : IGenericRepository<Poll>
{
    Task<Poll?> GetPollByTitleAsync(string title);
}

public class PollRepository : GenericRepository<Poll>, IPollRepository
{
    private readonly AppDbContext _context;
    public PollRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Poll?> GetPollByTitleAsync(string title) => await _context.Set<Poll>().FirstOrDefaultAsync(p => p.Title == title);
}