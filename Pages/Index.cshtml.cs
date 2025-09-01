using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Models;
using Services;

public class IndexModel(PollService pollService, VoteService voteService, UserManager<User> userManager) : PageModel
{
    private readonly PollService _pollService = pollService;
    private readonly VoteService _voteService = voteService;
    private readonly UserManager<User> _userManager = userManager;

    public List<PollCardPartialModel> Polls = new List<PollCardPartialModel>();

    public async Task OnGetAsync()
    {
        User user = await _userManager.GetUserAsync(User);
        List<Poll> polls = (await _pollService.GetAllAsync()).Data;
        List<Vote>? votesFromUser = null;

        if (user != null)
        {
            votesFromUser = (await _voteService.GetByUserIdAsync(user.Id)).Data;
        }

        foreach (Poll poll in polls)
        {
            bool voted = votesFromUser == null ? false : votesFromUser.Any(v => v.PollId == poll.Id);
            Polls.Add(new PollCardPartialModel { Poll = poll, Voted = voted, LoggedIn = User.Identity.IsAuthenticated });
        }
    }
}
