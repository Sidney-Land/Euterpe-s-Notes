# Music Sharing Social Media



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Development System Requirements

For working on our Next.js Frontend euterpes-notes:

1. Minimum Node.js version: 20.9+ (found here: https://nodejs.org/en/download)
2. Operating systems: macOS, Windows (including WSL, docs found here: https://learn.microsoft.com/en-us/windows/wsl/), and Linux.

## Clone Repository

To get this GitLab repo on your local machine, navigate to a folder you want to put the git repo in (we'll call it "folder_where_you_put_projects"), open some terminal in the "folder_where_you_put_projects" folder (Powershell, Command Prompt, Bash, etc. will work), and execute the following command:

```
git clone https://gitlab.com/cs-department-ecu/csci-4230-spring-2026/music-sharing-social-media/music-sharing-social-media.git
```

A pop-up may open from GitLab that asks you to authenticate, choose your preferred method (Web Browser, Token, or Password). Afterwards the command can access GitLab.

Doing this will create a subdirectory called "music-sharing-social-media" within the "folder_where_you_put_projects" directory. Inside of "music-sharing-social-media" you'll find the project like it is on GitLab and a hidden .git file. You can now contribute!

## Installing Node Dependencies

Because of our current GitIgnore policy, certain intermediate/compiled files and Node.js packages are prevented from being tracked by Git (See euterpes-notes/.gitignore for details). To install the needed dependencies for our Next.js frontend, execute the following command:

```
cd euterpes-notes
npm install
```

npm comes pre-intalled with Node.js, and running the above commands causes npm to search the euterpes-notes/package.json file for packages to install. It installs these packages into a new "node_modules" folder (at euterpes-notes/node_modules).

## Spinning up a Development Server

If you are performing manual frontend tests or if you just want to see what our web app looks like at any point, then execute the following commands:

```
cd euterpes-notes
npm run dev
```

Doing this will host the version of the website that is on your local machine, and it can be found at http://localhost:3000 by default. To stop the dev server, simply press 'Ctrl+C'.

## Switching Branches, Branching Out, and Finding Branches

To create the branches required for us to not code over each other, you have to make new branches. To do so, first navigate to an existing branch you want to split off from (for example, our default branch "main") using the following command (things enclosed in <> need to be replaced):

```
git checkout <name_of_parent_branch>
```

Then, create your new branch with the following command:

```
git checkout -b <name_of_new_child_branch>
```

Doing this will place you in the your new branch, where you can make changes by yourself.

If you want to see a list of the project's branches, use the following command:

```
git branch
```

## Getting Changes from Remote (GitLab)

You'll want to check if the branch you are working on has changed on GitLab, especially if you are working with someone else on the same branch. To do so, execute the following command regularly: 

```
git fetch
```

Doing this will download (AKA fetch) any changes made to your branch by other people onto your local machine.

## Adding your Changes to the Remote (GitLab)

After your first commit to a newly created branch you must use the following command to add the *branch* to GitLab:

```
git push -u origin <name_of_new_child_branch>
```

Here, "origin" is Git's shorthand for our GitLab repo's URL, and you are putting your branch "upstream" into it.

Afterwards, once you've made more commits, for them to be present on GitLab you jus need to execute the following command:

```
git push
```

Doing this will upload (AKA push) any changes committed on your local machine onto your current branch on GitLab.

## Merging your Completed Changes onto the Main Branch

Once you have an entire feature/task pushed onto your branch on GitLab (we'll call it "your_branch"), you want to place it in the "main" branch where our finished web app resides. To do so complete the following steps (things enclosed in <> need to be replaced):

1. Do some pre-merge checks to ensure both branches are up to date individually (pulling their GitLab content down to your local machine):
```
git checkout main    
git pull origin main  

git checkout <your_branch>   
git pull origin <your_branch>
```

Here, "origin" is Git's shorthand for our GitLab repo's URL.

2. Navigate to the main branch and perform the merge
```
git checkout main  
git merge <your_branch>
```

Doing so will prompt Git to compare the files in your_branch and the main branch, and will attempt to add files from your_branch onto main automatically. If any file is changed by both branches, there will be a merge conflict. If no merge conflict emerges, skip Step 3.

3. Resolving merge conflicts

First, open the file that is causing the conflict. Git will add dividers into the file where conflicts are and label which changes come from which branch. Remove the changes you don't want as well as the dividers, then use the following command:

```
git add <file_name>
```

Doing so tells Git that you resolved the conflict.

4. Commit and push the merged main branch

Now you have a version of the main branch with your_branch's feature in it, now commit it and push it to the main branch on GitLab with the following commands (just like you would any other change):

```
git commit -m "Merge branch <your_branch> into main"
git push
```

## ---Below is Default GitLab README Content that may be Useful Later---

## Add your files

* [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/cs-department-ecu/csci-4230-spring-2026/music-sharing-social-media/music-sharing-social-media.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.com/cs-department-ecu/csci-4230-spring-2026/music-sharing-social-media/music-sharing-social-media/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
* [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
