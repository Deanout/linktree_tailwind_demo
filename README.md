# README

# Note
Grabbed navbar from here:
https://v1.tailwindcss.com/components/navigation

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