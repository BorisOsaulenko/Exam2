namespace Services;

using Models;

public interface IPollService : IGenericService<Poll>
{
}

public class PollService(IPollRepository pollRepository) : IPollService
{
    private readonly IPollRepository _pollRepository = pollRepository;

    private string CheckPollParams(Poll poll)
    {
        if (poll.Options.Count < 2) return "Poll must have at least 2 options";
        if (poll.Options.Count > 10) return "Poll must have at most 10 options";

        if (poll.Options.Find(o => o.Length < 3) != null) return "Poll options must be at least 3 characters long";
        if (poll.Options.Find(o => o.Length > 100) != null) return "Poll options must be at most 100 characters long";

        if (poll.Title.Length < 5 || poll.Title.Length > 100) return "Poll title must be between 5 and 100 characters long";
        if (poll.Description.Length > 1000) return "Poll description must be at most 1000 characters long";

        return "";
    }

    public async Task<ServiceResponse<List<Poll>>> GetAllAsync() => new ServiceResponse<List<Poll>> { Data = await _pollRepository.GetAllAsync() };
    public async Task<ServiceResponse<Poll>> GetByIdAsync(int id) => new ServiceResponse<Poll> { Data = await _pollRepository.GetByIdAsync(id) };
    public async Task<ServiceResponse<Poll>> GetByTitleAsync(string title) => new ServiceResponse<Poll> { Data = await _pollRepository.GetPollByTitleAsync(title) };
    public async Task<ServiceResponse<Poll>> CreateAsync(Poll poll)
    {
        string error = CheckPollParams(poll);
        if (error != "") return new ServiceResponse<Poll> { Success = false, Error = error };

        Poll? existing = await _pollRepository.GetPollByTitleAsync(poll.Title);
        if (existing != null) return new ServiceResponse<Poll> { Success = false, Error = "Poll with this title already exists" };

        return new ServiceResponse<Poll> { Data = await _pollRepository.AddAsync(poll) };
    }
    public async Task<ServiceResponse<Poll>> UpdateAsync(Poll poll)
    {
        string error = CheckPollParams(poll);
        if (error != "") return new ServiceResponse<Poll> { Success = false, Error = error };

        Poll? existing = await _pollRepository.GetByIdAsync(poll.Id);
        if (existing == null) return new ServiceResponse<Poll> { Success = false, Error = "Poll with this id does not exist" };

        return new ServiceResponse<Poll> { Data = await _pollRepository.UpdateAsync(poll.Id, poll) };
    }
    public async Task<ServiceResponse<Poll>> DeleteAsync(int id) => new ServiceResponse<Poll> { };
}