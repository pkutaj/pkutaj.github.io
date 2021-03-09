## usecase
The aim of this reference📚 is to describe currently used convention for git commit messages.

<!-- TOC -->

- [1. syntax/example](#1-syntaxexample)
- [2. types](#2-types)
- [3. sources](#3-sources)

<!-- /TOC -->

d### 1. commit subject
* imperative
* max 50 chars
* not end with period
* using conventional commits

### 1. syntax/example

```
<type>[optional scope]: message
feat(statefile): map section id with section name
```

### 2. types

NR | TYPE       | COMMENT
---|------------|----------------------------------------------------------------------------------------------
1  | `feat`     | Patches a bug in your codebase (this correlates with PATCH in semantic versioning).
2  | `fix`      | Introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
3  | `style`    | Feature and updates related to styling
4  | `refactor` | Clear
5  | `test`     | Clear
6  | `docs`     | Clear
7  | `chore`    | regular code maintenance

### 3. sources
* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
* [Commit Message Naming · Naming Convention](https://namingconvention.org/git/commit-message-naming.html)
* [How to Write Good Commit Messages: A Practical Git Guide](https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/)
