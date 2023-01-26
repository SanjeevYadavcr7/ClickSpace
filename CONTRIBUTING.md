# Contributing to ClickSpace

We'd love for you to contribute to our source code and to make ClickSpace even better than it is
today! Here are the guidelines we'd like you to follow:

- [Commit Message Guidelines](CONTRIBUTING.md#commit-message-guidelines)


## Commit Message Guidelines
As we know good commit messages are important as it leads to **more readable messages** that are easy to follow when looking through the **project history**.
But also,we can use the git commit messages to **generate the change log**.

### Follow Git Commit Message Conventions

```
<type>(<topic>): <Summary>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

No line of the commit message should be longer than 80 characters.  This allows the message to be easier to read on GitHub as well as various git tools.

#### Type

The of a commit message should be one of the following:

* **feat** - Adding new features (enhancements)
* **fix** - Fixing bugs
* **docs** - Documentation only changes
* **style** - Changes that do not affect the meaning of the code (white-space, formatting, etc)
* **refactor** - A code change that neither fixes a bug or adds a feature
* **perf** - Improving performance
* **test** - Adding, updating or removing tests
* **chore** - Changes to the build process or auxiliary tools and libraries such as documentation generation
* **demo** - Adding, removing or modifying demos
* **revert** - Reverting changes introduced by a previous commit

If it appears that you need to use more than 1 type you should generally:

* Consider breaking your commit into smaller commits
* Use the type that comes later in the list above

Commits should be written with the user in mind.  For example the `fix` type should only be used if the change fixes a problem for the user.

#### Topic

After the type there should be a pair of parenthesis containing a topic followed by a ":".  Examples topics:

* navbar
* footer
* etc...

This can be omitted if needed.

#### Summary

The summary contains a succinct description of the change:

* Don't capitalize first letter
* No dot (.) at the end

#### Body

The body should include the motivation for the change and contrast this with previous behavior.


### Example

```
feat(navbar): added collapsable navbar

docs(readme): updated readme

```