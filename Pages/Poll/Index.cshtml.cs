using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Models;
using Services;

public class PollModel : PageModel
{
    private readonly PollService _pollService;
    private readonly VoteService _voteService;
    private readonly UserManager<User> _userManager;

    public Poll Poll;
    public int? VotedFor;
    public List<int> VoteCounts;

    [BindProperty]
    public string SelectedOption { get; set; }

    public PollModel(PollService pollService, VoteService voteService, UserManager<User> userManager)
    {
        _pollService = pollService;
        _voteService = voteService;
        _userManager = userManager;
    }

    public async Task OnGetAsync(int? id)
    {
        if (!id.HasValue) NotFound();

        ServiceResponse<Poll> response = await _pollService.GetByIdAsync(id.Value);
        if (!response.Success) NotFound();
        Poll = response.Data;

        VoteCounts = new List<int>();

        Dictionary<int, int> voteCounts = (await _voteService.GetVotesCountByPollIdAsync(Poll.Id)).Data;
        foreach (string option in Poll.Options)
        {
            if (voteCounts.ContainsKey(Poll.Options.IndexOf(option)))
                VoteCounts.Add(voteCounts[Poll.Options.IndexOf(option)]);
            else VoteCounts.Add(0);
        }



        User? user = (await _userManager.GetUserAsync(User));
        if (user != null)
        {
            Vote? v = (await _voteService.GetByUserIdAsync(user.Id)).Data.Find(v => v.PollId == Poll.Id);
            if (v == null) VotedFor = null;
            else VotedFor = v.ChoiceIndex;
        }
    }

    private async Task<IActionResult> HandleVote(int? id, bool isAnonymous)
    {
        if (!id.HasValue)
        {
            NotFound();
            return RedirectToPage(new { id = id.Value });
        }
        if (SelectedOption == null)
        {
            return RedirectToPage(new { id = id.Value });
        }

        User? user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            NotFound();
            return RedirectToPage(new { id = id.Value });
        }

        Vote existingVote = (await _voteService.GetByUserAndPollAsync(user.Id, id.Value)).Data;
        if (existingVote != null)
        {
            await _voteService.DeleteAsync(existingVote.Id);

            if (int.Parse(SelectedOption) == existingVote.ChoiceIndex)
                return RedirectToPage(new { id = id.Value });
        }

        await _voteService.CreateAsync(new Vote
        {
            UserId = user.Id,
            PollId = id.Value,
            ChoiceIndex = int.Parse(SelectedOption),
            IsAnonymous = isAnonymous
        });

        return RedirectToPage(new { id = id.Value });
    }

    public async Task<IActionResult> OnPostVoteAsync(int? id)
    {
        return await HandleVote(id, false);
    }

    public async Task<IActionResult> OnPostVoteAnonymousAsync(int? id)
    {
        return await HandleVote(id, true);
    }
}