# README

# Note
Grabbed navbar from here:
https://v1.tailwindcss.com/components/navigation

Get Icons from here:
https://lucide.dev/icons/grip-vertical

# Commands

First, deploying with Kamal requires this command to not go boom:
```bash
bundle lock --add-platform aarch64-linux
```

Generated the admin controller
```bash
rails g controller admin index appearance analytics settings
```

```bash
bundle add devise
rails g devise:install
rails g devise user
```

# TODO
IFrame needs default size, looks ridiculous with no links.
Creating links should use Turbo because page reloads are cringe.
There's no way to set links to active, so that's a problem.
Toggle active for links

# ACCESIBILITY EVERYWHERE


# Sources
https://v1.tailwindcss.com/components/cards
https://tw-elements.com/docs/standard/forms/login-form/#
https://webcrunch.com/posts/svg-icons-with-ruby-on-rails
https://tailwindcss.com/docs/
Email Resend
https://resend.com/ 

# References
Fix login page (Courtesy of Chamir)
https://github.com/achaconm2001/linktree-ui-deanout/blob/main/src/app/login/page.tsx#L159