using System.Collections.ObjectModel;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

public interface IGenericRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    Task<T> GetByIdAsync(int id);
    Task<List<T>> FindAsync(Expression<Func<T, bool>> filter);
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(int id, T entity);
    Task DeleteAsync(Expression<Func<T, bool>> filter);
}

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly DbSet<T> _collection;
    private readonly AppDbContext _context;
    public GenericRepository(AppDbContext context)
    {
        _collection = context.Set<T>();
        _context = context;
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _collection.ToListAsync();
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _collection.FindAsync(id);
    }

    public async Task<List<T>> FindAsync(Expression<Func<T, bool>> filter)
    {
        return await _collection.Where(filter).ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _collection.AddAsync(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<T> UpdateAsync(int id, T entity)
    {
        var old = await GetByIdAsync(id);
        if (old == null)
            throw new KeyNotFoundException($"No {typeof(T).Name} found with id {id}");

        _context.Entry(old).CurrentValues.SetValues(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task DeleteAsync(Expression<Func<T, bool>> filter)
    {
        var itemsToDelete = await _collection.Where(filter).ToListAsync();
        _collection.RemoveRange(itemsToDelete);
        await _context.SaveChangesAsync();
    }
}