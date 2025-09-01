using Models;

namespace Services;

public interface IVoteService : IGenericService<Vote>
{
    Task<ServiceResponse<Vote>> DeleteByPollIdAsync(int pollId);
    Task<ServiceResponse<Vote>> DeleteByUserIdAsync(string userId);

    Task<ServiceResponse<List<Vote>>> GetByUserIdAsync(string userId);
    Task<ServiceResponse<Vote>> GetByUserAndPollAsync(string userId, int pollId);
}

public class VoteService(IVoteRepository voteRepository) : IVoteService
{
    private readonly IVoteRepository _voteRepository = voteRepository;

    public async Task<ServiceResponse<Vote>> CreateAsync(Vote vote) => new ServiceResponse<Vote> { Data = await _voteRepository.AddAsync(vote) };
    public async Task<ServiceResponse<Vote>> GetByIdAsync(int id) => new ServiceResponse<Vote> { Data = await _voteRepository.GetByIdAsync(id) };
    public async Task<ServiceResponse<List<Vote>>> GetAllAsync() => new ServiceResponse<List<Vote>> { Data = await _voteRepository.GetAllAsync() };
    public async Task<ServiceResponse<List<Vote>>> GetByUserIdAsync(string userId) => new ServiceResponse<List<Vote>> { Data = await _voteRepository.GetByUserIdAsync(userId) };
    public async Task<ServiceResponse<Vote>> GetByUserAndPollAsync(string userId, int pollId) => new ServiceResponse<Vote> { Data = await _voteRepository.GetByUserAndPollAsync(userId, pollId) };
    public async Task<ServiceResponse<Vote>> UpdateAsync(Vote vote) => new ServiceResponse<Vote> { Data = await _voteRepository.UpdateAsync(vote.Id, vote) };
    public async Task<ServiceResponse<Vote>> DeleteAsync(int id)
    {
        await _voteRepository.DeleteAsync(v => v.Id == id);
        return new ServiceResponse<Vote> { };
    }
    public async Task<ServiceResponse<Vote>> DeleteByPollIdAsync(int pollId)
    {
        await _voteRepository.DeleteAsync(v => v.PollId == pollId);
        return new ServiceResponse<Vote> { };
    }
    public async Task<ServiceResponse<Vote>> DeleteByUserIdAsync(string userId)
    {
        await _voteRepository.DeleteAsync(v => v.UserId == userId);
        return new ServiceResponse<Vote> { };
    }

    public async Task<ServiceResponse<Dictionary<int, int>>> GetVotesCountByPollIdAsync(int pollId)
    {
        List<Vote> votes = await _voteRepository.GetByPollIdAsync(pollId);
        Dictionary<int, int> votesByChoice = new Dictionary<int, int>();
        foreach (Vote vote in votes)
        {
            if (votesByChoice.ContainsKey(vote.ChoiceIndex))
                votesByChoice[vote.ChoiceIndex]++;
            else
                votesByChoice.Add(vote.ChoiceIndex, 1);
        }
        return new ServiceResponse<Dictionary<int, int>> { Data = votesByChoice };
    }
}
