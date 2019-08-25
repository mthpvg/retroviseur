# retroviseur

Retroviseur is a command-line tool. It lists new, semver compatible, releases of the `package.json` dependencies in the recent past.

## Usage
```bash
npm install -g retroviseur
retroviseur
# Or:
npx retroviseur
```

## Options
By default the "recent past" is set to 2 weeks, but you can change that:
```bash
# New releases of the last 4 days
retroviseur 4 d
# New releases of the last 8 weeks
retroviseur 8 w
```

## TODO
- Remove invalid semver if the release is old
