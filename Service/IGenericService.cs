namespace Services;

public interface IGenericService<T>
{
    Task<ServiceResponse<List<T>>> GetAllAsync();
    Task<ServiceResponse<T>> GetByIdAsync(int id);
    Task<ServiceResponse<T>> CreateAsync(T obj);
    Task<ServiceResponse<T>> UpdateAsync(T obj);
    Task<ServiceResponse<T>> DeleteAsync(int id);
}