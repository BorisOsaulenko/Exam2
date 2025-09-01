using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Models;
using Services;

[Authorize(Roles = "Admin")]
public class CreatePollModel : PageModel
{
    private readonly PollService _pollService;
    private readonly VoteService _voteService;
    private readonly UserManager<User> _userManager;

    [BindProperty]
    public string Title { get; set; }

    [BindProperty]
    public string Description { get; set; }

    [BindProperty]
    public List<string> Options { get; set; } = new() { "", "" };

    [BindProperty]
    public IFormFile? Image { get; set; } = null;
    private string? ImagePath { get; set; }

    public string ErrorMessage { get; set; }

    public CreatePollModel(PollService pollService, VoteService voteService, UserManager<User> userManager)
    {
        _pollService = pollService;
        _voteService = voteService;
        _userManager = userManager;
    }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync()
    {
        Poll existingPoll = (await _pollService.GetByTitleAsync(Title)).Data;
        if (existingPoll != null)
        {
            ErrorMessage = "A poll with this title already exists.";
            return Page();
        }

        User user = await _userManager.GetUserAsync(User);

        if (Image != null && Image.Length > 0)
        {
            var fileName = Path.GetFileName(Image.FileName);
            var filePath = Path.Combine("wwwroot/uploads", fileName);
            using (var stream = System.IO.File.Create(filePath))
            {
                await Image.CopyToAsync(stream);
            }
            ImagePath = $"/uploads/{fileName}";
        }
        else
        {
            ErrorMessage = "Please upload an image.";
            return Page();
        }

        Poll poll = new()
        {
            Title = Title,
            Description = Description,
            Options = Options,
            CreatorId = user.Id,
            ImageUrl = ImagePath
        };
        await _pollService.CreateAsync(poll);
        return RedirectToPage("/Index");
    }
}